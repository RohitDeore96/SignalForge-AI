"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context";
import { Bell, Search, ChevronDown, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { 
    organization, 
    notifications, 
    markNotificationAsRead, 
    clearNotifications,
    setCommandPaletteOpen 
  } = useApp();
  
  const [notifOpen, setNotifOpen] = useState(false);

  // Format section name based on URL route
  const getSectionTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Overview";
    const segment = segments[0];
    if (segment === "chat") return "AI Data Intelligence";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between relative z-10">
      {/* Title & Organization lockup */}
      <div className="flex items-center space-x-4">
        <h1 className="font-serif text-lg font-bold tracking-tight text-brand-charcoal">
          {getSectionTitle()}
        </h1>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-brand-stone font-medium">
          <span>{organization.name}</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Mock Search trigger (Command Palette overlay) */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center space-x-2.5 h-9 px-3 rounded-lg border border-border bg-brand-offWhite text-brand-stone hover:text-brand-charcoal transition-colors duration-150 text-xs w-44 md:w-56"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left">Quick Search...</span>
          <kbd className="font-mono text-[9px] border border-border bg-background rounded px-1 hidden md:inline">⌘K</kbd>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-brand-offWhite text-brand-stone hover:text-brand-charcoal transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-blue rounded-full ring-2 ring-background" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-popup p-1 z-20 flex flex-col max-h-[350px]"
                >
                  {/* Notifications Header */}
                  <div className="px-3.5 py-2.5 border-b border-border flex items-center justify-between">
                    <span className="font-serif text-xs font-semibold text-brand-charcoal">Notifications</span>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-[9px] font-semibold text-brand-stone hover:text-brand-charcoal transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="flex-1 overflow-y-auto max-h-[250px] divide-y divide-border">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs text-brand-stone">
                        All caught up! No notifications.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={cn(
                            "p-3 flex items-start justify-between gap-3 text-left transition-colors",
                            notif.read ? "bg-transparent" : "bg-blue-50/20"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-semibold text-brand-charcoal leading-tight truncate">
                              {notif.title}
                            </h4>
                            <p className="text-[9px] text-brand-stone mt-0.5 leading-snug">
                              {notif.description}
                            </p>
                            <span className="text-[8px] text-brand-stone mt-1 block">
                              {notif.time}
                            </span>
                          </div>
                          {!notif.read && (
                            <button
                              onClick={() => markNotificationAsRead(notif.id)}
                              className="text-[9px] font-semibold text-brand-blue hover:text-blue-700 transition-colors shrink-0"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
