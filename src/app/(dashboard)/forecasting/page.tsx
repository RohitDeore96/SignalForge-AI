"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { chartConfig, CustomTooltip } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { 
  LineChart as ChartIcon, 
  Sliders, 
  AlertCircle, 
  Sparkles, 
  Database,
  ArrowRight,
  Calculator,
  Compass
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ForecastingPage() {
  const { selectedDataset, datasets } = useApp();
  const router = useRouter();

  // Settings state
  const [targetColumn, setTargetColumn] = useState("");
  const [dateColumn, setDateColumn] = useState("");
  const [forecastSteps, setForecastSteps] = useState(3);
  const [modelType, setModelType] = useState<"linear" | "exponential">("linear");
  
  // Results
  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    finalValue: 0,
    growthRate: 0,
    r2: 0,
    stdError: 0,
  });

  // Numeric and Date columns filters
  const numericColumns = selectedDataset?.column_metadata.filter(c => c.type === "number") || [];
  const dateColumns = selectedDataset?.column_metadata.filter(c => c.type === "date" || c.type === "string") || [];

  // Reset columns selection when dataset changes
  useEffect(() => {
    if (selectedDataset) {
      if (numericColumns.length > 0) {
        setTargetColumn(numericColumns[0].name);
      }
      if (dateColumns.length > 0) {
        setDateColumn(dateColumns[0].name);
      }
    }
  }, [selectedDataset]);

  // Run statistical projection calculations
  useEffect(() => {
    if (!selectedDataset || !targetColumn || !dateColumn) return;

    const data = selectedDataset.data_preview;
    const n = data.length;
    if (n < 3) return;

    // Convert target values to numbers, dates to indexes or raw values
    const yValues = data.map(r => Number(r[targetColumn]) || 0);
    const xValues = Array.from({ length: n }, (_, i) => i); // 0, 1, 2...

    // 1. Math formulas for regressions
    let m = 0; // slope
    let c = 0; // intercept
    let a = 1; // exponential coefficient
    let b = 0; // exponential growth factor

    if (modelType === "linear") {
      // Linear Regression least squares fitting
      const sumX = xValues.reduce((a, b) => a + b, 0);
      const sumY = yValues.reduce((a, b) => a + b, 0);
      const sumXY = xValues.reduce((sum, x, idx) => sum + x * yValues[idx], 0);
      const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

      m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      c = (sumY - m * sumX) / n;
    } else {
      // Exponential Regression fit: ln(y) = ln(a) + b * x
      // Ensure all y values are positive
      const positiveY = yValues.map(y => Math.max(y, 1));
      const lnY = positiveY.map(y => Math.log(y));
      
      const sumX = xValues.reduce((sum, x) => sum + x, 0);
      const sumLNY = lnY.reduce((sum, y) => sum + y, 0);
      const sumXLNY = xValues.reduce((sum, x, idx) => sum + x * lnY[idx], 0);
      const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

      b = (n * sumXLNY - sumX * sumLNY) / (n * sumX2 - sumX * sumX);
      const lnA = (sumLNY - b * sumX) / n;
      a = Math.exp(lnA);
    }

    // 2. Calculate residuals standard error & coefficient of determination R2
    const fittedY = xValues.map(x => 
      modelType === "linear" ? m * x + c : a * Math.exp(b * x)
    );

    const meanY = yValues.reduce((a, b) => a + b, 0) / n;
    const ssTot = yValues.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0);
    const ssRes = yValues.reduce((sum, y, idx) => sum + Math.pow(y - fittedY[idx], 2), 0);
    const r2 = ssTot === 0 ? 1 : 1 - (ssRes / ssTot);

    // Standard deviation of residuals
    const stdError = Math.sqrt(ssRes / (n - 2)) || 0;

    // 3. Assemble charts historical array + projected forecast dates
    const formattedData: any[] = [];
    
    // Add historical actuals and fitted line
    data.forEach((row, idx) => {
      const actualVal = yValues[idx];
      const fit = fittedY[idx];
      formattedData.push({
        date: row[dateColumn] ? String(row[dateColumn]).split("T")[0] : `Node ${idx + 1}`,
        actual: actualVal,
        fitted: Number(fit.toFixed(1)),
        isForecast: false,
      });
    });

    // Add forecast projections
    let lastActualVal = yValues[n - 1];
    let finalForecastVal = 0;

    // Retrieve historical date intervals to project future date names
    let lastDate = new Date();
    const parsedDate = Date.parse(data[n - 1]?.[dateColumn]);
    if (data[n - 1]?.[dateColumn] && !isNaN(parsedDate)) {
      lastDate = new Date(parsedDate);
    }

    for (let step = 1; step <= forecastSteps; step++) {
      const nextX = n - 1 + step;
      const forecastVal = modelType === "linear" 
        ? m * nextX + c 
        : a * Math.exp(b * nextX);

      // Increment date monthly/weekly or indices
      let dateLabel = `Projection ${step}`;
      if (data[n - 1]?.[dateColumn] && !isNaN(parsedDate)) {
        lastDate.setMonth(lastDate.getMonth() + 1);
        dateLabel = lastDate.toISOString().split("T")[0];
      }

      // Upper and lower bounds corridor
      const upper = forecastVal + 1.5 * stdError;
      const lower = Math.max(forecastVal - 1.5 * stdError, 0);

      formattedData.push({
        date: dateLabel,
        forecast: Number(forecastVal.toFixed(1)),
        upper: Number(upper.toFixed(1)),
        lower: Number(lower.toFixed(1)),
        isForecast: true,
      });

      if (step === forecastSteps) {
        finalForecastVal = forecastVal;
      }
    }

    setChartData(formattedData);

    // 4. Update KPI metrics state
    const pctGrowth = lastActualVal === 0 
      ? 0 
      : ((finalForecastVal - lastActualVal) / lastActualVal) * 100;

    setStats({
      finalValue: Number(finalForecastVal.toFixed(1)),
      growthRate: Number(pctGrowth.toFixed(1)),
      r2: Number(Math.max(r2, 0).toFixed(3)),
      stdError: Number(stdError.toFixed(1)),
    });

  }, [selectedDataset, targetColumn, dateColumn, forecastSteps, modelType]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
          Predictive Forecasting
        </h2>
        <p className="text-xs text-brand-stone mt-1.5">
          Run linear trend or exponential calculations on data values, generating projections with growth corridors.
        </p>
      </div>

      {selectedDataset ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Side Configuration Panel */}
          <Card className="lg:col-span-1 h-fit text-left">
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Sliders className="w-4.5 h-4.5 text-brand-stone" />
                <span>Model Settings</span>
              </CardTitle>
              <CardDescription>Adjust projection variables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Target column select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Target Metric</label>
                <select
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                >
                  {numericColumns.length === 0 ? (
                    <option>No numeric columns found</option>
                  ) : (
                    numericColumns.map(col => (
                      <option key={col.name} value={col.name}>{col.name}</option>
                    ))
                  )}
                </select>
              </div>

              {/* Date column select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Date / Dimension</label>
                <select
                  value={dateColumn}
                  onChange={(e) => setDateColumn(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                >
                  {dateColumns.length === 0 ? (
                    <option>No date columns found</option>
                  ) : (
                    dateColumns.map(col => (
                      <option key={col.name} value={col.name}>{col.name}</option>
                    ))
                  )}
                </select>
              </div>

              {/* Forecast steps */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Horizon (Steps)</label>
                <div className="flex bg-neutral-200/50 rounded-lg p-0.5 relative border border-neutral-200">
                  {[3, 6, 12].map(step => (
                    <button
                      key={step}
                      onClick={() => setForecastSteps(step)}
                      className={`flex-1 py-1 text-[10px] font-semibold rounded-md relative z-10 transition-colors ${forecastSteps === step ? "text-brand-charcoal" : "text-brand-stone"}`}
                    >
                      {forecastSteps === step && (
                        <motion.div
                          layoutId="forecast-steps-active"
                          className="absolute inset-0 bg-white rounded-md shadow-premium z-0"
                        />
                      )}
                      <span className="relative z-10">{step} steps</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Regression Model Type selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Forecast Algorithm</label>
                <select
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value as any)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                >
                  <option value="linear">Linear Regression (Standard Trend)</option>
                  <option value="exponential">Exponential Acceleration (Growth Curve)</option>
                </select>
              </div>

              <div className="pt-2">
                <div className="bg-blue-50/15 border border-blue-100 rounded-lg p-3 text-[10px] text-brand-stone leading-relaxed">
                  <div className="flex items-center space-x-1 mb-1 font-semibold text-brand-charcoal">
                    <Compass className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Statistical Method</span>
                  </div>
                  Calculates growth slopes, standard deviation variances, and computes confidence corridors of target variables.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Analysis & Projections Chart */}
          <div className="lg:col-span-3 space-y-6">
            {/* KPI Projections summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card hoverEffect>
                <CardHeader className="pb-1">
                  <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone">Projected End Value</span>
                </CardHeader>
                <CardContent className="pt-1 text-left">
                  <div className="text-xl font-bold font-mono text-neutral-900">
                    {stats.finalValue.toLocaleString()}
                  </div>
                  <p className="text-[9px] text-brand-stone mt-1">Expected metric value at forecast steps horizon limit</p>
                </CardContent>
              </Card>

              <Card hoverEffect>
                <CardHeader className="pb-1">
                  <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone">Net Change Percentage</span>
                </CardHeader>
                <CardContent className="pt-1 text-left">
                  <div className={`text-xl font-bold font-mono ${stats.growthRate >= 0 ? "text-emerald-600" : "text-brand-rose"}`}>
                    {stats.growthRate >= 0 ? `+${stats.growthRate}%` : `${stats.growthRate}%`}
                  </div>
                  <p className="text-[9px] text-brand-stone mt-1">Aggregated target growth compared to last actual node</p>
                </CardContent>
              </Card>

              <Card hoverEffect>
                <CardHeader className="pb-1">
                  <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone">R² Fit Metric (Confidence)</span>
                </CardHeader>
                <CardContent className="pt-1 text-left">
                  <div className="text-xl font-bold font-mono text-neutral-900">
                    {stats.r2}
                  </div>
                  <p className="text-[9px] text-brand-stone mt-1">Accuracy measure: closest to 1.0 represents a perfect line fit</p>
                </CardContent>
              </Card>
            </div>

            {/* Projection Chart Card */}
            <Card>
              <CardHeader className="border-b border-border flex flex-row items-center justify-between pb-4">
                <div className="text-left">
                  <CardTitle className="text-base">Corridor Analysis Projection</CardTitle>
                  <CardDescription>Visual trendline fitting historical values and future predictions with ±1.5σ intervals</CardDescription>
                </div>
                <div className="flex items-center space-x-3 text-[10px] font-semibold text-brand-stone select-none">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-brand-blue inline-block" />
                    <span>Actual</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-0.5 bg-brand-stone border-dashed border-t-2 inline-block" />
                    <span>Trend Fit</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-100 border border-blue-300 rounded inline-block" />
                    <span>Corridor (Confidence)</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray={chartConfig.grid.strokeDasharray} stroke={chartConfig.grid.stroke} />
                      <XAxis dataKey="date" {...chartConfig.xAxis} />
                      <YAxis {...chartConfig.yAxis} />
                      <Tooltip content={<CustomTooltip />} />
                      
                      {/* Shaded confidence corridor corridor for projection steps */}
                      <Area 
                        type="monotone" 
                        dataKey="upper" 
                        stroke="none" 
                        fill="#DBEAFE" 
                        fillOpacity={0.4} 
                        name="Upper Limit"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="lower" 
                        stroke="none" 
                        fill="#DBEAFE" 
                        fillOpacity={0.4} 
                        name="Lower Limit"
                      />

                      {/* Actual past data */}
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Actual Value" 
                        stroke="#2563EB" 
                        strokeWidth={2.5} 
                        dot={{ r: 3, strokeWidth: 1, fill: "#FFFFFF" }}
                      />

                      {/* Mathematical fitted line & future forecasts */}
                      <Line 
                        type="monotone" 
                        dataKey="fitted" 
                        name="Model Fit" 
                        stroke="#78716C" 
                        strokeWidth={1.5} 
                        strokeDasharray="4 4"
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        name="Projected Forecast" 
                        stroke="#2563EB" 
                        strokeWidth={2.5} 
                        strokeDasharray="3 3"
                        dot={{ r: 3.5, strokeWidth: 1, fill: "#2563EB" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-brand-stone">
                    Dataset empty or insufficient nodes for analysis.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Assistant context redirection */}
            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-left">
                <span className="p-2 rounded bg-neutral-100 text-brand-charcoal">
                  <Sparkles className="w-4.5 h-4.5 text-brand-blue" />
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-brand-charcoal">Analyze this forecast in the AI Chat</h4>
                  <p className="text-[10px] text-brand-stone mt-0.5">Prompt the intelligence model about projection steps or model fits.</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs shrink-0"
                onClick={() => router.push("/chat")}
              >
                Discuss with AI
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card className="flex flex-col justify-center items-center py-24 text-center border-dashed">
          <Database className="w-8 h-8 text-brand-stone mb-3" />
          <CardTitle className="text-base font-serif font-bold text-neutral-800">No active source node</CardTitle>
          <CardDescription className="max-w-xs mt-1 leading-relaxed">
            Please connect or upload a dataset inside the workspace to configure forecasting projection.
          </CardDescription>
          <Button
            variant="accent"
            size="sm"
            className="mt-4 text-xs"
            onClick={() => router.push("/datasets")}
          >
            Connect Dataset
          </Button>
        </Card>
      )}
    </div>
  );
}
