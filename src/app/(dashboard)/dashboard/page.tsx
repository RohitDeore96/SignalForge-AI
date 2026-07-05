"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Database, 
  BrainCircuit, 
  Clock, 
  Sparkles, 
  Upload, 
  Plus, 
  ArrowRight,
  TrendingDown,
  Activity
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { chartConfig, CustomTooltip } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Dashboard charts mock trend data
const decisionVelocityData = [
  { month: "Jan", decisions: 1240, accuracy: 88 },
  { month: "Feb", decisions: 1450, accuracy: 91 },
  { month: "Mar", decisions: 1320, accuracy: 89 },
  { month: "Apr", decisions: 1890, accuracy: 93 },
  { month: "May", decisions: 2300, accuracy: 94 },
  { month: "Jun", decisions: 2892, accuracy: 95 },
];

export default function DashboardPage() {
  const { user, datasets, selectedDataset, setSelectedDataset } = useApp();
  const router = useRouter();
  const [decisionsCount, setDecisionsCount] = useState(24000);
  const [accuracyVal, setAccuracyVal] = useState(90.5);

  // Animate numbers on mount
  useEffect(() => {
    const decInterval = setInterval(() => {
      setDecisionsCount(prev => {
        if (prev >= 24892) {
          clearInterval(decInterval);
          return 24892;
        }
        return prev + 149;
      });
    }, 15);

    const accInterval = setInterval(() => {
      setAccuracyVal(prev => {
        if (prev >= 94.2) {
          clearInterval(accInterval);
          return 94.2;
        }
        return Number((prev + 0.3).toFixed(1));
      });
    }, 20);

    return () => {
      clearInterval(decInterval);
      clearInterval(accInterval);
    };
  }, []);

  const kpis = [
    {
      title: "Optimized Decisions",
      value: decisionsCount.toLocaleString(),
      change: "+12.4% MoM",
      isPositive: true,
      description: "Total automated business forecasts & intelligence outputs",
      icon: <BrainCircuit className="w-4 h-4 text-blue-500" />
    },
    {
      title: "Decision Confidence Index",
      value: `${accuracyVal}%`,
      change: "+2.1% MoM",
      isPositive: true,
      description: "Aggregated model testing confidence threshold",
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />
    },
    {
      title: "Connected Data Nodes",
      value: datasets.length.toString(),
      change: "Active Sources",
      isPositive: true,
      description: "CSV and Excel files parsed inside workspace",
      icon: <Database className="w-4 h-4 text-neutral-600" />
    },
    {
      title: "Mean Inference Time",
      value: "142 ms",
      change: "-18 ms MoM",
      isPositive: true,
      description: "Average dataset query execution delay",
      icon: <Clock className="w-4 h-4 text-neutral-600" />
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Greetings Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
            Welcome back, {user?.full_name?.split(" ")[0] || "User"}
          </h2>
          <p className="text-xs text-brand-stone mt-1.5">
            Your decision model reports show optimal performance thresholds. Review latest forecasts below.
          </p>
        </div>
        
        {/* Quick Shortcut Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/datasets")}
            className="text-xs"
          >
            <Upload className="w-3.5 h-3.5 mr-2" />
            Upload Dataset
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => router.push("/chat")}
            className="text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
            Consult Assistant
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, index) => (
          <Card key={index} hoverEffect>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-0">
              <span className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">
                {kpi.title}
              </span>
              {kpi.icon}
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold font-mono tracking-tight text-neutral-900">
                {kpi.value}
              </div>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <span className={`text-[10px] font-semibold ${kpi.isPositive ? "text-emerald-600" : "text-brand-rose"}`}>
                  {kpi.change}
                </span>
                <span className="text-[9px] text-brand-stone font-medium">vs last quarter</span>
              </div>
              <p className="text-[10px] text-brand-stone mt-3 leading-snug">
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Decisions Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Inference Velocity</CardTitle>
                <CardDescription>Monthly growth profile of decisions run across active pipelines</CardDescription>
              </div>
              <Activity className="w-4 h-4 text-brand-stone" />
            </div>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={decisionVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDecisions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={chartConfig.grid.strokeDasharray} stroke={chartConfig.grid.stroke} />
                <XAxis dataKey="month" {...chartConfig.xAxis} />
                <YAxis {...chartConfig.yAxis} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="decisions" 
                  name="Decisions" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDecisions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Accuracy Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Drift Accuracy</CardTitle>
            <CardDescription>Validation check consistency thresholds</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={decisionVelocityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray={chartConfig.grid.strokeDasharray} stroke={chartConfig.grid.stroke} />
                <XAxis dataKey="month" {...chartConfig.xAxis} />
                <YAxis domain={[80, 100]} {...chartConfig.yAxis} />
                <Tooltip content={<CustomTooltip valueFormatter={(v) => `${v}%`} />} />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  name="Confidence" 
                  stroke="#10B981" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, strokeWidth: 1.5, fill: "#FFFFFF" }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights Grid & Active Source status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executive Insights Feed */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-neutral-900 flex items-center">
            <Sparkles className="w-4 h-4 text-brand-blue mr-2 animate-pulse" />
            AI Executive Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-50/15 border-blue-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-brand-blue uppercase tracking-wider">CAC optimization</span>
                <span className="text-[9px] text-brand-stone font-medium">1 hour ago</span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-brand-charcoal">Reallocate paid search budget</h4>
              <p className="text-[11px] text-brand-stone leading-relaxed mt-1.5">
                Google Search CAC fell to $20.10, while LinkedIn Ads CAC expanded to $62.20. Moving 15% spend from LinkedIn to Search could save **$4,200/mo** and lift signups by **11.4%**.
              </p>
            </Card>

            <Card className="bg-emerald-50/10 border-emerald-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">Growth projection</span>
                <span className="text-[9px] text-brand-stone font-medium">3 hours ago</span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-brand-charcoal">Q2 Revenue pace tracking</h4>
              <p className="text-[11px] text-brand-stone leading-relaxed mt-1.5">
                Calculations project Q2 expansion ARR to reach **$118k** (based on historical deal velocities). Standard deviation suggests a growth corridor between **$105k** and **$131k**.
              </p>
            </Card>
          </div>
        </div>

        {/* Selected Dataset Info Widget */}
        <div className="space-y-4 text-left">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-neutral-900 flex items-center">
            <Database className="w-4 h-4 text-brand-stone mr-2" />
            Active Source Node
          </h3>
          <Card>
            {selectedDataset ? (
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-brand-charcoal font-mono truncate">{selectedDataset.name}</h4>
                  <p className="text-[10px] text-brand-stone mt-1 line-clamp-2">{selectedDataset.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs border-y border-border py-2.5 my-2">
                  <div>
                    <span className="text-[9px] text-brand-stone block font-medium">File Size</span>
                    <span className="font-mono text-brand-charcoal font-semibold text-[11px]">{selectedDataset.file_size}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-stone block font-medium">Total Rows</span>
                    <span className="font-mono text-brand-charcoal font-semibold text-[11px]">{selectedDataset.row_count} rows</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[10px]"
                  onClick={() => router.push("/datasets")}
                >
                  Configure datasets
                  <ArrowRight className="w-3 h-3 ml-1.5" />
                </Button>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-brand-stone">
                No active dataset loaded.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
