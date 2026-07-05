"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Legal</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Privacy Policy
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          How SignalForge AI processes, structures, and protects dataset matrices and team credentials.
        </p>
      </div>

      {/* Content */}
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 text-left bg-white">
        <div className="space-y-2">
          <h3 className="font-serif text-sm font-bold text-neutral-900">1. Data Collection & Parsing</h3>
          <p className="text-xs text-brand-stone leading-relaxed">
            All spreadsheet datasets uploaded into our workspace dashboard are audited client-side in your local browser instance. When you save a dataset, it is securely synchronized to database blocks using SSL TLS 1.3 tunnels.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-sm font-bold text-neutral-900">2. Encryption at Rest</h3>
          <p className="text-xs text-brand-stone leading-relaxed">
            Uploaded data cells, forecast summaries, metadata schemas, and generated PDF reports are encrypted using AES-256 standards. Developer access API keys are stored in irreversible hashes.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-sm font-bold text-neutral-900">3. Compliance Isolation</h3>
          <p className="text-xs text-brand-stone leading-relaxed">
            In compliance with SOC2 Type II, GDPR, and ISO 27001 guidelines, we enforce PostgreSQL Row Level Security (RLS) policies. Your parameters are isolates to your Organization ID.
          </p>
        </div>

        <div className="border-t border-border pt-6 mt-6 flex items-center space-x-2 text-[10px] text-brand-stone font-semibold uppercase">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Full compliance certification verified</span>
        </div>
      </Card>

    </div>
  );
}
