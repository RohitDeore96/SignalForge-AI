"use client";

import React from "react";
import { Database, LineChart, MessageSquare, Shield, Clock, HelpCircle, FileText, Sparkles } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  const deepFeatures = [
    {
      title: "Data Upload Nodes",
      badge: "Inference Engine",
      icon: <Database className="w-5 h-5 text-neutral-600" />,
      description: "Load CSV files of up to 50MB directly client-side. The engine reads file lines instantly, parses cell structures, and lists column datatypes (number, date, string) for mathematical compilation.",
      details: ["Client-side spreadsheet rendering", "Column metadata automatic checks", "Right-click item actions context menu", "Demo datasets pre-loaded"]
    },
    {
      title: "Statistical Regressions",
      badge: "Predictive Intelligence",
      icon: <LineChart className="w-5 h-5 text-emerald-500" />,
      description: "Project future metrics with precision. Run Linear or Exponential curve least squares fits. Compiles standard deviation errors of residuals, outputting shaded ±1.5σ corridors to visual area charts.",
      details: ["Monthly & weekly intervals calculations", "Custom forecast steps options", "Confidence indices (R² values calculation)", "Interactive grid tooltips"]
    },
    {
      title: "Conversational Chatbot",
      badge: "Contextual AI Agent",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      description: "Consult your spreadsheets instantly. Ask for averages, calculations, or CAC summaries. The engine interprets query context, aggregates numbers, and returns formatted markdown tables with refs.",
      details: ["Word-by-word simulated stream blocks", "Custom suggested prompts selector", "Source datasets files references", "Markdown list and code output block formats"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Product capabilities</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Built for high-velocity teams
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Explore the design and algorithms that power SignalForge AI data analytics and predictive forecasts.
        </p>
      </div>

      {/* Feature block items */}
      <div className="space-y-12">
        {deepFeatures.map((feat, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-border pt-12 first:border-t-0 first:pt-0">
            {/* Text details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[9px] font-serif uppercase tracking-widest text-brand-stone font-semibold border border-border bg-brand-offWhite rounded-full px-2.5 py-0.5 inline-block">
                {feat.badge}
              </span>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-neutral-900 flex items-center space-x-2.5">
                <span className="p-1 rounded bg-brand-softGray border border-border shrink-0">{feat.icon}</span>
                <span>{feat.title}</span>
              </h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                {feat.description}
              </p>
              
              {/* Checklist details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {feat.details.map((dt, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-2 text-[11px] text-brand-stone font-medium">
                    <Shield className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span>{dt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Visual illustration card */}
            <div className="lg:col-span-5">
              <Card className="bg-brand-offWhite shadow-premium border border-border p-6 h-60 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-charcoal border border-border shadow-premium mb-4 animate-pulse">
                  {feat.icon}
                </div>
                <h4 className="text-xs font-semibold text-brand-charcoal font-mono">{feat.title} matrix</h4>
                <p className="text-[10px] text-brand-stone max-w-xs mt-1.5 leading-relaxed">
                  Mathematical model runs client-side inside Next.js layouts checking limits.
                </p>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4 max-w-4xl mx-auto shadow-premium">
        <h3 className="font-serif text-xl font-bold text-neutral-900">Experience SignalForge decision speed</h3>
        <p className="text-xs text-brand-stone max-w-md mx-auto">Create a workspace node, upload spreadsheets, and stream forecast insights immediately.</p>
        <div className="pt-2">
          <Link href="/register">
            <Button size="sm" variant="accent" className="bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
