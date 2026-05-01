"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Search, Loader2, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as motion from "framer-motion/client";

interface TurnoutTrend {
  year: number;
  avg_turnout: number;
}

interface RegionData {
  region: string;
  avg_turnout: number;
  total_registered: number;
}

export default function AnalyticsPage() {
  const [trends, setTrends] = useState<TurnoutTrend[]>([]);
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);

  // NLP Query State
  const [query, setQuery] = useState("");
  const [nlpLoading, setNlpLoading] = useState(false);
  const [nlpResult, setNlpResult] = useState<any[] | null>(null);
  const [nlpMessage, setNlpMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics`)
      .then((res) => res.json())
      .then((data) => {
        setTrends(data.turnoutTrends || []);
        setRegions(data.regionData || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleNlpQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setNlpLoading(true);
    setNlpResult(null);
    setNlpMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nlp-query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        },
      );
      const data = await res.json();

      if (data.message) {
        setNlpMessage(data.message);
      } else {
        setNlpResult(data.data);
      }
    } catch (err) {
      console.error(err);
      setNlpMessage("Failed to process query.");
    } finally {
      setNlpLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading BigQuery Analytics...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Election Analytics
        </h1>
        <p className="text-xl text-muted-foreground">
          Powered by BigQuery and Google Cloud Machine Learning.
        </p>
      </div>

      {/* NLP Search Bar */}
      <Card className="p-6 bg-card border-border shadow-md">
        <form onSubmit={handleNlpQuery} className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask data in plain English (e.g. 'Which region has highest turnout?')"
              className="pl-12 h-14 text-lg bg-background border-border rounded-full"
            />
          </div>
          <Button
            type="submit"
            disabled={nlpLoading}
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-lg"
          >
            {nlpLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Analyze"
            )}
          </Button>
        </form>

        {/* NLP Results */}
        {(nlpResult || nlpMessage) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 p-6 bg-muted/50 rounded-2xl border border-border"
          >
            <div className="flex items-center gap-2 mb-4 text-primary font-medium">
              <Database className="h-5 w-5" />
              <span>BigQuery Result</span>
            </div>
            {nlpMessage ? (
              <p className="text-foreground">{nlpMessage}</p>
            ) : nlpResult && nlpResult.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      {Object.keys(nlpResult[0]).map((k) => (
                        <th
                          key={k}
                          className="pb-3 pr-6 font-medium capitalize"
                        >
                          {k.replace("_", " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {nlpResult.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-border/50 last:border-0"
                      >
                        {Object.values(row).map((val: any, j) => (
                          <td key={j} className="py-3 pr-6 text-foreground">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No data matched your query.</p>
            )}
          </motion.div>
        )}
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="p-6 bg-card border-border shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-foreground">
            National Turnout Trend (2000-2024)
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#D1C9A8"
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis dataKey="year" stroke="#6A604A" />
                <YAxis domain={["auto", "auto"]} stroke="#6A604A" unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2A2518",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ECE7D1",
                  }}
                  itemStyle={{ color: "#ECE7D1" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  name="Avg Turnout"
                  dataKey="avg_turnout"
                  stroke="#8A7650"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#8A7650" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-foreground">
            Turnout by Region (Average)
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regions} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#D1C9A8"
                  opacity={0.3}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="#6A604A"
                  unit="%"
                  domain={[0, 100]}
                />
                <YAxis
                  dataKey="region"
                  type="category"
                  stroke="#6A604A"
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2A2518",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ECE7D1",
                  }}
                  cursor={{ fill: "#8A7650", opacity: 0.1 }}
                />
                <Bar
                  dataKey="avg_turnout"
                  name="Avg Turnout"
                  fill="#8E977D"
                  radius={[0, 4, 4, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
