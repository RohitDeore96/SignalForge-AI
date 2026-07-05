"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { 
  Search, 
  LayoutDashboard, 
  Database, 
  LineChart, 
  FileText, 
  Settings, 
  Key, 
  UserMinus, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, generateApiKey, addNotification } = useApp();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle state with Command/Control + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [commandPaletteOpen]);

  const items = [
    { label: "Go to Dashboard", category: "Navigation", icon: <LayoutDashboard className="w-4 h-4" />, action: () => router.push("/dashboard") },
    { label: "Go to Datasets", category: "Navigation", icon: <Database className="w-4 h-4" />, action: () => router.push("/datasets") },
    { label: "Go to Forecasting", category: "Navigation", icon: <LineChart className="w-4 h-4" />, action: () => router.push("/forecasting") },
    { label: "Go to AI Data Chat", category: "Navigation", icon: <MessageSquare className="w-4 h-4" />, action: () => router.push("/chat") },
    { label: "Go to Reports", category: "Navigation", icon: <FileText className="w-4 h-4" />, action: () => router.push("/reports") },
    { label: "Go to Settings", category: "Navigation", icon: <Settings className="w-4 h-4" />, action: () => router.push("/settings") },
    
    { label: "Generate Live API Key", category: "Actions", icon: <Key className="w-4 h-4" />, action: () => { generateApiKey("Command Palette generated key"); setCommandPaletteOpen(false); } },
    { label: "Clear Notifications Log", category: "Actions", icon: <UserMinus className="w-4 h-4" />, action: () => { addNotification("System Cleaned", "Logs cleared", "info"); setCommandPaletteOpen(false); } },
    { label: "Ask AI for Q2 Summary", category: "AI Operations", icon: <Sparkles className="w-4 h-4" />, action: () => { router.push("/chat"); setCommandPaletteOpen(false); } }
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/60"

          />

          {/* Dialog content */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-lg bg-background border border-border rounded-xl shadow-popup overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3.5 border-b border-border">
              <Search className="w-4.5 h-4.5 text-brand-stone mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, pages, or actions..."
                type="text"
                className="w-full bg-transparent outline-none text-sm text-brand-charcoal placeholder-brand-stone"
              />
              <span className="text-[10px] font-mono border border-border rounded px-1.5 py-0.5 text-brand-stone">ESC</span>
            </div>

            {/* Scrollable Results List */}
            <div className="max-h-[350px] overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-brand-stone">
                  No matching tools or locations found.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Group items by category */}
                  {Array.from(new Set(filteredItems.map(i => i.category))).map((cat) => (
                    <div key={cat} className="space-y-1">
                      <h4 className="text-[10px] font-serif uppercase tracking-wider text-brand-stone px-3 pt-1">{cat}</h4>
                      {filteredItems
                        .filter(i => i.category === cat)
                        .map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              item.action();
                              setCommandPaletteOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-brand-charcoal hover:bg-brand-softGray transition-colors group text-left"
                          >
                            <div className="flex items-center space-x-2.5">
                              <span className="text-brand-stone group-hover:text-brand-charcoal transition-colors">
                                {item.icon}
                              </span>
                              <span>{item.label}</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-brand-stone opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-brand-offWhite text-[10px] text-brand-stone font-medium">
              <div className="flex items-center space-x-3">
                <span>Use <kbd className="font-mono bg-white border border-border rounded px-1">↑↓</kbd> to navigate</span>
                <span><kbd className="font-mono bg-white border border-border rounded px-1">Enter</kbd> to select</span>
              </div>
              <div>
                <span>Built by KrissDevHub Technologies</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
