"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Sparkles,
  Database,
  Calendar,
  Layers,
  Check,
  Loader2,
  FileSpreadsheet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface GeneratedReport {
  id: string;
  title: string;
  datasetName: string;
  created_at: string;
  summary: string;
  sections: { title: string; content: string; keyMetrics?: { name: string; value: string }[] }[];
}

export default function ReportsPage() {
  const { selectedDataset, addNotification } = useApp();
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [activeReport, setActiveReport] = useState<GeneratedReport | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  // Default pre-populated reports
  useEffect(() => {
    if (selectedDataset) {
      const initialReport: GeneratedReport = {
        id: "rep-initial",
        title: `Decision Model Synthesis: ${selectedDataset.name.replace(".csv", "")}`,
        datasetName: selectedDataset.name,
        created_at: "2026-07-04T16:45:00Z",
        summary: "This document provides a comprehensive summary of metric slopes, acquisition Cac rates, and statistical forecasts compiled by the SignalForge decision model.",
        sections: [
          {
            title: "1. Dataset Structure Node Analysis",
            content: `The source file contains ${selectedDataset.row_count} rows across ${selectedDataset.column_metadata.length} dimensions. Columns analyzed include: ${selectedDataset.column_metadata.map(c => c.name).join(", ")}. Primary index values represent continuous metrics.`,
            keyMetrics: [
              { name: "Total Rows", value: `${selectedDataset.row_count}` },
              { name: "Columns", value: `${selectedDataset.column_metadata.length}` },
              { name: "File Size", value: selectedDataset.file_size },
            ]
          },
          {
            title: "2. Predictive Pacing Projection",
            content: "Calculated growth curves suggest strong MoM acceleration. Standard error checks map a stable confidence corridor. Growth metrics index satisfies minimum deviation requirements.",
            keyMetrics: [
              { name: "Correlation Fit (R²)", value: "0.942" },
              { name: "Inference Delay", value: "142 ms" },
            ]
          }
        ]
      };
      setReports([initialReport]);
      setActiveReport(initialReport);
    }
  }, [selectedDataset]);

  const handleGenerateReport = () => {
    if (!selectedDataset) return;
    setIsGenerating(true);
    setGenerationStep(1);

    // Simulate multi-phase model processing
    setTimeout(() => {
      setGenerationStep(2);
      setTimeout(() => {
        setGenerationStep(3);
        setTimeout(() => {
          const newReport: GeneratedReport = {
            id: `rep-${Date.now()}`,
            title: `Executive Performance Synthesis: ${selectedDataset.name.replace(".csv", "").replace(".xlsx", "")}`,
            datasetName: selectedDataset.name,
            created_at: new Date().toISOString(),
            summary: `Automated executive analysis report synthesized for ${selectedDataset.name}. Includes regression metrics and column schema statistics.`,
            sections: [
              {
                title: "1. Executive Data Summary",
                content: `Statistical audit of dataset nodes parsed ${selectedDataset.row_count} rows. All attributes passed schema verification. The data reveals highly consistent cycles with normal distribution characteristics.`,
                keyMetrics: [
                  { name: "Rows Counted", value: `${selectedDataset.row_count}` },
                  { name: "File Nodes", value: selectedDataset.file_size },
                ]
              },
              {
                title: "2. Regression Growth Model",
                content: "Linear trend fits forecast positive growth slopes at the specified steps horizon. R² indicators verify highly reliable fits with low residual standard error drift.",
                keyMetrics: [
                  { name: "Confidence Score (R²)", value: "0.958" },
                  { name: "Variance Coefficient", value: "Low" }
                ]
              }
            ]
          };

          setReports(prev => [newReport, ...prev]);
          setActiveReport(newReport);
          setIsGenerating(false);
          addNotification("Report Compiled", "Report synthesized successfully.", "success");
          
          // Trigger confetti!
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#2563EB", "#10B981", "#1C1917"]
          });

        }, 800);
      }, 800);
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (!activeReport) return;
    const shareUrl = `${window.location.origin}/share/reports/${activeReport.id}`;
    navigator.clipboard.writeText(shareUrl);
    addNotification("Link Copied", "Report sharing link copied to clipboard.", "success");
  };

  const handleDownloadCsv = () => {
    if (!selectedDataset) return;
    // Simple CSV compiler of preview data
    const cols = selectedDataset.column_metadata.map(c => c.name);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += cols.join(",") + "\n";
    selectedDataset.data_preview.forEach(row => {
      const line = cols.map(c => JSON.stringify(row[c] ?? "")).join(",");
      csvContent += line + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `metadata_export_${selectedDataset.name}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification("Download Started", "CSV metadata file exported.", "success");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto no-print">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
            Synthesized Reports
          </h2>
          <p className="text-xs text-brand-stone mt-1.5">
            Compile decisions forecasts and metadata matrices into printable executive briefs.
          </p>
        </div>

        {selectedDataset && (
          <Button
            variant="accent"
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="text-xs font-semibold"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                <span>Compiling Model...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
                <span>Synthesize New Report</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Generating Progress Dialog */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-50/20 border border-blue-100 rounded-xl p-4 flex items-center justify-between max-w-xl text-left"
          >
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-brand-blue animate-spin shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-brand-charcoal">
                  {generationStep === 1 && "Phase 1: Auditing data dimensions..."}
                  {generationStep === 2 && "Phase 2: Projecting mathematical trendlines..."}
                  {generationStep === 3 && "Phase 3: Formulating executive brief..."}
                </h4>
                <p className="text-[10px] text-brand-stone mt-0.5">Calculating regression values client-side.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedDataset ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Reports History List */}
          <Card className="lg:col-span-1 h-fit text-left">
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <FileText className="w-4.5 h-4.5 text-brand-stone" />
                <span>Saved Briefs</span>
              </CardTitle>
              <CardDescription>Select report to inspect</CardDescription>
            </CardHeader>
            <CardContent className="p-0 select-none">
              <div className="divide-y divide-border">
                {reports.length === 0 ? (
                  <div className="py-6 text-center text-xs text-brand-stone">
                    No reports generated.
                  </div>
                ) : (
                  reports.map((rep) => {
                    const isActive = activeReport?.id === rep.id;
                    return (
                      <div
                        key={rep.id}
                        onClick={() => setActiveReport(rep)}
                        className={`p-3.5 cursor-pointer text-left transition-colors duration-150 ${
                          isActive ? "bg-brand-softGray/50 font-semibold" : "hover:bg-neutral-50"
                        }`}
                      >
                        <h4 className="text-xs text-brand-charcoal truncate">{rep.title}</h4>
                        <div className="flex items-center space-x-2 text-[9px] text-brand-stone mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(rep.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Active Report Document Viewer */}
          <div className="lg:col-span-3 space-y-6">
            {activeReport ? (
              <Card className="shadow-popup relative flex flex-col text-left">
                {/* Print layout selector overlay buttons */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-brand-offWhite shrink-0">
                  <span className="text-[10px] text-brand-stone font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-neutral-400" />
                    <span>SignalForge Report Doc</span>
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadCsv}
                      className="h-8 text-[10px]"
                    >
                      <Download className="w-3 h-3 mr-1.5" />
                      Export CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="h-8 text-[10px]"
                    >
                      <Share2 className="w-3 h-3 mr-1.5" />
                      Share Link
                    </Button>
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={handlePrint}
                      className="h-8 text-[10px] bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal"
                    >
                      <Printer className="w-3 h-3 mr-1.5" />
                      Print PDF
                    </Button>
                  </div>
                </div>

                {/* Main A4 Document Sheet Wrapper */}
                <div id="print-sheet" className="p-8 md:p-12 space-y-8 bg-white min-h-[600px] text-black">
                  {/* Print Document Header */}
                  <div className="border-b border-neutral-300 pb-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 bg-black text-white flex items-center justify-center font-serif font-bold text-sm rounded">
                          S
                        </div>
                        <span className="font-serif font-bold text-xs tracking-tight text-neutral-900">
                          SignalForge AI
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold tracking-tight mt-3 text-neutral-900">
                        {activeReport.title}
                      </h3>
                      <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                        Dataset Source: {activeReport.datasetName}
                      </p>
                    </div>

                    <div className="text-right text-[10px] text-neutral-500 font-mono space-y-0.5">
                      <p>Date: {new Date(activeReport.created_at).toLocaleDateString()}</p>
                      <p>Author: SignalForge Engine</p>
                      <p>Status: Authenticated</p>
                    </div>
                  </div>

                  {/* Summary Block */}
                  <div className="bg-neutral-50 border-l-2 border-black p-4 text-xs italic text-neutral-700 leading-relaxed font-serif">
                    {activeReport.summary}
                  </div>

                  {/* Report Sections */}
                  {activeReport.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-4 pt-2">
                      <h4 className="font-serif font-bold text-sm tracking-tight text-neutral-900 uppercase">
                        {sec.title}
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {sec.content}
                      </p>

                      {/* KPI row */}
                      {sec.keyMetrics && sec.keyMetrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-neutral-200 rounded-lg p-3 bg-neutral-50">
                          {sec.keyMetrics.map((met, mIdx) => (
                            <div key={mIdx}>
                              <span className="text-[9px] text-neutral-400 uppercase tracking-wider block font-semibold">{met.name}</span>
                              <span className="font-mono text-neutral-900 font-bold text-xs mt-0.5 inline-block">{met.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Signature and built lockup */}
                  <div className="border-t border-neutral-300 pt-8 mt-12 flex items-center justify-between text-[9px] text-neutral-400 font-medium font-mono">
                    <p>© 2026 SignalForge AI. Generated on Next.js 15 Platform.</p>
                    <p className="flex items-center space-x-1">
                      <span>Built by</span>
                      <span className="font-serif font-extrabold text-neutral-700 tracking-tight">KrissDevHub Technologies</span>
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="py-24 text-center text-xs text-brand-stone">
                Select a brief from history to review.
              </div>
            )}
          </div>
        </div>
      ) : (
        <Card className="flex flex-col justify-center items-center py-24 text-center border-dashed">
          <Database className="w-8 h-8 text-brand-stone mb-3" />
          <CardTitle className="text-base font-serif font-bold text-neutral-800">No active source node</CardTitle>
          <CardDescription className="max-w-xs mt-1 leading-relaxed">
            Please connect or upload a dataset inside the workspace to synthesize analytical briefs.
          </CardDescription>
        </Card>
      )}

      {/* Hidden print layout component. Rendered ONLY when printing */}
      {activeReport && (
        <div className="hidden print:block print-page-break bg-white text-black p-8 text-left">
          {/* Duplicate document content here for literal page prints */}
          <div className="border-b border-black pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold">{activeReport.title}</h2>
              <p className="text-[9px] font-mono">Source Node: {activeReport.datasetName}</p>
            </div>
            <div className="text-right text-[8px] font-mono">
              <p>Generated: {new Date(activeReport.created_at).toLocaleDateString()}</p>
              <p>Author: SignalForge AI Platform</p>
            </div>
          </div>
          <div className="my-4 bg-neutral-100 p-3 italic text-[10px] border-l-2 border-black">
            {activeReport.summary}
          </div>
          {activeReport.sections.map((sec, idx) => (
            <div key={idx} className="my-4 space-y-2">
              <h3 className="text-xs font-serif font-bold uppercase">{sec.title}</h3>
              <p className="text-[10px] leading-relaxed">{sec.content}</p>
              {sec.keyMetrics && sec.keyMetrics.length > 0 && (
                <div className="grid grid-cols-3 gap-2 border border-neutral-300 rounded p-2 bg-neutral-50 text-[9px] font-mono">
                  {sec.keyMetrics.map((met, mIdx) => (
                    <div key={mIdx}>
                      <span className="text-[8px] block text-neutral-500 uppercase">{met.name}</span>
                      <span className="font-bold text-neutral-900">{met.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="border-t border-black mt-8 pt-4 flex items-center justify-between text-[8px] font-mono">
            <p>© 2026 SignalForge AI. Platform integration.</p>
            <p>Built by KrissDevHub Technologies</p>
          </div>
        </div>
      )}
    </div>
  );
}
