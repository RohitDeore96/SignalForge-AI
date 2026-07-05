"use client";

import React from "react";
import { Landmark } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Legal</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Terms of Service
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Standard user agreements, license configurations, and workspace rules for SignalForge.
        </p>
      </div>

      {/* Content */}
      <Card className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 text-left bg-white">
        <div className="space-y-2">
          <h3 className="font-serif text-sm font-bold text-neutral-900">1. License Allocation</h3>
          <p className="text-xs text-brand-stone leading-relaxed">
            We grant you a revocable, non-exclusive license to upload spreadsheets, execute forecasting calculations, create API access keys, and author compiled PDF briefs according to your billing tier (Starter, Pro, Business, Enterprise).
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-sm font-bold text-neutral-900">2. Mathematical Limitations</h3>
          <p className="text-xs text-brand-stone leading-relaxed">
            Forecasting algorithms (Linear, Exponential) run least squares fitting based on your historical points. Projections represent statistical corridors and do not guarantee actual financial or growth outputs.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-sm font-bold text-neutral-900">3. Workspace Responsibilities</h3>
          <p className="text-xs text-brand-stone leading-relaxed">
            Administrators are responsible for managing member profiles roles (Admin, Editor, Viewer), secure storage of generated dev tokens, and complying with data privacy regulations.
          </p>
        </div>

        <div className="border-t border-border pt-6 mt-6 flex items-center space-x-2 text-[10px] text-brand-stone font-semibold uppercase">
          <Landmark className="w-4 h-4 text-brand-blue" />
          <span>KrissDevHub Technologies standard agreement</span>
        </div>
      </Card>

    </div>
  );
}
