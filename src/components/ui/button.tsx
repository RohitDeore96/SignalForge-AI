"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] duration-150 select-none";
    
    const variants = {
      primary: "bg-brand-charcoal text-brand-warmWhite hover:bg-neutral-800 border border-brand-charcoal",
      secondary: "bg-brand-softGray text-brand-charcoal hover:bg-neutral-200 border border-transparent",
      outline: "bg-transparent text-brand-charcoal hover:bg-brand-softGray border border-brand-softGray",
      ghost: "bg-transparent text-brand-charcoal hover:bg-brand-softGray",
      danger: "bg-brand-rose text-white hover:bg-red-600 border border-brand-rose",
      accent: "bg-brand-blue text-white hover:bg-blue-700 border border-brand-blue shadow-premium",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-6 text-base",
      icon: "h-9 w-9 p-0",
    };

    const MotionButton = motion.button as any;

    return (
      <MotionButton
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
        ) : null}
        {children}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";
export default Button;
