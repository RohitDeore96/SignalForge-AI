"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  Database, 
  LineChart, 
  MessageSquare, 
  ShieldCheck, 
  Check,
  Play,
  Zap,
  TrendingUp,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";


export default function MarketingHomePage() {
  const trustedBrands = ["Stripe", "Linear", "Vercel", "Notion", "OpenAI", "Anthropic", "Apple"];

  const stats = [
    { label: "Aggregate Model Confidence", value: "94.2%" },
    { label: "Mean Inference Speed", value: "142ms" },
    { label: "Data Decision Nodes", value: "10M+" },
  ];

  const features = [
    {
      title: "Data Upload Nodes",
      description: "Drag & drop CSV or Excel datasets. Evaluate columns schema, metadata structures, and preview tables client-side in seconds.",
      icon: <Database className="w-5 h-5 text-neutral-700" />,
      link: "/features"
    },
    {
      title: "Regression Projections",
      description: "Deploy Linear or Exponential mathematical regressions. Chart future metrics pacing alongside shaded confidence corridors.",
      icon: <LineChart className="w-5 h-5 text-emerald-500" />,
      link: "/features"
    },
    {
      title: "Conversational Intelligence",
      description: "Query rows, CAC dynamics, and recurring revenues with context-aware AI. Streams formatted answers with source references.",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      link: "/features"
    }
  ];

  return (
    <div className="space-y-24 pb-20 select-none">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-neutral-100/50 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="text-center space-y-6 relative z-10 max-w-4xl mx-auto">
          {/* Top pill notification */}
          <div className="inline-flex items-center space-x-2 bg-brand-softGray border border-border rounded-full py-1 px-3 text-[10px] font-semibold text-brand-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            <span>Introducing SignalForge AI Decision Engine</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.1]">
            Turning Data into <br />
            <span className="text-brand-blue">Smarter Decisions</span>
          </h1>

          <p className="text-sm md:text-base text-brand-stone max-w-2xl mx-auto leading-relaxed">
            Upload CSV spreadsheets, run predictive statistical models, compile executive reports, and query details in real-time with context-aware AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/register">
              <Button size="lg" variant="accent" className="bg-brand-charcoal hover:bg-neutral-800 text-brand-warmWhite border-brand-charcoal">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Dashboard Mockup Preview Panel */}
        <div className="mt-16 relative flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            className="w-full max-w-4xl bg-card border border-border rounded-2xl shadow-popup overflow-hidden p-6 text-left"
          >
            {/* Dashboard Mock Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-brand-stone font-mono ml-2">https://app.signalforge.ai/dashboard</span>
              </div>
            </div>

            {/* Dashboard Mock Content */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background border border-border rounded-xl p-4">
                    <span className="text-[9px] uppercase font-serif text-brand-stone tracking-wider block">Decision Accuracy</span>
                    <span className="font-mono text-lg font-bold text-brand-charcoal mt-1 inline-block">94.2%</span>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4">
                    <span className="text-[9px] uppercase font-serif text-brand-stone tracking-wider block">Active Projections</span>
                    <span className="font-mono text-lg font-bold text-brand-charcoal mt-1 inline-block">12 active</span>
                  </div>
                </div>
                {/* Mock Chart Area */}
                <div className="bg-background border border-border rounded-xl p-4 h-48 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-serif font-semibold text-brand-charcoal">Acquisition CAC Projection</span>
                    <span className="text-[9px] text-brand-stone">Steps horizon: 6</span>
                  </div>
                  {/* Visual SVG mock line chart */}
                  <svg className="w-full h-24 text-brand-blue" viewBox="0 0 100 30">
                    <path
                      d="M0 25 L20 20 L40 22 L60 12 L80 8 L100 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M60 12 L80 14 L100 18"
                      fill="none"
                      stroke="#A1A1AA"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                    />
                    <polygon
                      points="60,8 80,4 100,0 100,10 80,14 60,16"
                      fill="rgba(37,99,235,0.08)"
                    />
                  </svg>
                  <div className="flex justify-between text-[8px] font-mono text-brand-stone pt-2 border-t border-border">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Projection Limit</span>
                  </div>
                </div>
              </div>
              
              {/* Chat Sidebar mock */}
              <div className="col-span-1 bg-background border border-border rounded-xl p-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1.5">
                    <Brain className="w-3.5 h-3.5 text-brand-blue" />
                    <span className="text-[9px] font-bold uppercase text-brand-charcoal tracking-wide">Data Assistant</span>
                  </div>
                  <div className="bg-brand-softGray/50 rounded-lg p-2.5 text-[9px] text-brand-stone leading-relaxed">
                    Analyzing **SaaS Expansion Channels.xlsx**. Google CAC is $20.10, LinkedIn is $62.20. Recommend shifting budget.
                  </div>
                </div>
                <div className="border border-border rounded-lg p-1.5 flex items-center justify-between text-[9px] bg-brand-offWhite">
                  <span className="text-brand-stone">CAC trends summary</span>
                  <ArrowRight className="w-3 h-3 text-brand-charcoal" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trusted By section */}
      <section className="border-y border-border py-8 bg-brand-offWhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[10px] font-serif uppercase tracking-wider text-brand-stone font-semibold shrink-0">
            Trusted by modern leaders
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-bold text-brand-stone/60">
            {trustedBrands.map((brand, idx) => (
              <span key={idx} className="hover:text-brand-charcoal transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Statistics */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="border border-border rounded-xl p-6 text-center space-y-1.5 bg-card shadow-premium">
              <span className="font-mono text-3xl font-bold tracking-tight text-neutral-900">{stat.value}</span>
              <p className="text-[10px] font-serif uppercase tracking-wider text-brand-stone mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
            Advanced decision tools out of the box
          </h2>
          <p className="text-xs text-brand-stone">
            All analytics logic runs securely inside Next.js layout structures, allowing rapid deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <Card key={idx} hoverEffect>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <span className="p-2 rounded-lg bg-brand-softGray border border-border text-brand-charcoal">
                  {feat.icon}
                </span>
              </CardHeader>
              <CardContent className="text-left space-y-2">
                <CardTitle className="text-base">{feat.title}</CardTitle>
                <p className="text-xs text-brand-stone leading-relaxed">
                  {feat.description}
                </p>
                <div className="pt-2">
                  <Link href={feat.link} className="inline-flex items-center text-[10px] font-semibold text-brand-blue hover:text-blue-700">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Sector Integrations */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-5">
            <span className="text-[10px] font-serif uppercase tracking-wider text-brand-blue font-semibold">Integrations Grid</span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal leading-snug">
              Hook up your active storage nodes directly
            </h2>
            <p className="text-xs text-brand-stone leading-relaxed">
              Connect Supabase, database clusters, or Vercel analytics logs in minutes. SignalForge AI synchronizes metadata instantly and creates RLS-isolated files for team members.
            </p>
            <div className="pt-2">
              <Link href="/integrations">
                <Button size="sm" variant="outline">
                  Browse compatible integrations
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["Supabase Auth", "Supabase DB", "Supabase Storage", "Slack API", "Vercel Deploy", "Excel Node"].map((item, idx) => (
              <div key={idx} className="border border-border rounded-xl p-4 bg-card text-center space-y-2 hover:border-brand-stone transition-colors shadow-premium">
                <span className="font-mono text-xs font-semibold text-brand-charcoal block">{item}</span>
                <span className="text-[9px] text-brand-stone font-mono">Compatible</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Comparison Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
            Built for modern product builders
          </h2>
          <p className="text-xs text-brand-stone">How SignalForge stacks up against bloated legacy dashboards</p>
        </div>

        <div className="border border-border rounded-2xl overflow-hidden shadow-premium bg-card">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-brand-offWhite border-b border-border font-serif font-bold">
                <th className="p-4 text-brand-charcoal">Feature</th>
                <th className="p-4 text-brand-blue">SignalForge AI</th>
                <th className="p-4 text-brand-stone">Legacy BI Tooling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 text-brand-charcoal font-semibold">Mathematical Forecasting</td>
                <td className="p-4 text-emerald-600 flex items-center space-x-1"><Check className="w-3.5 h-3.5" /> <span>Linear & Exponential Regressions</span></td>
                <td className="p-4 text-brand-stone">Manual Excel projections only</td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 text-brand-charcoal font-semibold">AI Context-Aware Chat</td>
                <td className="p-4 text-emerald-600 flex items-center space-x-1"><Check className="w-3.5 h-3.5" /> <span>Streams tabular previews & references</span></td>
                <td className="p-4 text-brand-stone">Static SQL dashboard queries</td>
              </tr>
              <tr className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 text-brand-charcoal font-semibold">Synthesis Reports</td>
                <td className="p-4 text-emerald-600 flex items-center space-x-1"><Check className="w-3.5 h-3.5" /> <span>One-click PDF download & share loops</span></td>
                <td className="p-4 text-brand-stone">Complex setups required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Enterprise Security Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border text-left">
        <div className="bg-brand-charcoal text-brand-warmWhite rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden shadow-popup">
          {/* Ambient accent */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-4 max-w-xl z-10">
            <span className="text-[10px] font-mono text-brand-blue uppercase tracking-widest font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span>Enterprise Grade Compliance</span>
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
              Absolute security. Zero metadata leaks.
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              We encrypt database fields at rest using AES-256 standards, utilize role isolation row level policies (RLS), and support active audit records.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 z-10">
            <Link href="/security">
              <Button className="bg-white hover:bg-neutral-100 text-brand-charcoal border-white text-xs py-2">
                Explore Security features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 pt-12">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-neutral-900">
          Start optimizing your business decisions today
        </h2>
        <p className="text-xs text-brand-stone max-w-md mx-auto leading-relaxed">
          Create a sandbox workspace and connect files in minutes. Join data intelligence builders.
        </p>
        <div>
          <Link href="/register">
            <Button size="lg" variant="accent" className="bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal px-8 shadow-premium">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
