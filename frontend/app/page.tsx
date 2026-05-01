import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Map, LineChart, ShieldCheck } from "lucide-react";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-6"
      >
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Your trusted civic companion
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Understand elections with{" "}
          <span className="text-primary">AI clarity.</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          ElectionGuide AI helps you navigate the voting process, track key
          dates, and explore historical turnout data using advanced natural
          language search.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link href="/chat">
            <Button
              size="lg"
              className="h-12 px-8 rounded-full text-base bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Bot className="mr-2 h-5 w-5" />
              Ask the AI Assistant
            </Button>
          </Link>
          <Link href="/guide">
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-full text-base border-primary text-primary hover:bg-primary/10"
            >
              <Map className="mr-2 h-5 w-5" />
              View Voting Guide
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-left">
          <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 text-primary">
            <Bot className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Smart Assistant</h3>
          <p className="text-muted-foreground">
            Ask questions in plain English and get instant, accurate answers
            about the voting process.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-left">
          <div className="h-12 w-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 text-accent">
            <Map className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Step-by-Step Guides</h3>
          <p className="text-muted-foreground">
            Clear, actionable instructions from checking eligibility to casting
            your ballot.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-left">
          <div className="h-12 w-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 text-secondary-foreground">
            <LineChart className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">ML Analytics</h3>
          <p className="text-muted-foreground">
            Explore historical voter turnout trends powered by BigQuery Machine
            Learning.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
