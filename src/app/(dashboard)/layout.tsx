"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Sidebar from "@/components/navigation/sidebar";
import Navbar from "@/components/navigation/navbar";
import CommandPalette from "@/components/ui/command-palette";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useApp();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set mounted client state
  useEffect(() => {
    setIsClient(true);
    
    // Check if user is logged in
    const cachedUser = localStorage.getItem("sf_user");
    if (!cachedUser) {
      router.replace("/login");
    }
  }, [router]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center">
        <img src="/logo.png" alt="Loading Logo" className="w-10 h-10 object-contain animate-pulse shrink-0" />

      </div>
    );
  }

  // Render workspace shell
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Navigation Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Global Hotkey Command Palette overlay */}
      <CommandPalette />
    </div>
  );
}
