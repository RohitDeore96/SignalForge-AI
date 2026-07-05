"use client";

import React from "react";
import { Compass, Calendar, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RoadmapPage() {
  const roadmapItems = [
    {
      quarter: "Q3 2026",
      title: "Multi-Series Mathematical Forecasting",
      description: "Support simultaneously mapping multiple columns onto a single Recharts line plot, overlaying regression coefficients comparative corridors.",
      status: "In Development",
      isCompleted: false
    },
    {
      quarter: "Q4 2026",
      title: "Custom LLM Model Server Integrations",
      description: "Optionally authenticate your own OpenAI or Anthropic API keys inside settings to power data assistant conversational threads with internal models.",
      status: "Planned",
      isCompleted: false
    },
    {
      quarter: "Q1 2027",
      title: "Collaborative Real-time Sheets Editor",
      description: "Direct workspace collaboration. Allow admins and editors to co-author metadata comments, column notes, and shared report comps simultaneously.",
      status: "Planned",
      isCompleted: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Future targets</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Product Roadmap
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Follow the upcoming algorithm modules and platform upgrades in development for SignalForge.
        </p>
      </div>

      {/* Roadmap List */}
      <div className="relative border-l border-border pl-6 space-y-10 max-w-3xl mx-auto">
        {roadmapItems.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Status node */}
            <span className="absolute -left-10 top-0.5 bg-background border border-border rounded-full w-8 h-8 flex items-center justify-center text-brand-charcoal shadow-premium">
              {item.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              ) : (
                <Circle className="w-4 h-4 text-brand-stone" />
              )}
            </span>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-semibold text-brand-stone uppercase">
                <span>{item.quarter}</span>
                <span className="h-3 w-px bg-border" />
                <span className="font-mono text-brand-blue">{item.status}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">{item.title}</h3>
              <p className="text-xs text-brand-stone leading-relaxed max-w-2xl">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
