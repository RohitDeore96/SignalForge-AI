"use client";

import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      title: "Why Regression Models Beat Intuition in Sales Forecasts",
      summary: "Explore how linear and exponential regression fits calculate correlation coefficients (R2) and standard errors of estimation to guide budget pacing.",
      date: "July 04, 2026",
      author: "Sarah Chen, Head of Data",
      category: "Mathematics"
    },
    {
      title: "Best Practices in Client-Side CSV Spreadsheet Processing",
      summary: "A technical dive into FileReader APIs, regex line splitting, schema inference checks, and avoiding server bottleneck delays.",
      date: "June 28, 2026",
      author: "Alex Mercer, Founding Developer",
      category: "Engineering"
    },
    {
      title: "Securing Multi-Tenant SaaS Databases with Row Level Security",
      summary: "How PostgreSQL RLS isolated records based on organization identity headers, locking columns from cross-tenant data leaks.",
      date: "June 15, 2026",
      author: "Marcus Vance, Compliance Officer",
      category: "Security"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">SignalForge Digest</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Product Engineering Blog
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Technical insights into statistical models fitting, SaaS security compliance, and data analytics architectures.
        </p>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <Card key={idx} hoverEffect className="p-5 flex flex-col justify-between text-left space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                <span>{post.category}</span>
                <span className="font-mono text-brand-blue">{post.date}</span>
              </div>
              <h3 className="font-serif text-base font-bold text-neutral-900 leading-snug">{post.title}</h3>
              <p className="text-xs text-brand-stone leading-relaxed">{post.summary}</p>
            </div>
            
            <div className="border-t border-border pt-4 flex items-center justify-between text-[10px] text-brand-stone font-medium">
              <span>{post.author}</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-charcoal" />
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
