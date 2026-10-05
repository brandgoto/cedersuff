import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

import { Subscription } from "@/components/cleaning/subscription";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { LineIcon, type IconName } from "@/components/sections/line-icon";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { collaterals } from "@/lib/collaterals";
import { ctaLabels, quoteHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Commercial Cleaning",
  description:
    "Monthly commercial cleaning contracts for offices, churches, retail spaces and warehouses across Toronto, London ON and Ontario.",
};

const siteVisitHref = `${quoteHref}?service=commercial-cleaning`;

const audiences: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "building",
    title: "Corporate Offices",
    body: "Daily or weekly cleaning scheduled around your hours. We work early morning or after hours so your team arrives to a clean space.",
  },
  {
    icon: "steeple",
    title: "Churches & Places of Worship",
    body: "Respectful, thorough cleaning for sanctuaries, halls, and meeting rooms. Weekly or monthly scheduling available.",
  },
  {
    icon: "warehouse",
    title: "Warehouses & Industrial",
    body: "Large-space commercial cleaning including floors, common areas, and welfare facilities.",
  },
  {
    icon: "store",
    title: "Retail Spaces",
    body: "Before-open or after-close cleaning so your shopfloor is always ready for customers.",
  },
  {
    icon: "keys",
    title: "Property Managers",
    body: "Turnover cleans between tenants, deep cleans after moves, and scheduled maintenance cleaning across your portfolio.",
  },
];

export default function CleaningPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial Cleaning"
        title="Clean Spaces, Monthly."
        body="We handle regular professional cleaning for offices, churches, retail spaces, and warehouses across Ontario. Monthly contracts. Consistent team. One invoice."
        cta={{ label: ctaLabels.cleaning, href: siteVisitHref }}
        image={collaterals.cleaningOffice}
      />

      <section className="bg-brand-surface py-24 lg:py-36">
        <div className="container">
          <FadeUp>
            <h2 className="text-center font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-brand-navy">
              Built for Businesses
            </h2>
          </FadeUp>
          {/* 5 across on desktop, 2 + 3 on tablet, stacked on mobile */}
          <Stagger className="mt-16 grid gap-4 md:grid-cols-6 lg:grid-cols-5">
            {audiences.map((a, i) => (
              <StaggerItem
                key={a.title}
                className={cn(
                  "group flex flex-col rounded-2xl border-l-[3px] border-brand-teal bg-white p-7 shadow-sm transition duration-300 hover:shadow-xl hover:shadow-brand-navy/10 motion-safe:hover:-translate-y-1.5 lg:col-span-1",
                  i < 2 ? "md:col-span-3" : "md:col-span-2"
                )}
              >
                <LineIcon name={a.icon} size={40} />
                <h3 className="mt-6 font-heading text-xl font-semibold leading-tight text-brand-navy">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{a.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Subscription />

      <section className="bg-brand-teal">
        <FadeUp className="container flex flex-col items-start justify-between gap-8 py-16 text-white md:flex-row md:items-center lg:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[clamp(2rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
              Booking a Move? Add Cleaning for 20% Off.
            </h2>
            <p className="mt-3 text-lg text-white/90">
              Bundle a professional clean of your old or new space when you book any move with us.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="group h-14 shrink-0 rounded-full bg-white px-8 text-base text-brand-navy hover:bg-white/90"
          >
            <Link href={`${quoteHref}?service=moving-cleaning-bundle`}>
              Add Cleaning to My Move
              <ArrowRight className="transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
          </Button>
        </FadeUp>
      </section>

      <CtaBand
        tone="ink"
        title="Ready to Talk About Your Cleaning Needs?"
        body="Book a free site visit and we'll come to your space, assess what's needed, and give you a quote."
        primary={{ label: ctaLabels.cleaning, href: siteVisitHref }}
      />
    </>
  );
}
