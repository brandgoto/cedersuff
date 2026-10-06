import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { ContactClickTracker } from "@/components/analytics/contact-click-tracker";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { StructuredData } from "@/components/analytics/structured-data";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { GA_MEASUREMENT_ID, gaEnabled, pixelEnabled } from "@/lib/analytics";
import { SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} | Moving & Commercial Cleaning in Toronto & London, ON`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StructuredData />
        <ContactClickTracker />
        {/* TODO: Replace G-XXXXXXXXXX with real GA4 Measurement ID from Google Analytics before launch (lib/analytics.ts) */}
        {gaEnabled && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
        {/* TODO: Replace XXXXXXXXXXXXXXX with real Meta Pixel ID from Meta Business Manager before launch (lib/analytics.ts) */}
        {pixelEnabled && <MetaPixel />}
      </body>
    </html>
  );
}
