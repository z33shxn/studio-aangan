import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
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

import { studio } from "@/content/studio";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Studio Aangan | Interior Design & Architecture",
    template: "%s | Studio Aangan"
  },
  description: "Interiors with a sense of place. We design homes that feel like a deep breath. Based in Bengaluru.",
  openGraph: {
    title: "Studio Aangan | Interior Design & Architecture",
    description: "Interiors with a sense of place. Based in Bengaluru.",
    url: SITE_URL,
    siteName: "Studio Aangan",
    images: [
      {
        url: "/images/misc/og-default.webp",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesignBusiness",
  "name": "Studio Aangan",
  "image": `${SITE_URL}/images/misc/og-default.webp`,
  "@id": SITE_URL,
  "url": SITE_URL,
  "telephone": studio.contact.phone,
  "email": studio.contact.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12th Main Road, HAL 2nd Stage, Indiranagar",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560038",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.971415,
    "longitude": 77.636652
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "10:00",
    "closes": "19:00"
  },
  "priceRange": "₹₹₹"
};

const hasAnalytics = process.env.NEXT_PUBLIC_ANALYTICS === "1";

import { ScrollReset } from "@/components/ScrollReset";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, fraunces.variable, "antialiased")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-ink selection:bg-brass selection:text-paper font-sans min-h-screen flex flex-col">
        <SmoothScroll>
          <ScrollReset />
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
