"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/context";

export default function CareersPage() {
  const { addNotification } = useApp();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");

  const jobs = [
    {
      id: "front",
      title: "Founding Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-Time",
      description: "We are seeking a senior product engineer with deep expertise in React 19, Next.js 15 App Router, Framer Motion transitions, and responsive Tailwind styling. You will build user workspace dashboard modules and custom spreadsheet components."
    },
    {
      id: "db",
      title: "Database Infrastructure Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-Time",
      description: "Join us to scale our Postgres schemas, configure multi-tenant isolation structures, write RLS access policies, audit API security keys rotation, and configure Supabase storage structures."
    }
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyEmail) return;
    addNotification("Application Submitted", `Resume submitted by ${applyName} (${applyEmail})`, "success");
    setApplyName("");
    setApplyEmail("");
    setSelectedJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Join us</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Join SignalForge AI
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Build the infrastructure that helps enterprise teams optimize business decisions.
        </p>
      </div>

      {/* Jobs list */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {jobs.map((job) => (
          <Card key={job.id} hoverEffect className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-neutral-900 leading-snug">{job.title}</h3>
              <p className="text-xs text-brand-stone max-w-2xl leading-relaxed">{job.description}</p>
              
              <div className="flex items-center space-x-4 text-[10px] text-brand-stone font-semibold pt-1">
                <span className="flex items-center space-x-1"><Briefcase className="w-3.5 h-3.5" /> <span>{job.department}</span></span>
                <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /> <span>{job.location}</span></span>
                <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /> <span>{job.type}</span></span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedJob(job.title)}
              className="text-xs shrink-0"
            >
              Apply now
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Apply Modal */}
      <Dialog
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={`Apply for ${selectedJob}`}
        description="Submit your name and email to apply. We will contact you shortly."
      >
        <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Full Name</label>
            <input
              value={applyName}
              onChange={(e) => setApplyName(e.target.value)}
              placeholder="Sarah Chen"
              type="text"
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Email Address</label>
            <input
              value={applyEmail}
              onChange={(e) => setApplyEmail(e.target.value)}
              placeholder="sarah@company.com"
              type="email"
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
              required
            />
          </div>

          <div className="flex items-center space-x-3 pt-3">
            <Button
              variant="outline"
              type="button"
              className="flex-1 text-xs"
              onClick={() => setSelectedJob(null)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              type="submit"
              className="flex-1 text-xs bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
