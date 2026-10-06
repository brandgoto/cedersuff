import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { FadeUp } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { IconFeatures, type Feature } from "@/components/sections/icon-features";
import { ServiceAreas } from "@/components/sections/service-areas";
import { quoteHref } from "@/lib/site";
import { ogImages, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About CEDERSUFF Movers | Toronto & London ON",
  description:
    "Toronto-based moving and commercial cleaning company serving Ontario households and businesses. Vetted teams, flat-rate pricing, and one point of contact on every job.",
  image: ogImages.team,
});

const howWeWork: Feature[] = [
  {
    icon: "team",
    title: "The Right Team for Every Job",
    body: "We work with experienced, licensed moving professionals across Ontario. Every team we send is vetted, insured, and briefed on your specific job before they arrive.",
  },
  {
    icon: "dollar",
    title: "Your Price, Confirmed First",
    body: "Your price is confirmed before we book. It only changes if the scope of your job changes.",
  },
  {
    icon: "phone",
    title: "One Point of Contact",
    body: "From your first quote to the last box off the truck — you deal with one person. No call centres, no being passed around.",
  },
];

const values: Feature[] = [
  { icon: "shieldCheck", title: "Reliability", body: "We show up when we say we will." },
  { icon: "eye", title: "Transparency", body: "Flat-rate quotes, no hidden fees." },
  { icon: "heart", title: "Care", body: "Your belongings treated like our own." },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className="bg-brand-surface py-24 lg:py-36">
        <div className="container">
          <FadeUp>
            <h2 className="font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-brand-navy">
              How We Work
            </h2>
          </FadeUp>
          <IconFeatures features={howWeWork} className="mt-16 lg:gap-x-16" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-24 lg:py-36">
        <div
          className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-brand-teal/10 blur-3xl"
          aria-hidden
        />
        <div className="container relative">
          <IconFeatures features={values} tone="dark" size="xl" className="lg:gap-x-20" />
        </div>
      </section>

      <ServiceAreas />

      <CtaBand title="Ready to Work With Us?" primary={{ label: "Get a Free Quote", href: quoteHref }} />
    </>
  );
}
