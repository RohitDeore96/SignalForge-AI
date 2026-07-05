"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  // Listen for Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"

          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
              "relative bg-background border border-border rounded-xl shadow-popup w-full max-w-lg overflow-hidden z-10 flex flex-col max-h-[85vh]",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-4 border-b border-border">
              <div>
                {title && (
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-neutral-900">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs text-brand-stone mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-brand-stone hover:text-brand-charcoal p-1 rounded-md hover:bg-brand-softGray transition-colors duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 text-sm">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Dialog;
