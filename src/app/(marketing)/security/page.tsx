"use client";

import React from "react";
import { Shield, ShieldAlert, Key, Lock, EyeOff, Server, FileCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SecurityPage() {
  const securityColumns = [
    {
      title: "Data Encryption",
      icon: <Lock className="w-5 h-5 text-neutral-600" />,
      description: "All database instances and files storage buckets are encrypted using industry-standard AES-256 algorithms. Data in transit is secured via TLS 1.3 transport tunnels."
    },
    {
      title: "Tenant Isolation",
      icon: <EyeOff className="w-5 h-5 text-neutral-600" />,
      description: "Database queries are isolates using PostgreSQL Row Level Security (RLS) policies. Users are sandboxed to their organization ID block, preventing data leaks."
    },
    {
      title: "SSO & Authentication",
      icon: <Key className="w-5 h-5 text-neutral-600" />,
      description: "Supported standard session managers, Google OAuth providers, secure password hashing algorithms, and developer API key hashes stored in database logs."
    },
    {
      title: "Compliance Audits",
      icon: <FileCheck className="w-5 h-5 text-neutral-600" />,
      description: "Our infrastructure runs on top of SOC2 Type II, ISO 27001, and GDPR compliant server centers hosted by Vercel and Supabase cloud systems."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Security first</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Enterprise Security
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          How we protect dataset matrices, forecasting math models, and organizations profile data.
        </p>
      </div>

      {/* Grid of Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityColumns.map((col, idx) => (
          <Card key={idx} hoverEffect>
            <CardHeader className="flex flex-row items-center space-x-3.5 pb-2">
              <span className="p-2 rounded-lg bg-brand-softGray border border-border text-brand-charcoal shrink-0">
                {col.icon}
              </span>
              <CardTitle className="text-base font-serif font-bold text-neutral-900">{col.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-brand-stone leading-relaxed">
                {col.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encryption Flow Diagram card */}
      <Card className="p-6 md:p-8 bg-brand-offWhite">
        <div className="space-y-4 mb-8">
          <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center space-x-2">
            <Server className="w-5 h-5 text-brand-blue" />
            <span>Secure Data Flow Architecture</span>
          </h3>
          <p className="text-xs text-brand-stone max-w-2xl leading-relaxed">
            All CSV uploads undergo initial client-side metadata scans before database transmission, where they are protected by Postgres RLS parameters:
          </p>
        </div>

        {/* Visual responsive diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center select-none pt-4 border-t border-border">
          <div className="border border-border rounded-xl p-4 bg-background shadow-premium space-y-2">
            <span className="text-[10px] font-serif uppercase tracking-wider text-brand-blue block font-semibold">Step 1: Client Upload</span>
            <p className="text-[11px] text-brand-stone leading-snug">CSV/Excel loaded. Rows checked in browser. No initial server uploads.</p>
          </div>
          <div className="border border-border rounded-xl p-4 bg-background shadow-premium space-y-2">
            <span className="text-[10px] font-serif uppercase tracking-wider text-brand-stone block font-semibold">Step 2: TLS 1.3 Tunnel</span>
            <p className="text-[11px] text-brand-stone leading-snug">Data serialized and sent encrypted to Next.js App Route endpoints.</p>
          </div>
          <div className="border border-border rounded-xl p-4 bg-background shadow-premium space-y-2">
            <span className="text-[10px] font-serif uppercase tracking-wider text-brand-stone block font-semibold">Step 3: RLS Isolated DB</span>
            <p className="text-[11px] text-brand-stone leading-snug">Supabase database commits rows with locked tenant Organization ID check.</p>
          </div>
        </div>
      </Card>

    </div>
  );
}
