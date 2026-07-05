import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070D", // Obsidian Dark
        foreground: "#F8FAFC", // Silver White
        card: {
          DEFAULT: "#0C101B", // Deep Slate
          foreground: "#F8FAFC",
        },
        popover: {
          DEFAULT: "#0C101B",
          foreground: "#F8FAFC",
        },
        primary: {
          DEFAULT: "#F8FAFC",
          foreground: "#05070D",
        },
        secondary: {
          DEFAULT: "#1E293B",
          foreground: "#F8FAFC",
        },
        muted: {
          DEFAULT: "#0C101B",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#3B82F6", // Cobalt Blue
          foreground: "#FFFFFF",
          hover: "#2563EB",
        },
        border: "#171F30", // Hairline Border
        input: "#171F30",
        ring: "#3B82F6",
        brand: {
          warmWhite: "#F8FAFC",
          offWhite: "#0C101B",
          softGray: "#1E293B",
          charcoal: "#F8FAFC", // Remapped to light text for dark mode readability
          stone: "#94A3B8",
          slate: "#64748B",
          blue: "#3B82F6",
          emerald: "#10B981",
          rose: "#EF4444",
        },
        neutral: {
          950: "#05070D",
          900: "#F8FAFC", // Remapped to light text for dark mode readability
          800: "#E2E8F0",
          700: "#CBD5E1",
          600: "#94A3B8",
          500: "#64748B",
          400: "#475569",
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        premium: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 4px 6px -1px rgba(0, 0, 0, 0.3)",
        cardHover: "0 10px 25px -5px rgba(59, 130, 246, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
        popup: "0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 4px 15px -3px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-out": "fadeOut 0.4s ease-in forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideUp: {
          from: { transform: "translateY(12px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          from: { transform: "translateY(-12px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
