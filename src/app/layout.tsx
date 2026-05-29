import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["WONK", "opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Studio Aangan",
  description: "Interiors with a sense of place. We design homes that feel like a deep breath.",
};

const hasAnalytics = process.env.NEXT_PUBLIC_ANALYTICS === "1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, fraunces.variable, "antialiased")}>
      <body className="bg-paper text-ink selection:bg-brass selection:text-paper font-sans min-h-screen flex flex-col pt-[88px] lg:pt-24">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="flex-1 flex flex-col relative z-10">
            {children}
          </main>
          <Footer />
          <MobileStickyBar />
        </SmoothScroll>

        {hasAnalytics && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
