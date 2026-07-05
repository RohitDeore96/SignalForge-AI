"use client";

import React from "react";
import MarketingNavbar from "@/components/navigation/marketing-navbar";
import MarketingFooter from "@/components/navigation/marketing-footer";

export default function MarketingGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky top menu */}
      <MarketingNavbar />

      {/* Main marketing page body */}
      <div className="flex-1 pt-20">
        {children}
      </div>

      {/* Footer credits and lists */}
      <MarketingFooter />
    </div>
  );
}
