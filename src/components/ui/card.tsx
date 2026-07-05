"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    const MotionDiv = motion.div as any;
    
    return (
      <MotionDiv
        ref={ref}
        whileHover={hoverEffect ? { y: -3, boxShadow: "var(--tw-shadow-cardHover)", borderColor: "#D6D3D1" } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "bg-card text-card-foreground border border-border rounded-xl p-5 shadow-premium overflow-hidden transition-all",
          hoverEffect && "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-serif text-xl font-semibold tracking-tight text-neutral-900", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-brand-stone", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center pt-4 border-t border-border mt-4", className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
