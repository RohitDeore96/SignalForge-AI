"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  ArrowRight, 
  Database, 
  LineChart, 
  MessageSquare, 
  ShieldCheck, 
  Check,
  TrendingUp,
  Brain,
  Sliders,
  DollarSign,
  Clock,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function MarketingHomePage() {
  const trustedBrands = ["Stripe", "Linear", "Vercel", "Notion", "OpenAI", "Anthropic", "Apple"];

  // ROI Calculator State integrated directly on home page for high engagement
  const [decisions, setDecisions] = useState(3000);
  const [hoursSaved, setHoursSaved] = useState(5);
  const [laborCost, setLaborCost] = useState(75);

  const monthlySavings = decisions * hoursSaved * laborCost;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="space-y-32 pb-24 relative overflow-hidden">
      
      {/* Background ambient light guides */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative pt-20 md:pt-28 px-6 max-w-7xl mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-softGray/30 border border-border/80 rounded-full py-1.5 px-3.5 text-[10px] font-semibold tracking-wider text-brand-blue uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
              <span>Next-Gen Decision Intelligence</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
              Turning Data into <br />
              <span className="font-serif italic font-normal text-brand-blue">Smarter Decisions</span>
            </h1>

            <p className="text-xs md:text-sm text-brand-stone max-w-xl leading-relaxed">
              Upload CSV spreadsheets, run predictive least squares regressions, compile executive briefs, and query data in real-time with context-aware AI.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <Link href="/register">
                <Button size="lg" variant="accent" className="bg-brand-blue hover:bg-blue-600 text-white border-brand-blue shadow-premium text-xs font-semibold px-6">
                  Get Started Free
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-xs border-border hover:bg-brand-softGray/50 px-6">
                  Explore Sandbox
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Floating Product Dashboard Mock */}
          <div className="lg:col-span-6 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="w-full max-w-lg bg-[#0C101B] border border-border/80 rounded-2xl p-6 shadow-popup glow-border"
            >
              {/* Card Title Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-border/50 mb-4 select-none">
                <div className="flex items-center space-x-1.5">
                  <img src="/logo.png" alt="SignalForge Logo" className="w-6 h-6 object-contain shrink-0" />
                  <span className="font-serif font-bold text-xs text-foreground tracking-tight">SignalForge Engine</span>
                </div>
                <span className="text-[9px] font-mono text-brand-stone bg-brand-softGray/40 px-2 py-0.5 rounded">v1.1.0 live</span>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-[#05070D] border border-border/60 rounded-xl p-3.5">
                      <span className="text-[8px] uppercase tracking-wider text-brand-stone block font-serif">Accuracy fit</span>
                      <span className="font-mono text-base font-bold text-foreground mt-1 inline-block">94.2%</span>
                    </div>
                    <div className="bg-[#05070D] border border-border/60 rounded-xl p-3.5">
                      <span className="text-[8px] uppercase tracking-wider text-brand-stone block font-serif">Query Latency</span>
                      <span className="font-mono text-base font-bold text-foreground mt-1 inline-block">142 ms</span>
                    </div>
                  </div>
                  {/* SVG Chart area */}
                  <div className="bg-[#05070D] border border-border/60 rounded-xl p-3.5 h-44 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[9px] font-serif text-brand-stone">
                      <span>Forecasting Corridor</span>
                      <span className="text-emerald-500 font-semibold flex items-center space-x-0.5"><TrendingUp className="w-3 h-3" /> <span>+12.4% MoM</span></span>
                    </div>
                    <svg className="w-full h-20 text-brand-blue" viewBox="0 0 100 30">
                      <path
                        d="M0 26 L20 22 L40 23 L60 14 L80 10 L100 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M60 14 L80 18 L100 24"
                        fill="none"
                        stroke="#64748B"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />
                      <polygon
                        points="60,10 80,6 100,2 100,14 80,18 60,20"
                        fill="rgba(59, 130, 246, 0.08)"
                      />
                    </svg>
                    <div className="flex justify-between text-[7px] font-mono text-brand-slate border-t border-border/30 pt-1.5">
                      <span>2026-01</span>
                      <span>2026-04</span>
                      <span>2026-06</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 bg-[#05070D] border border-border/60 rounded-xl p-3.5 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1.5">
                      <Brain className="w-3.5 h-3.5 text-brand-blue" />
                      <span className="text-[8px] font-bold uppercase tracking-wider text-foreground">AI Agent</span>
                    </div>
                    <p className="text-[9px] text-brand-stone leading-relaxed">
                      LinkedIn CAC is $62.20. Search CAC is $20.10. Move **15% spend** to Google.
                    </p>
                  </div>
                  <div className="border border-border/60 rounded px-1.5 py-1 flex items-center justify-between text-[8px] bg-brand-softGray/30 font-semibold cursor-pointer text-foreground hover:bg-brand-softGray/50">
                    <span>Apply shift</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. Trusted By */}
      <section className="py-6 border-y border-border/60 bg-brand-offWhite/30 select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone font-bold shrink-0">
            COMPATIBLE INFRASTRUCTURE
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-bold text-brand-stone/60">
            {trustedBrands.map((brand, idx) => (
              <span key={idx} className="hover:text-foreground transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bento Grid Features Showcase */}
      <section className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        <div className="text-left max-w-2xl space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Bento Matrix</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Complete Decision Architecture
          </h2>
          <p className="text-xs text-brand-stone">
            Remove visual layout noise. Explore modules designed to streamline spreadsheets mathematical calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Bento 1: Datasets (Wide) */}
          <div className="md:col-span-4 bg-[#0C101B] border border-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-blue/30 transition-all group glow-border">
            <div className="space-y-2 max-w-md">
              <span className="p-1.5 rounded-lg bg-brand-softGray/40 text-brand-blue inline-block border border-border/60"><Database className="w-4 h-4" /></span>
              <h3 className="font-serif text-lg font-bold text-foreground">Client-Side Dataset Nodes</h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Load CSV/Excel spreadsheets instantly. Schema checks, cell previews, and types mapping run entirely in the browser using custom FileReader regex parsers.
              </p>
            </div>
            <div className="mt-6 border-t border-border/40 pt-4 flex items-center justify-between text-[10px] text-brand-stone font-semibold">
              <span>Supports files up to 100MB</span>
              <Link href="/features" className="flex items-center text-brand-blue group-hover:translate-x-1 transition-transform">
                <span>View documentation</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Bento 2: AI Chat (Tall) */}
          <div className="md:col-span-2 bg-[#0C101B] border border-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-blue/30 transition-all group glow-border">
            <div className="space-y-3">
              <span className="p-1.5 rounded-lg bg-brand-softGray/40 text-brand-blue inline-block border border-border/60"><Brain className="w-4 h-4" /></span>
              <h3 className="font-serif text-lg font-bold text-foreground">Context-Aware AI</h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Query columns, metrics, or CAC payloads. Streams markdown responses, rendering clean comparative tables.
              </p>
            </div>
            <div className="mt-6 border-t border-border/40 pt-4 flex items-center justify-between text-[10px] text-brand-stone font-semibold">
              <span>Streams refs logs</span>
              <Link href="/features" className="flex items-center text-brand-blue group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 3: Forecasting (Tall) */}
          <div className="md:col-span-2 bg-[#0C101B] border border-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-blue/30 transition-all group glow-border">
            <div className="space-y-3">
              <span className="p-1.5 rounded-lg bg-brand-softGray/40 text-emerald-500 inline-block border border-border/60"><LineChart className="w-4 h-4" /></span>
              <h3 className="font-serif text-lg font-bold text-foreground">Least Squares Regressions</h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Project values. Shales confidence bounds based on residual errors standard deviation.
              </p>
            </div>
            <div className="mt-6 border-t border-border/40 pt-4 flex items-center justify-between text-[10px] text-brand-stone font-semibold">
              <span>Linear & Exponential curves</span>
              <Link href="/features" className="flex items-center text-brand-blue group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento 4: Compliance (Wide) */}
          <div className="md:col-span-4 bg-[#0C101B] border border-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-blue/30 transition-all group glow-border">
            <div className="space-y-2 max-w-md">
              <span className="p-1.5 rounded-lg bg-brand-softGray/40 text-brand-blue inline-block border border-border/60"><ShieldCheck className="w-4 h-4" /></span>
              <h3 className="font-serif text-lg font-bold text-foreground">RLS isolated structures</h3>
              <p className="text-xs text-brand-stone leading-relaxed">
                Row-level database policies prevent cross-organization records leaks. Authenticate securely using Supabase auth and rotatable API Keys.
              </p>
            </div>
            <div className="mt-6 border-t border-border/40 pt-4 flex items-center justify-between text-[10px] text-brand-stone font-semibold">
              <span>Fully SOC2 Type II compatible</span>
              <Link href="/security" className="flex items-center text-brand-blue group-hover:translate-x-1 transition-transform">
                <span>Explore security policies</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live ROI Calculator Section (High Interaction) */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border/60 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">ROI calculator</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Estimate Your Optimization Lift
            </h2>
            <p className="text-xs text-brand-stone leading-relaxed">
              Calculate the engineering cycles and manual hours optimized by automating data forecasting pipelines and reports generation with SignalForge.
            </p>

            <div className="space-y-5 pt-3">
              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                  <span>Decisions optimized / mo</span>
                  <span className="font-mono text-foreground">{decisions.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={decisions}
                  onChange={(e) => setDecisions(Number(e.target.value))}
                  className="w-full h-1 bg-brand-softGray rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                  <span>Analyst hours saved per step</span>
                  <span className="font-mono text-foreground">{hoursSaved} hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={hoursSaved}
                  onChange={(e) => setHoursSaved(Number(e.target.value))}
                  className="w-full h-1 bg-brand-softGray rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                  <span>Average labor cost ($/hr)</span>
                  <span className="font-mono text-foreground">${laborCost}/hr</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="w-full h-1 bg-brand-softGray rounded-lg appearance-none cursor-pointer accent-brand-blue"
                />
              </div>
            </div>
          </div>

          {/* ROI Display Panel */}
          <div className="lg:col-span-7 bg-[#0C101B] border border-border/80 rounded-2xl p-8 flex flex-col justify-between gap-6 shadow-popup glow-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold block">Estimated Monthly Savings</span>
                <span className="font-mono text-4xl font-extrabold text-brand-blue flex items-center tracking-tight">
                  <DollarSign className="w-8 h-8 shrink-0 text-brand-blue/70" />
                  <span>{monthlySavings.toLocaleString()}</span>
                </span>
                <p className="text-[10px] text-brand-slate leading-snug">Calculated cost saved by deploying model automations.</p>
              </div>

              <div className="space-y-2 text-left sm:pl-8">
                <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold block">Yearly Savings pace</span>
                <span className="font-mono text-3xl font-bold text-foreground flex items-center tracking-tight">
                  <DollarSign className="w-6 h-6 shrink-0 text-neutral-500" />
                  <span>{yearlySavings.toLocaleString()}</span>
                </span>
                <p className="text-[10px] text-brand-slate leading-snug">Projected annual reduction in data analyst operations costs.</p>
              </div>
            </div>

            <div className="border-t border-border/50 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-brand-stone font-medium">
              <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-brand-blue" /> <span>Saves {(decisions * hoursSaved).toLocaleString()} hours of research cycles/mo</span></p>
              <Link href="/register">
                <Button size="sm" variant="accent" className="bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-4 rounded-lg">
                  Deploy Workspace Node
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Teaser Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border/60 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Tiers summary</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Flexible setups for modern builders
            </h2>
            <p className="text-xs text-brand-stone leading-relaxed">
              Start on our free sandbox to test columns calculations, then upgrade to scale members capacity.
            </p>
            <div className="pt-2">
              <Link href="/pricing">
                <Button size="sm" variant="outline" className="text-xs">
                  View plans comparison
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-[#0C101B] border-border/80 p-6 glow-border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-foreground">Starter Tier</h4>
                  <span className="text-[9px] font-mono text-brand-stone">Sandbox limits</span>
                </div>
                <span className="font-mono text-lg font-bold text-foreground">$0</span>
              </div>
              <p className="text-xs text-brand-stone leading-relaxed mb-4">
                Perfect for individual developers testing mathematical forecasting models on single sheets.
              </p>
              <Link href="/register">
                <Button variant="outline" className="w-full text-xs py-1.5">Get Started Free</Button>
              </Link>
            </Card>

            <Card className="bg-[#0C101B] border-brand-blue ring-1 ring-brand-blue/20 p-6 glow-border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-serif text-base font-bold text-foreground">Business Tier</h4>
                  <span className="text-[9px] font-mono text-brand-blue">Recommended</span>
                </div>
                <span className="font-mono text-lg font-bold text-brand-blue">$149<span className="text-[10px] text-brand-stone font-semibold">/mo</span></span>
              </div>
              <p className="text-xs text-brand-stone leading-relaxed mb-4">
                Unlimited dataset uploads, role permissions (RBAC), and synthesis PDF exporting tools.
              </p>
              <Link href="/register">
                <Button className="w-full text-xs py-1.5 bg-brand-blue hover:bg-blue-600 text-white border-brand-blue shadow-premium font-semibold">Start free trial</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
