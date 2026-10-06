import type { Metadata } from "next";

import { CleaningCta } from "@/components/home/cleaning-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Packages } from "@/components/home/packages";
import { ServicesStack } from "@/components/home/services-stack";
import { Showcase } from "@/components/home/showcase";
import { WhyChoose } from "@/components/home/why-choose";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceAreas } from "@/components/sections/service-areas";
import { quoteHref, siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "CEDERSUFF Movers | Moving & Commercial Cleaning in Toronto & London ON",
  description:
    "Residential and commercial moving services across Toronto, London ON, and surrounding areas. Flat-rate pricing, vetted teams, and commercial cleaning contracts. Get a free quote today.",
});

// Tone rhythm: photo/navy → surface → navy → white → ink → surface → navy → video/navy → teal
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStack />
      <HowItWorks />
      <Packages />
      <Showcase />
      <WhyChoose />
      <CleaningCta />
      <ServiceAreas video="/loading_logo.mp4" />
      <CtaBand
        title="Ready to Move?"
        body="Get a flat-rate quote in 60 seconds."
        primary={{ label: "Get a Free Quote", href: quoteHref }}
        showPhone
        note={`${siteConfig.hours} · Toronto & London ON`}
      />
    </>
  );
}
