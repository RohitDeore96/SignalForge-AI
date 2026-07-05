"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";
import { useApp } from "@/lib/context";

export function MarketingFooter() {
  const { addNotification } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addNotification("Newsletter Subscribed", `Joined digest list with ${email}`, "success");
    setEmail("");
  };

  const footerGroups = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security & Auditing", href: "/security" },
        { label: "Roadmap timeline", href: "/roadmap" },
        { label: "Compatible Tools", href: "/integrations" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Healthcare grids", href: "/solutions#healthcare" },
        { label: "Finance engines", href: "/solutions#finance" },
        { label: "NGOs & Non-profits", href: "/solutions#ngo" },
        { label: "Smart Cities logic", href: "/solutions#cities" },
        { label: "Enterprises", href: "/solutions#enterprises" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Developer Docs", href: "/docs" },
        { label: "Guides & Tutorials", href: "/docs#guides" },
        { label: "API Console Docs", href: "/api-docs" },
        { label: "Product Changelog", href: "/changelog" },
        { label: "Help FAQs", href: "/faq" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About SignalForge", href: "/about" },
        { label: "Job Careers", href: "/careers" },
        { label: "Contact Sales", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  ];

  return (
    <footer className="bg-card border-t border-border py-16 px-6 relative z-10 select-none text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10">
        
        {/* Branding & Logo tagline */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2.5">
            <img src="/logo.png" alt="SignalForge Logo" className="w-8 h-8 object-contain shrink-0" />
            <span className="font-serif font-bold text-sm tracking-tight text-foreground">
              SignalForge AI
            </span>
          </div>

          <p className="text-xs text-brand-stone max-w-sm leading-relaxed">
            SignalForge AI helps enterprise teams turn raw data, CSV spreadsheets, and models into smarter business decisions.
          </p>
          
          {/* Newsletter Form */}
          <div className="pt-2">
            <span className="text-[10px] font-serif uppercase tracking-wider text-brand-stone block mb-2">Subscribe to digests</span>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg py-1.5 px-2.5 max-w-[280px]">
                <Check className="w-3.5 h-3.5" />
                <span>Added to mailing list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2 max-w-[280px]">
                <div className="relative flex-1">
                  <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-brand-stone" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com"
                    type="email"
                    className="w-full bg-background border border-border rounded-lg pl-8 pr-2 py-2 text-[11px] outline-none focus:ring-1 focus:ring-brand-blue"
                    required
                  />
                </div>
                <Button size="sm" type="submit" className="h-8 text-[10px] px-3 bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal">
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Links lists */}
        {footerGroups.map((group, idx) => (
          <div key={idx} className="space-y-3.5">
            <h4 className="text-[10px] font-serif uppercase tracking-wider text-brand-charcoal font-semibold">{group.title}</h4>
            <ul className="space-y-2 flex flex-col">
              {group.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-brand-stone hover:text-brand-charcoal transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom copyright, built lockup */}
      <div className="max-w-7xl mx-auto border-t border-border mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-brand-stone font-semibold">
        <p>© 2026 SignalForge AI. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 flex items-center space-x-1">
          <span>Built by</span>
          <span className="font-serif font-extrabold text-neutral-800 tracking-tight">KrissDevHub Technologies</span>
        </p>
      </div>
    </footer>
  );
}

export default MarketingFooter;
