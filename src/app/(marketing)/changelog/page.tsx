"use client";

import React from "react";
import { GitCommit, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ChangelogPage() {
  const updates = [
    {
      version: "v1.1.0",
      date: "July 05, 2026",
      title: "Predictive Forecasting Corridor Analysis & AI references",
      description: "Added Linear and Exponential mathematical regression fits along with standard error calculations. AI Data Assistant chat now returns references tags linking directly to connected CSV files schemas.",
      icon: <Sparkles className="w-4 h-4 text-brand-blue" />
    },
    {
      version: "v1.0.4",
      date: "June 25, 2026",
      title: "Supabase RLS Tenant Isolation & API Keys generator",
      description: "Configured multi-tenant isolation SQL policies. Added API Keys panel under settings tab, allowing administrators to generate and copy securely encrypted live bearer tokens.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />
    },
    {
      version: "v1.0.0",
      date: "June 01, 2026",
      title: "SignalForge AI Decision Intelligence Engine Launch",
      description: "Workspace shell initialized. Supports collapsible sidebar navigation, top alerts navbar, executive KPIs counters, CSV/Excel client-side loaders, and printable PDF brief composers.",
      icon: <Layers className="w-4 h-4 text-neutral-600" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Timeline logs</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Product Changelog
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Follow the weekly optimizations and features compiled inside the SignalForge engine.
        </p>
      </div>

      {/* Changelog Timeline */}
      <div className="relative border-l border-border pl-6 space-y-10 max-w-3xl mx-auto">
        {updates.map((up, idx) => (
          <div key={idx} className="relative">
            {/* Timeline node */}
            <span className="absolute -left-10 top-0.5 bg-background border border-border rounded-full w-8 h-8 flex items-center justify-center text-brand-charcoal shadow-premium">
              {up.icon}
            </span>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-semibold text-brand-stone uppercase">
                <span>{up.version}</span>
                <span className="h-3 w-px bg-border" />
                <span className="font-mono text-brand-blue">{up.date}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">{up.title}</h3>
              <p className="text-xs text-brand-stone leading-relaxed max-w-2xl">{up.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
