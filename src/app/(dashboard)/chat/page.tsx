"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp, ChatMessage } from "@/lib/context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Sparkles, 
  Trash2, 
  Database,
  ArrowRight,
  User,
  Bot,
  HelpCircle,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { 
    user,
    selectedDataset, 
    chatHistory, 
    addChatMessage, 
    clearChat 
  } = useApp();


  const [inputMsg, setInputMsg] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, streamedText]);

  // Suggested questions based on selected dataset
  const getSuggestions = () => {
    if (!selectedDataset) return ["What can you do?", "How do I upload a dataset?"];
    if (selectedDataset.id === "ds-sales") {
      return [
        "Summarize Q2 sales performances",
        "Forecast Expansion ARR for next 3 months",
        "What are the column schemas?"
      ];
    }
    return [
      "Summarize CAC spending channels",
      "Which channel CAC is most expensive?",
      "List all headers"
    ];
  };

  // Process and generate smart context-aware responses
  const generateAIResponse = (userQuery: string): { text: string; refs: string[] } => {
    const query = userQuery.toLowerCase();
    const refs = selectedDataset ? [selectedDataset.name] : [];

    if (!selectedDataset) {
      return {
        text: "Please upload or select a dataset first. I can perform statistical summarization, list column types, and calculate growth pacing projections once a data node is connected.",
        refs: []
      };
    }

    const data = selectedDataset.data_preview;
    const cols = selectedDataset.column_metadata;

    // Response helper based on actual context
    if (query.includes("summarize") || query.includes("summary") || query.includes("insights")) {
      if (selectedDataset.id === "ds-sales") {
        return {
          text: `Here is a structural summary of **${selectedDataset.name}**:\n\n* **Sample Volume**: ${selectedDataset.row_count} records\n* **Columns Detected**: ${cols.map(c => c.name).join(", ")}\n* **Average Expansion ARR**: $72,500/mo\n* **Net Pipeline Margin**: ~$3.8M\n\n### Sales Trends\nExpansion ARR shows strong upward momentum from **$45,000** in January to **$105,000** in June. Churn remains contained between $6,000 and $15,000 monthly.`,
          refs
        };
      } else {
        return {
          text: `Here is a campaign performance summary of **${selectedDataset.name}**:\n\n* **Target Nodes**: ${selectedDataset.row_count} marketing campaigns\n* **Attributes**: CAC, CTR conversion, and Platform Spend\n* **Top Efficiency Node**: Organic Ref (CAC: $0.00, Signups: 890)\n* **Paid Leader**: Google Search (CAC: $20.10, Spend: $12,500)\n\nRecommend reducing LinkedIn Ads allocation (CAC: $62.20) in favor of Google Search campaigns.`,
          refs
        };
      }
    }

    if (query.includes("forecast") || query.includes("project") || query.includes("predict")) {
      return {
        text: `Based on mathematical regression of **${selectedDataset.name}**:\n\n1. **Trend Slope**: Upward growth projection.\n2. **Pacing Projections (3 steps ahead)**: High accuracy rate forecast.\n3. **Confidence Interval Corridor**: Calculated with standard deviations of residues.\n\nTo view interactive confidence corridors and tune parameter limits, visit the **Predictive Forecasting** module from the sidebar navigation.`,
        refs
      };
    }

    if (query.includes("column") || query.includes("schema") || query.includes("header")) {
      const colList = cols.map(c => `* **${c.name}** (${c.type})`).join("\n");
      return {
        text: `Here is the parsed schema structure of **${selectedDataset.name}**:\n\n${colList}\n\nAll attributes were evaluated client-side for statistical computations.`,
        refs
      };
    }

    if (query.includes("cac") || query.includes("spend") || query.includes("cost")) {
      if (selectedDataset.id === "ds-marketing") {
        return {
          text: `Reviewing acquisition dynamics in **${selectedDataset.name}**:\n\n| Channel | Spend ($) | Signups | CAC ($) |\n| :--- | :--- | :--- | :--- |\n| Google Search | $12,500 | 620 | $20.10 |\n| LinkedIn Ads | $28,000 | 450 | $62.20 |\n| Meta Retargeting | $8,500 | 380 | $22.30 |\n\n**LinkedIn Ads** represents the most expensive paid acquisition channel with a CAC of **$62.20** per user signup.`,
          refs
        };
      }
    }

    return {
      text: `I have scanned **${selectedDataset.name}** with ${selectedDataset.row_count} rows. Ask me to:\n* **Summarize** the dataset trends\n* List column **schema** structures\n* Explain CAC or deal sizes\n* Explain statistical **forecasts**`,
      refs
    };
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isStreaming) return;
    
    // Add User Message
    addChatMessage(textToSend, "user");
    setInputMsg("");
    setIsStreaming(true);

    const reply = generateAIResponse(textToSend);

    // Simulate word-by-word high-end stream
    let words = reply.text.split(" ");
    let currentWordIndex = 0;
    setStreamedText("");

    const interval = setInterval(() => {
      if (currentWordIndex >= words.length) {
        clearInterval(interval);
        addChatMessage(reply.text, "ai", reply.refs);
        setStreamedText("");
        setIsStreaming(false);
      } else {
        setStreamedText(prev => prev + (prev ? " " : "") + words[currentWordIndex]);
        currentWordIndex++;
      }
    }, 45); // Smooth word pacing
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto">
      {/* Top action header */}
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4 shrink-0">
        <div className="text-left">
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-blue animate-pulse" />
            AI Data Assistant
          </h2>
          <p className="text-[10px] text-brand-stone mt-1">
            Consult the SignalForge AI algorithm directly. Read, query, and structure active sheets.
          </p>
        </div>
        
        {chatHistory.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="text-[10px]"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Reset chat log
          </Button>
        )}
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto space-y-5 px-1 py-3 text-left">
        {chatHistory.length === 0 && (
          <div className="flex flex-col justify-center items-center py-20 text-center text-brand-stone max-w-md mx-auto">
            <Bot className="w-9 h-9 text-brand-stone mb-4" />
            <h3 className="font-serif font-bold text-neutral-800 text-sm">Consult your connected dataset</h3>
            <p className="text-[11px] leading-relaxed mt-1 text-brand-stone">
              Ask mathematical summaries, campaign insights, or forecast scopes. The model responds with tables and references.
            </p>
          </div>
        )}

        {/* Render chat entries */}
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex space-x-3.5 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-lg bg-brand-charcoal text-brand-warmWhite flex items-center justify-center shrink-0 shadow-premium">
                <Bot className="w-4 h-4" />
              </div>
            )}
            
            <div className="max-w-[75%] space-y-1.5">
              <div
                className={`p-4 rounded-xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-brand-charcoal text-brand-warmWhite"
                    : "bg-card border border-border text-brand-charcoal"
                }`}
              >
                {/* Simulated Markdown Render formatting */}
                <div className="space-y-2 whitespace-pre-wrap font-sans">
                  {msg.text.split("\n\n").map((paragraph, pIdx) => {
                    // Check if paragraph is list
                    if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                      return (
                        <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1">
                          {paragraph.split("\n").map((li, lIdx) => (
                            <li key={lIdx}>
                              {li.replace(/^\*?\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    // Check if table
                    if (paragraph.includes("|")) {
                      const rows = paragraph.split("\n").filter(r => r.trim());
                      return (
                        <div key={pIdx} className="overflow-x-auto my-2 border border-border rounded-lg">
                          <table className="w-full text-[10px] border-collapse bg-white">
                            <tbody>
                              {rows.map((row, rIdx) => {
                                const cells = row.split("|").map(c => c.trim()).filter(Boolean);
                                const isHeader = rIdx === 0;
                                const isDivider = row.includes("---") || row.includes(":---");
                                if (isDivider) return null;
                                return (
                                  <tr key={rIdx} className={isHeader ? "bg-neutral-100 font-semibold" : "border-b border-border"}>
                                    {cells.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-2 border-r border-border font-mono">{cell}</td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    
                    // Normal text paragraph, replace bold markdown tags
                    const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, "$1");
                    return <p key={pIdx}>{formattedText}</p>;
                  })}
                </div>
              </div>

              {/* Source References */}
              {msg.references && msg.references.length > 0 && (
                <div className="flex items-center space-x-1.5 text-[9px] text-brand-stone px-1">
                  <Database className="w-3 h-3 text-neutral-400" />
                  <span>References:</span>
                  {msg.references.map((ref, rIdx) => (
                    <span key={rIdx} className="font-mono text-brand-charcoal font-semibold bg-neutral-200/50 rounded px-1">{ref}</span>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-premium font-semibold text-xs">
                {user?.full_name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        ))}

        {/* Streaming text bubble */}
        {isStreaming && streamedText && (
          <div className="flex space-x-3.5 justify-start">
            <div className="w-8 h-8 rounded-lg bg-brand-charcoal text-brand-warmWhite flex items-center justify-center shrink-0 shadow-premium">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            
            <div className="max-w-[75%] space-y-1.5">
              <div className="p-4 rounded-xl text-xs bg-card border border-border text-brand-charcoal leading-relaxed whitespace-pre-wrap font-sans">
                {streamedText}
                <span className="inline-block w-1.5 h-3.5 bg-brand-blue ml-1 animate-ping" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts list */}
      {getSuggestions().length > 0 && !isStreaming && (
        <div className="flex flex-wrap gap-2.5 my-3 shrink-0 select-none">
          {getSuggestions().map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              className="text-[10px] font-semibold text-brand-stone hover:text-brand-charcoal bg-brand-offWhite border border-border hover:border-brand-stone rounded-lg px-3 py-1.5 transition-colors text-left"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <div className="mt-2 p-3 bg-card border border-border rounded-xl flex items-center space-x-3 shrink-0 shadow-premium">
        <input
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(inputMsg);
            }
          }}
          disabled={isStreaming}
          placeholder={selectedDataset ? `Query attributes in ${selectedDataset.name}...` : "Please upload a data source to begin chat..."}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-xs text-brand-charcoal placeholder-brand-stone focus:ring-0"
        />

        <div className="flex items-center space-x-2 shrink-0">
          {selectedDataset && (
            <span className="hidden sm:flex items-center space-x-1 text-[9px] text-brand-stone font-mono bg-neutral-200/50 rounded px-1.5 py-0.5">
              <Database className="w-2.5 h-2.5 mr-1 text-neutral-400" />
              <span className="max-w-[80px] truncate">{selectedDataset.name}</span>
            </span>
          )}
          
          <Button
            variant="accent"
            size="icon"
            onClick={() => handleSend(inputMsg)}
            disabled={isStreaming || !inputMsg.trim()}
            className="w-8 h-8 rounded-lg bg-brand-charcoal hover:bg-neutral-800 text-brand-warmWhite border-brand-charcoal shadow-premium shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
