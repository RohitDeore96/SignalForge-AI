"use client";

import React, { useState } from "react";
import { Terminal, Key, Play, ArrowRight, Check, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ApiDocsPage() {
  const [activeLang, setActiveLang] = useState<"curl" | "ts" | "py">("curl");
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const codeSnippets = {
    curl: `curl -X POST https://api.signalforge.ai/v1/forecast \\
  -H "Authorization: Bearer sf_live_4a7be740e6c28f9d0c64" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_id": "ds-sales",
    "target_column": "Expansion ARR ($)",
    "forecast_steps": 3,
    "model_type": "linear"
  }'`,
    ts: `import { SignalForge } from "@signalforge/sdk";

const sf = new SignalForge({ apiKey: "sf_live_4a7be740e6c28f9d0c64" });

const forecast = await sf.forecast.run({
  datasetId: "ds-sales",
  targetColumn: "Expansion ARR ($)",
  forecastSteps: 3,
  modelType: "linear"
});

console.log("Correlation Fit R2:", forecast.stats.r2);`,
    py: `import signalforge

sf = signalforge.Client(api_key="sf_live_4a7be740e6c28f9d0c64")

forecast = sf.forecast.run(
    dataset_id="ds-sales",
    target_column="Expansion ARR ($)",
    forecast_steps=3,
    model_type="linear"
)

print(f"Projected growth: {forecast.stats.growth_rate}%")`
  };

  const handleRunQuery = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs([]);

    const steps = [
      "> Initializing SignalForge client node...",
      "> Checking API token authentication: OK",
      "> Querying active database source node: Q2 Executive Sales Performance.csv",
      "> Executing Linear regression trend calculations...",
      "> Slope: 12.4 | Intercept: 45200 | Correlation coefficient R²: 0.942",
      "> Output compiled successfully: { projected_growth: 12.4%, mean_error: 450 }",
      "> Execution completed successfully in 142 ms."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      } else {
        setTerminalLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      }
    }, 350); // Log delay
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue font-semibold">Developer console</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-charcoal">
          Developer API Docs
        </h2>
        <p className="text-xs md:text-sm text-brand-stone max-w-xl mx-auto leading-relaxed">
          Configure API calls to run regressions and extract forecast statistics from connected data sources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Code Editor block */}
        <Card className="flex flex-col text-left overflow-hidden bg-brand-charcoal border-neutral-800">
          {/* Header tabs */}
          <div className="flex bg-slate-950 px-4 py-2 justify-between items-center border-b border-neutral-800 select-none">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex bg-neutral-800 rounded p-0.5 relative text-[10px] font-semibold text-neutral-400">
              {[
                { id: "curl", label: "cURL" },
                { id: "ts", label: "TypeScript" },
                { id: "py", label: "Python" }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLang(lang.id as any)}
                  className={`px-2.5 py-1 rounded relative z-10 transition-colors ${activeLang === lang.id ? "text-white bg-neutral-700" : "hover:text-white"}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Snippet box */}
          <div className="p-4 bg-brand-charcoal text-brand-warmWhite font-mono text-[10px] leading-relaxed overflow-x-auto min-h-[180px]">
            <pre className="whitespace-pre">{codeSnippets[activeLang]}</pre>
          </div>

          {/* Run footer trigger */}
          <div className="bg-slate-950 border-t border-neutral-800 p-3 flex justify-between items-center select-none">
            <span className="text-[9px] text-neutral-500 font-mono">Authorization: Bearer sf_live_...</span>
            <Button
              size="sm"
              variant="accent"
              onClick={handleRunQuery}
              disabled={isRunning}
              className="text-[10px] h-8 bg-brand-blue hover:bg-blue-700 text-white border-brand-blue"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1.5" />
                  <span>Run Live Query</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Console output terminal logs */}
        <Card className="flex flex-col text-left overflow-hidden bg-black border-neutral-900 text-white">
          <div className="flex bg-neutral-950 px-4 py-2 border-b border-neutral-900 justify-between items-center select-none">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 mr-1.5" />
              <span>Query Terminal Output</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Terminal prints scroll panel */}
          <div className="p-4 font-mono text-[10px] space-y-2 h-[220px] overflow-y-auto leading-relaxed bg-black text-emerald-400">
            {terminalLogs.length === 0 ? (
              <p className="text-neutral-500 italic select-none">Click "Run Live Query" on the editor card to stream calculations.</p>
            ) : (
              terminalLogs.map((log, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {log}
                </motion.p>
              ))
            )}
          </div>
        </Card>

      </div>

    </div>
  );
}
