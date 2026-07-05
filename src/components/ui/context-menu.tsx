"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface ContextMenuProps {
  children: React.ReactNode;
  items: ContextMenuItem[];
  className?: string;
}

export function ContextMenu({ children, items, className }: ContextMenuProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setVisible(true);
    
    // Position menu offset from mouse position
    let x = e.clientX;
    let y = e.clientY;

    // Boundary check so it doesn't render off-screen
    if (window.innerWidth - x < 180) {
      x -= 160;
    }
    if (window.innerHeight - y < 200) {
      y -= 150;
    }

    setPosition({ x, y });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };

    const handleScroll = () => setVisible(false);

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      onContextMenu={handleContextMenu}
      className={cn("w-full h-full", className)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
              }}
              className="absolute z-50 min-w-[160px] bg-background border border-border rounded-lg shadow-popup p-1 pointer-events-auto"
            >
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick();
                    setVisible(false);
                  }}
                  className={cn(
                    "w-full flex items-center px-3 py-1.5 text-xs text-left font-medium rounded-md transition-colors",
                    item.danger
                      ? "text-brand-rose hover:bg-red-50"
                      : "text-brand-charcoal hover:bg-brand-softGray"
                  )}
                >
                  {item.icon && <span className="mr-2 text-neutral-500">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContextMenu;
