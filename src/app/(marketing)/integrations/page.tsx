"use client";

import React from "react";
import { Share2, Check, Lock, Database, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function IntegrationsPage() {
  const tools = [
    { name: "Supabase DB", desc: "Retrieve active rows from PostgreSQL tables. Schema columns check is run in sandbox layouts.", type: "Database" },
    { name: "Supabase Auth", desc: "Enable single sign-on (SSO), Google OAuth credentials, and RLS access permissions.", type: "Auth" },
    { name: "Vercel Analytics", desc: "Pull website click velocities, CAC CAC conversions, and page latency charts.", type: "Analytics" },
    { name: "Slack Webhooks", desc: "Publish automated decision briefs or forecasts alerts directly inside private company threads.", type: "Alerts" },
    { name: "Stripe Subscriptions", desc: "Sync customer spend tiers and billing monthly limits to organizational profile parameters.", type: "Billing" },
    { name: "Excel Spreadsheets", desc: "Upload and check workbook formulas, cell matrices, and dates arrays in the dataset manager.", type: "Loader" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Integrations</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Connected Ecosystem
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Connect your spreadsheets and data storage locations to synchronize parameters.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((t, idx) => (
          <Card key={idx} hoverEffect className="p-5 flex flex-col justify-between text-left space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[9px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                <span>{t.type}</span>
                <span className="font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Compatible</span>
              </div>
              <h3 className="font-serif text-sm font-bold text-neutral-900 leading-snug">{t.name}</h3>
              <p className="text-xs text-brand-stone leading-relaxed">{t.desc}</p>
            </div>
            
            <div className="border-t border-border pt-4 flex items-center space-x-1 text-[9px] text-brand-stone font-semibold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
              <span>Full compliance isolation</span>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
