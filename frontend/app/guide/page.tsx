"use client";

import { useEffect, useState } from "react";
import { Search, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import * as motion from "framer-motion/client";

interface GuideStep {
  id: string;
  step: number;
  title: string;
  description: string;
  tip: string;
}

export default function GuidePage() {
  const [steps, setSteps] = useState<GuideStep[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/guide`);
        if (search) url.searchParams.append("search", search);
        
        const res = await fetch(url.toString());
        const data = await res.json();
        setSteps(data.steps || []);
      } catch (err) {
        console.error("Failed to load guide:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchGuide, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Voting Guide</h1>
          <p className="text-xl text-muted-foreground">Step-by-step instructions to ensure your voice is heard.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guide..." 
            className="pl-10 h-12 bg-card border-border rounded-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-48 bg-card/50 animate-pulse rounded-2xl border border-border" />
          ))}
        </div>
      ) : steps.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No matching steps found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <span className="text-9xl font-black">{step.step}</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 min-h-[3rem]">
                  {step.description}
                </p>
                
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <p className="text-sm text-accent-foreground/90 font-medium">{step.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
