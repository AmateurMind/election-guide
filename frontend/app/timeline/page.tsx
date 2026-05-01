"use client";

import { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { Calendar, AlertCircle } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/timeline`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch timeline");
        return res.json();
      })
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center gap-4 text-muted-foreground">
          <Calendar className="h-8 w-8" />
          <p>Loading election dates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-3xl mx-auto py-16 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Could not load timeline</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Election Timeline</h1>
        <p className="text-xl text-muted-foreground">Key dates and deadlines for the upcoming election cycle.</p>
      </div>

      <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 py-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1.5 shadow-[0_0_0_4px_var(--color-primary-10)] dark:shadow-[0_0_0_4px_rgba(138,118,80,0.2)]" />
            
            <div className="bg-card border border-border shadow-sm p-6 rounded-2xl hover:shadow-md transition-shadow">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-medium text-sm rounded-full mb-3">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
