"use client";

import React from "react";
import { Landmark, Compass, Award, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const pillars = [
    {
      title: "Our Mission",
      icon: <Compass className="w-4.5 h-4.5 text-neutral-600" />,
      description: "Our goal is to give every product builder, analyst, and executive the statistical forecasting tools and context-aware conversational bots they need to make decisions."
    },
    {
      title: "Platform Principles",
      icon: <Landmark className="w-4.5 h-4.5 text-neutral-600" />,
      description: "We believe in warm-minimalist product design (inspired by Attio, Linear, Stripe) that removes glowing cyberpunk visual noise, emphasizing large margins and readability."
    },
    {
      title: "KrissDevHub Technologies",
      icon: <Users className="w-4.5 h-4.5 text-brand-blue" />,
      description: "SignalForge AI is proudly conceptualized and developed by KrissDevHub Technologies. We build SOC2 isolated systems, Next.js 15 App router architectures, and tools."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Our profile</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          About SignalForge AI
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          The story behind the decision intelligence platform built for modern product teams.
        </p>
      </div>

      {/* Grid of Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pil, idx) => (
          <Card key={idx} hoverEffect className="p-5 text-left space-y-4">
            <span className="p-2 bg-brand-softGray border border-border rounded-lg text-brand-charcoal shrink-0 inline-block">
              {pil.icon}
            </span>
            <div className="space-y-1.5">
              <h3 className="font-serif text-base font-bold text-neutral-900 leading-snug">{pil.title}</h3>
              <p className="text-xs text-brand-stone leading-relaxed">{pil.description}</p>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
