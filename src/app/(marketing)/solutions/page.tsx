"use client";

import React, { useState } from "react";
import { 
  Building, 
  HeartPulse, 
  GraduationCap, 
  Users, 
  Factory, 
  Coins, 
  ShoppingBag, 
  ShieldCheck, 
  Scale 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState("finance");

  const solutions = [
    {
      id: "finance",
      label: "Finance",
      icon: <Coins className="w-4 h-4" />,
      title: "Capital ARR & Recurring Projections",
      description: "Forecast net expansion ARR, model monthly recurring revenues (MRR), compile burn rate projection sheets, and check correlation variables on investments metrics.",
      useCases: ["Model churn ARR drift thresholds", "Calculate CAC channels payback limits", "Forecast investments yields correlation"]
    },
    {
      id: "healthcare",
      label: "Healthcare",
      icon: <HeartPulse className="w-4 h-4" />,
      title: "Patient Cohorts & Research Metrics",
      description: "Structure clinical trial variables, parse clinical records patient count values, model statistical health correlations, and check hospital CAC efficiency scales.",
      useCases: ["Model trial success percentages", "Audit records data distributions", "Forecast patient volume limits"]
    },
    {
      id: "cities",
      label: "Smart Cities",
      icon: <Building className="w-4 h-4" />,
      title: "Traffic Flows & Demographics Logic",
      description: "Evaluate public transportation grids, model seasonal demographic velocities, check power grid distribution trends, and projection utility growth paths.",
      useCases: ["Forecast grid peak usage indices", "Analyze municipal expenditures budgets", "Model traffic density drifts"]
    },
    {
      id: "retail",
      label: "Retail",
      icon: <ShoppingBag className="w-4 h-4" />,
      title: "Inventory Stocks & Seasonal Sales",
      description: "Calculate weekly inventory velocity, forecast supply chain corridors, check customer demographic sales coefficients, and run polynomial curves.",
      useCases: ["Forecast stockouts limits thresholds", "Model seasonal deals conversion rates", "Audit store revenue profiles"]
    },
    {
      id: "manufacturing",
      label: "Manufacturing",
      icon: <Factory className="w-4 h-4" />,
      title: "Factory Yields & Maintenance Intervals",
      description: "Predict machine failures based on historical operational hours, model factory parts yield curves, check maintenance budgets, and scale workflows.",
      useCases: ["Predict equipment warning signals", "Optimize line output efficiency ratios", "Model supply costs variance"]
    },
    {
      id: "ngo",
      label: "NGOs",
      icon: <Users className="w-4 h-4" />,
      title: "Donations & Campaign Outreach",
      description: "Synthesize contributor demographics, forecast yearly donor retention scales, optimize paid advertising budgets, and project outreach impact metrics.",
      useCases: ["Forecast donation run rates", "Model volunteer retention percentages", "Evaluate CAC of digital campaigns"]
    },
    {
      id: "government",
      label: "Government",
      icon: <Scale className="w-4 h-4" />,
      title: "Public Programs & Budget Allocations",
      description: "Audit public fund expenditures, model regional demographic trends, forecast program success probabilities, and compile compliance records.",
      useCases: ["Compile department budget sheets", "Model population drift statistics", "Evaluate program impact indicators"]
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Enrolment Caps & Student Retention",
      description: "Model academic cohorts retention, forecast admissions counts for upcoming semesters, evaluate operations CAC, and project graduation rates.",
      useCases: ["Model admissions growth curve slopes", "Evaluate course outcomes correlations", "Forecast tuition revenues pacing"]
    },
    {
      id: "enterprises",
      label: "Enterprises",
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "Multi-tenant Isolated Workspaces",
      description: "Deploy separate client organizations with role-based policies (RLS), integrate Slack and Supabase auth, generate api keys, and export pdf briefs.",
      useCases: ["SOC2 compliant security databases", "Admins/Editors permissions RBAC", "Global command fuzzy action search"]
    }
  ];

  const currentSol = solutions.find(s => s.id === activeTab) || solutions[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Custom configurations</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Solutions for every sector
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Select your industry below to see how our statistical engine and AI assistant streamline decision matrices.
        </p>
      </div>

      {/* Tab Switcher Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Buttons List */}
        <div className="lg:col-span-1 flex flex-col space-y-1 bg-neutral-200/30 p-1.5 border border-border rounded-xl select-none">
          {solutions.map((sol) => {
            const isActive = activeTab === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`flex items-center space-x-2.5 px-3 py-2.5 text-xs font-semibold rounded-lg relative transition-all duration-150 text-left ${
                  isActive ? "text-brand-charcoal font-bold" : "text-brand-stone hover:text-brand-charcoal"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="solutions-tab-active"
                    className="absolute inset-0 bg-white rounded-lg shadow-premium border border-border/50 z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 shrink-0">{sol.icon}</span>
                <span className="relative z-10 truncate">{sol.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Viewer Card */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSol.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="h-full flex flex-col justify-between text-left p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="p-2 bg-brand-softGray border border-border rounded-lg text-brand-charcoal shrink-0">
                      {currentSol.icon}
                    </span>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-neutral-900">
                      {currentSol.title}
                    </h3>
                  </div>

                  <p className="text-xs text-brand-stone leading-relaxed">
                    {currentSol.description}
                  </p>

                  <div className="border-t border-border pt-4 mt-6">
                    <span className="text-[10px] font-serif uppercase tracking-wider text-brand-charcoal block mb-3 font-semibold">Typical use cases</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {currentSol.useCases.map((use, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-3 bg-brand-offWhite hover:border-brand-stone transition-colors shadow-premium">
                          <span className="text-[10px] text-brand-charcoal font-medium leading-relaxed block">{use}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-[10px] text-brand-stone font-mono">Full RLS workspace security isolation enabled.</p>
                  <Link href="/register">
                    <Button size="sm" variant="accent" className="bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal text-xs">
                      Build workspace template
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
