"use client";

import React, { useState } from "react";
import { Mail, Check, Loader2, Landmark, Compass } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/context";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const { addNotification } = useApp();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState("Sales");
  const [message, setMessage] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      addNotification("Sales Inquiry Received", `Message submitted by ${name} representing ${company}`, "success");
      
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Contact us</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Talk to our team
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Ask general support details or request custom SOC2 enterprise sandbox setups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
        
        {/* Sales Form Card */}
        <Card className="lg:col-span-7 p-6 md:p-8 text-left bg-white relative">
          <AnimatePresence mode="wait">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4" key="form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      type="text"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Company</label>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="SignalForge AI"
                      type="text"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Email Address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    type="email"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Inquiry Type</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                  >
                    <option value="Sales">Sales & Licensing</option>
                    <option value="Support">Developer Support</option>
                    <option value="Demo">Request Platform Demo</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe details of your data analytics goals..."
                    rows={4}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                    required
                  />
                </div>

                <Button
                  variant="accent"
                  type="submit"
                  isLoading={isLoading}
                  className="w-full text-xs font-semibold py-2 bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal"
                >
                  Submit Inquiry
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
                key="success"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Message Received</h3>
                <p className="text-xs text-brand-stone max-w-xs mx-auto leading-relaxed">
                  Thanks for reaching out! A SignalForge support engineer will follow up on your request shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSuccess(false)}
                  className="text-xs"
                >
                  Send another message
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Side Details card */}
        <div className="lg:col-span-5 space-y-4 select-none">
          <Card className="p-5 text-left bg-brand-offWhite">
            <h4 className="font-serif text-sm font-bold text-neutral-900">Platform integrations</h4>
            <p className="text-xs text-brand-stone mt-1.5 leading-relaxed">
              We also support direct support channels via our developer Discord and active Slack integrations.
            </p>
          </Card>
          
          <Card className="p-5 text-left bg-brand-offWhite">
            <h4 className="font-serif text-sm font-bold text-neutral-900">KrissDevHub Technologies</h4>
            <p className="text-xs text-brand-stone mt-1.5 leading-relaxed">
              For security, licensing, and corporate contracts verification, reach out to our primary team directly.
            </p>
          </Card>
        </div>

      </div>

    </div>
  );
}
