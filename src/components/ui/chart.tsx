"use client";

import React from "react";

// Recharts Custom Styling Toolkit

export const chartConfig = {
  grid: {
    stroke: "#F5F5F4",
    strokeDasharray: "3 3",
  },
  xAxis: {
    stroke: "#78716C",
    fontSize: 10,
    tickLine: false,
    axisLine: false,
    dy: 10,
  },
  yAxis: {
    stroke: "#78716C",
    fontSize: 10,
    tickLine: false,
    axisLine: false,
    dx: -5,
  },
};

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (val: number) => string;
}

export function CustomTooltip({ active, payload, label, valueFormatter }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-charcoal text-brand-warmWhite border border-neutral-800 rounded-lg p-3 shadow-popup min-w-[130px]">
        <p className="text-[9px] font-serif uppercase tracking-wider text-brand-stone mb-1.5">{label}</p>
        <div className="space-y-1">
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs space-x-4">
              <span className="text-brand-stone text-[10px] flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: item.color || item.fill }} />
                <span>{item.name}</span>
              </span>
              <span className="font-semibold font-mono">
                {valueFormatter 
                  ? valueFormatter(item.value) 
                  : typeof item.value === "number" 
                    ? item.value.toLocaleString() 
                    : item.value
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
