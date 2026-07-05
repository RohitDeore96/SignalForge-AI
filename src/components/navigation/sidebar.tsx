"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp, UserRole } from "@/lib/context";
import { 
  LayoutDashboard, 
  Database, 
  LineChart, 
  MessageSquare, 
  FileText, 
  Settings, 
  ChevronLeft, 
  Menu,
  LogOut, 
  Sparkles,
  Command
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, organization, setUser, setCommandPaletteOpen } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Datasets", href: "/datasets", icon: <Database className="w-4 h-4" /> },
    { name: "Forecasting", href: "/forecasting", icon: <LineChart className="w-4 h-4 text-emerald-500" /> },
    { name: "AI Data Chat", href: "/chat", icon: <MessageSquare className="w-4 h-4 text-blue-500" /> },
    { name: "Reports", href: "/reports", icon: <FileText className="w-4 h-4" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("sf_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="bg-card border-r border-border h-screen flex flex-col relative z-20"
    >
      {/* Brand logo container */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center space-x-2.5 overflow-hidden">
          <img src="/logo.png" alt="SignalForge Logo" className="w-7 h-7 object-contain shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col select-none shrink-0"
              >
                <span className="font-serif font-semibold text-sm tracking-tight text-foreground leading-tight">
                  {organization.name}
                </span>
                <span className="text-[9px] text-brand-stone font-medium uppercase tracking-wider leading-none mt-0.5">
                  Platform
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>


        {/* Collapse toggle */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md text-brand-stone hover:text-brand-charcoal hover:bg-brand-softGray transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation items list */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-xs font-medium rounded-lg relative transition-all duration-150",
                isActive ? "text-brand-charcoal font-semibold" : "text-brand-stone hover:text-brand-charcoal"
              )}
            >
              {/* Animated active background bubble (shared element) */}
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-brand-softGray rounded-lg z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              <span className="relative z-10 shrink-0 mr-3">{item.icon}</span>
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* Command shortcut guide */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className={cn(
            "w-full flex items-center px-3 py-2 text-xs font-medium text-brand-stone hover:text-brand-charcoal hover:bg-neutral-100 rounded-lg transition-colors group mt-4",
            collapsed && "justify-center"
          )}
        >
          <Command className="w-4 h-4 shrink-0" />
          {!collapsed && (
            <div className="flex items-center justify-between w-full ml-3">
              <span className="text-[10px]">Command Palette</span>
              <kbd className="font-mono text-[9px] bg-neutral-200 border border-neutral-300 rounded px-1">⌘K</kbd>
            </div>
          )}
        </button>
      </nav>

      {/* Profile menu footer */}
      <div className="p-3 border-t border-border relative">
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="w-10 h-10 rounded-lg bg-brand-softGray hover:bg-neutral-200 flex items-center justify-center transition-colors text-brand-stone hover:text-brand-charcoal"
          >
            <Menu className="w-4 h-4" />
          </button>
        ) : (
          <div>
            {/* Popover actions */}
            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-16 left-3 right-3 bg-background border border-border rounded-lg shadow-popup p-1 z-20"
                  >
                    <div className="px-3 py-2 border-b border-border text-left">
                      <p className="text-[11px] font-semibold text-brand-charcoal">{user?.full_name}</p>
                      <p className="text-[9px] text-brand-stone truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-[10px] text-brand-rose hover:bg-red-50 font-medium rounded-md text-left transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" />
                      Sign Out Session
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Profile trigger card */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-brand-softGray transition-colors duration-150 text-left"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {user?.full_name?.charAt(0) || "U"}
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-[11px] font-semibold text-brand-charcoal truncate">
                    {user?.full_name}
                  </span>
                  <span className="text-[9px] text-brand-stone font-medium">
                    {user?.role}
                  </span>
                </div>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-brand-stone rotate-270 transform shrink-0" />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
