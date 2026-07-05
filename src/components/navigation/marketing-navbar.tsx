"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Features", href: "/features" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Customers", href: "/customers" },
    { label: "API Console", href: "/api-docs" },
    { label: "Docs", href: "/docs" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-250 select-none border-b",
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-border shadow-premium py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5">
          <img src="/logo.png" alt="SignalForge Logo" className="w-8 h-8 object-contain shrink-0" />
          <span className="font-serif font-bold text-sm tracking-tight text-foreground">
            SignalForge AI
          </span>
        </Link>


        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-semibold relative transition-colors duration-150 py-1.5",
                  isActive ? "text-brand-charcoal" : "text-brand-stone hover:text-brand-charcoal"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="marketing-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-blue rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-xs font-semibold text-brand-stone hover:text-brand-charcoal transition-colors">
            Log In
          </Link>
          <Link href="/register">
            <Button size="sm" variant="accent" className="text-xs bg-brand-charcoal hover:bg-neutral-800 text-brand-warmWhite border-brand-charcoal">
              Get Started
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu burger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-brand-stone hover:text-brand-charcoal rounded-md hover:bg-brand-softGray transition-colors duration-150"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border shadow-popup overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3.5 text-left flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-brand-stone hover:text-brand-charcoal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-brand-stone hover:text-brand-charcoal transition-colors"
                >
                  Log In
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" variant="accent" className="text-[11px]">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default MarketingNavbar;
