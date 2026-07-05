import type { Metadata } from "next";
import { sans, serif } from "@/lib/font";
import { AppProvider } from "@/lib/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalForge AI | Turning Data into Smarter Decisions",
  description: "SignalForge AI is an advanced decision-intelligence dashboard that helps enterprise teams upload data, run statistical forecasting, export PDF reports, and chat with data in real-time. Built by KrissDevHub Technologies.",
  keywords: ["Decision Intelligence", "SaaS Dashboard", "AI Data Analytics", "Sales Forecasting"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
