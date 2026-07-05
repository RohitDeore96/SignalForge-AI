"use client";

import React, { useState } from "react";
import { Users, Landmark, Zap, BarChart, Sliders, DollarSign, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomersPage() {
  // ROI calculator states
  const [decisions, setDecisions] = useState(2500);
  const [hoursSaved, setHoursSaved] = useState(4);
  const [laborCost, setLaborCost] = useState(65);

  const mockStories = [
    {
      company: "Ramp Logistics",
      logo: "RL",
      metric: "12% CAC Reduction",
      quote: "SignalForge's exponential forecasts showed google search signups CAC tracking much lower. Reallocating spend saved us $14k in our first quarter.",
      author: "Sarah Jenkins, VP Growth"
    },
    {
      company: "Apex Fintech",
      logo: "AF",
      metric: "142ms Inference Speed",
      quote: "Querying financial data matrices with the AI chatbot gives the team exact numbers in tables. We decommissioned legacy database scripts.",
      author: "Marcus Vance, CTO"
    }
  ];

  // Perform ROI calculations
  const monthlySavings = decisions * hoursSaved * laborCost;
  const yearlySavings = monthlySavings * 12;
  const hoursOptimized = decisions * hoursSaved;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Customer success</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Empowering data teams
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          How modern product builders use SignalForge AI to save engineering cycles and make accurate predictions.
        </p>
      </div>

      {/* Case studies list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStories.map((story, idx) => (
          <Card key={idx} hoverEffect className="p-6 text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-brand-charcoal text-brand-warmWhite flex items-center justify-center font-bold text-xs rounded-lg">
                  {story.logo}
                </div>
                <span className="font-serif font-bold text-brand-charcoal text-sm">{story.company}</span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-2 py-0.5">
                {story.metric}
              </span>
            </div>
            <p className="text-xs text-brand-stone leading-relaxed italic">
              "{story.quote}"
            </p>
            <span className="text-[10px] text-brand-charcoal font-semibold block">{story.author}</span>
          </Card>
        ))}
      </div>

      {/* ROI Calculator Card */}
      <Card className="p-6 md:p-8 bg-brand-offWhite">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sliders Side */}
          <div className="w-full md:w-1/2 space-y-6 text-left">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center space-x-2">
                <Sliders className="w-4.5 h-4.5 text-brand-stone" />
                <span>ROI Savings Calculator</span>
              </h3>
              <p className="text-[10px] text-brand-stone">Estimate potential money and hours optimized using SignalForge.</p>
            </div>

            {/* Slider 1: Decisions */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                <span>Decisions per month</span>
                <span className="font-mono text-brand-charcoal">{decisions.toLocaleString()} decisions</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={decisions}
                onChange={(e) => setDecisions(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>

            {/* Slider 2: Hours Saved */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                <span>Hours saved per decision</span>
                <span className="font-mono text-brand-charcoal">{hoursSaved} hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={hoursSaved}
                onChange={(e) => setHoursSaved(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>

            {/* Slider 3: Labor Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-serif uppercase tracking-wider text-brand-stone font-semibold">
                <span>Analyst labor cost ($/hr)</span>
                <span className="font-mono text-brand-charcoal">${laborCost}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={laborCost}
                onChange={(e) => setLaborCost(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
          </div>

          {/* Results Side */}
          <div className="w-full md:w-1/2 bg-background border border-border rounded-2xl p-6 text-left flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <span className="text-[10px] font-serif uppercase tracking-wider text-brand-stone block mb-1 font-semibold">Estimated Monthly Savings</span>
                <span className="font-mono text-3xl font-extrabold text-brand-blue flex items-center">
                  <DollarSign className="w-6 h-6 shrink-0 text-brand-blue/70" />
                  <span>{monthlySavings.toLocaleString()}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-brand-stone block font-semibold">Yearly Run Savings</span>
                  <span className="font-mono text-base font-bold text-neutral-800 flex items-center mt-1">
                    <DollarSign className="w-4 h-4 text-neutral-400" />
                    <span>{yearlySavings.toLocaleString()}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-brand-stone block font-semibold">Hours Optimized / mo</span>
                  <span className="font-mono text-base font-bold text-neutral-800 flex items-center mt-1">
                    <Clock className="w-4 h-4 text-neutral-400 mr-1" />
                    <span>{hoursOptimized.toLocaleString()} hrs</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-brand-stone leading-relaxed pt-4 border-t border-border">
              Based on hours typically spent configuring Python models and manual PDF exports. Projections computed at standard pricing metrics.
            </p>
          </div>
        </div>
      </Card>

    </div>
  );
}
