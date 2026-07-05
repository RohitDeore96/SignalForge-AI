"use client";

import React, { useState } from "react";
import { BookOpen, Key, ShieldCheck, Database, Calendar, HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DocsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const guides = [
    {
      title: "Workspace Quickstart",
      description: "Learn how to invite team members, adjust branding color accents, and configure basic profile settings.",
      icon: <BookOpen className="w-4.5 h-4.5 text-neutral-600" />
    },
    {
      title: "Connecting Data Nodes",
      description: "Structure CSV files, verify header strings, guess columns datatypes (number, date) and inspect sheets.",
      icon: <Database className="w-4.5 h-4.5 text-emerald-500" />
    },
    {
      title: "Statistical Regressions",
      description: "Run Linear trendline curves or Exponential growth equations and visual corridor limits.",
      icon: <Calendar className="w-4.5 h-4.5 text-blue-500" />
    },
    {
      title: "API Keys Configuration",
      description: "Generate developer tokens client-side, set read/write permissions, and connect Slack webhooks.",
      icon: <Key className="w-4.5 h-4.5 text-neutral-600" />
    }
  ];

  const faqs = [
    {
      q: "Where does my data upload go?",
      a: "All spreadsheets processed in the Datasets module are initially validated client-side in the browser. When you save a dataset, it is securely transmitted over TLS 1.3 tunnels and stored in encrypted Supabase storage buckets protected by PostgreSQL Row Level Security (RLS) policies."
    },
    {
      q: "How does the regression forecaster calculate standard error?",
      a: "The engine runs standard least squares fitting algorithms to determine slope and intercept coefficients. It then calculates the sum of squared residuals to extract the standard error of estimates, plotting ±1.5 standard deviation bands on the Recharts Area charts."
    },
    {
      q: "Can I manage team member permissions?",
      a: "Yes. Using the Members tab under Settings, Admins can invite new users, revoke access tokens, and select Roles (Admin: full control, Editor: uploads and forecasting writes, Viewer: read-only access to compiled pdf reports)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Documentation</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Platform Guides
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Step-by-step tutorials and developer API integrations resources for SignalForge.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, idx) => (
          <Card key={idx} hoverEffect className="p-5 text-left flex items-start space-x-4">
            <span className="p-2 bg-brand-softGray border border-border rounded-lg text-brand-charcoal shrink-0 mt-0.5">
              {guide.icon}
            </span>
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-neutral-900">{guide.title}</h3>
              <p className="text-xs text-brand-stone leading-relaxed">{guide.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQs Section */}
      <div className="border-t border-border pt-12 space-y-8">
        <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-brand-stone" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-xs font-semibold text-brand-charcoal hover:bg-brand-softGray/50 transition-colors text-left"
                >
                  <span>{faq.q}</span>
                  <span className="text-brand-stone font-mono">{isOpen ? "−" : "+"}</span>
                </button>
                
                {isOpen && (
                  <div className="p-4 bg-background border-t border-border text-xs text-brand-stone leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
