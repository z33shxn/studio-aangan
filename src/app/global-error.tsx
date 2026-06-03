"use client";

import { Inter, Fraunces } from "next/font/google";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["WONK", "opsz", "SOFT"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={cn(inter.variable, fraunces.variable, "antialiased")}>
      <body className="bg-paper text-ink selection:bg-brass selection:text-paper font-sans min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full">
          <div className="font-serif text-3xl mb-12 text-ink">Studio Aangan</div>
          
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            We're patching the plaster.
          </h1>
          <p className="text-lg text-ink/70 mb-10">
            A critical error occurred. Please refresh the page or try again.
          </p>
          
          <Button onClick={reset} size="lg" variant="primary" className="bg-ink text-paper hover:bg-clay hover:text-paper w-full sm:w-auto">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
