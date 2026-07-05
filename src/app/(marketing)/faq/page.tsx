"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the maximum file size I can upload?",
      a: "On the Starter plan, you can upload CSV/Excel files of up to 10MB. The Business and Enterprise plans expand this capability to 100MB per dataset, which allows you to parse millions of rows cleanly."
    },
    {
      q: "Can I cancel my billing subscription at any time?",
      a: "Yes. You can upgrade, downgrade, or cancel your Professional or Business subscription at any point from the Billing section inside the Settings module. If you cancel, your features remain active until the end of your billing cycle."
    },
    {
      q: "Does SignalForge support multi-tenant team members role-based access?",
      a: "Yes. Under Settings > Members, Administrators can invite users and allocate permissions (Admin: full controls, Editor: upload and edit access, Viewer: read-only analysis access)."
    },
    {
      q: "How does the AI assistant process data values?",
      a: "The chatbot utilizes context-aware query logic. It scans the selected dataset columns schema and preview rows values to perform mathematical summaries orCAC comparisons locally, outputting formatted tables."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Help center</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Help & FAQs
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Find answers regarding account settings, file dimensions limits, billing schedules, and algorithms.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4 max-w-3xl mx-auto">
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
                <ChevronDown className={`w-4 h-4 text-brand-stone transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-background"
                  >
                    <div className="p-4 border-t border-border text-xs text-brand-stone leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
