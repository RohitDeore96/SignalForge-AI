"use client";

import React, { useState } from "react";
import { Check, HelpCircle, Shield, ArrowRight, Zap, Minimize } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Ideal for individual developers building initial decision sandbox templates.",
      price: { monthly: 0, yearly: 0 },
      cta: "Start Free",
      href: "/register",
      popular: false,
      features: [
        "2 active dataset connections",
        "Linear Regression model fit",
        "Client-side CSV metadata parsing",
        "1 workspace profile slot",
      ]
    },
    {
      name: "Professional",
      description: "Perfect for scaling analytics teams checking accuracy drifts.",
      price: { monthly: 49, yearly: 39 },
      cta: "Upgrade to Pro",
      href: "/register",
      popular: true,
      features: [
        "10 active dataset connections",
        "Linear & Exponential algorithms",
        "Context-Aware AI Chat bot",
        "5 workspace profile slots",
        "Export CSV summaries",
      ]
    },
    {
      name: "Business",
      description: "Best for enterprise analytics requiring organization logs & RBAC.",
      price: { monthly: 149, yearly: 119 },
      cta: "Upgrade to Business",
      href: "/register",
      popular: false,
      features: [
        "Unlimited dataset connections",
        "All forecasting regression curves",
        "Synthesis Reports composition",
        "15 workspace profile slots",
        "Role-Based Access (RBAC) panel",
        "Full PDF/CSV exports & links sharing",
      ]
    },
    {
      name: "Enterprise",
      description: "For institutions requiring SOC2 compliance isolation & support.",
      price: { monthly: "Custom", yearly: "Custom" },
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
      features: [
        "Multi-tenant database RLS setup",
        "Generate custom API tokens",
        "Dedicated model servers integrations",
        "Unlimited workspace profile slots",
        "Dedicated support engineers",
        "99.9% uptime SLA contracts",
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Pricing models</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Simple, transparent rates
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Start for free, scale as your dataset parameters expand. Adjust plans at any billing interval.
        </p>

        {/* Toggle */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex bg-neutral-200/50 border border-neutral-200 rounded-lg p-0.5 relative select-none">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md relative z-10 transition-colors ${billingCycle === "monthly" ? "text-brand-charcoal" : "text-brand-stone"}`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="pricing-cycle-active"
                  className="absolute inset-0 bg-white rounded-md shadow-premium z-0 border border-border/50"
                />
              )}
              <span className="relative z-10">Billed monthly</span>
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md relative z-10 transition-colors ${billingCycle === "yearly" ? "text-brand-charcoal" : "text-brand-stone"}`}
            >
              {billingCycle === "yearly" && (
                <motion.div
                  layoutId="pricing-cycle-active"
                  className="absolute inset-0 bg-white rounded-md shadow-premium z-0 border border-border/50"
                />
              )}
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>Billed yearly</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 rounded px-1 py-0.5">Save 20%</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => {
          const isCustom = typeof plan.price.monthly === "string";
          const displayPrice = isCustom 
            ? "Custom" 
            : billingCycle === "monthly" 
              ? plan.price.monthly 
              : plan.price.yearly;

          return (
            <Card 
              key={idx} 
              hoverEffect 
              className={`flex flex-col justify-between text-left p-6 relative ${
                plan.popular ? "border-brand-blue ring-1 ring-brand-blue/30 bg-white" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 text-[8px] uppercase tracking-wider font-semibold text-brand-blue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">{plan.name}</h3>
                  <p className="text-[10px] text-brand-stone mt-1.5 leading-snug">{plan.description}</p>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-3xl font-bold tracking-tight text-neutral-900">
                    {typeof displayPrice === "number" ? `$${displayPrice}` : displayPrice}
                  </span>
                  {typeof displayPrice === "number" && (
                    <span className="text-[10px] text-brand-stone font-semibold"> / month</span>
                  )}
                  {billingCycle === "yearly" && typeof displayPrice === "number" && (
                    <span className="text-[8px] text-emerald-600 block mt-1 font-semibold">Billed annually</span>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone block mb-2.5 font-semibold">Features included</span>
                  <ul className="space-y-2">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2 text-[10px] text-brand-stone leading-tight">
                        <Check className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border">
                <Link href={plan.href}>
                  <Button 
                    variant={plan.popular ? "accent" : "outline"} 
                    className="w-full text-xs font-semibold py-2"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
