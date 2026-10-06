import type { Metadata } from "next";

import { FadeUp } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { IconFeatures, type Feature } from "@/components/sections/icon-features";
import { NumeralColumns } from "@/components/sections/numeral-columns";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceAreas } from "@/components/sections/service-areas";
import { ServicesBento } from "@/components/services/services-bento";
import { collaterals } from "@/lib/collaterals";
import { quoteHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Moving Services in Toronto & London ON | CEDERSUFF Movers",
  description:
    "Residential, commercial, long-distance, same-day moving, packing, and storage. Flat-rate moving services across Toronto, London ON, Etobicoke, Scarborough, Mississauga, Brampton, and Vaughan.",
});

const pricingSteps = [
  {
    title: "You tell us about your move",
    body: "Fill in the quote form with your details — what's moving, where from, where to.",
  },
  {
    title: "We send a flat-rate quote",
    body: "Your price is confirmed before we book. It doesn't change unless the scope does.",
  },
  {
    title: "50% deposit locks your date",
    body: "The remaining balance is due on the day of your move once the job is complete.",
  },
];

const trust: Feature[] = [
  { icon: "shieldCheck", title: "Licensed & Insured", body: "Your move is handled by licensed, insured moving professionals." },
  { icon: "scale", title: "Price Match Guarantee", body: "Show us a comparable written quote and we'll match it." },
  { icon: "box", title: "4 Weeks Free Storage", body: "Included with every move, for when your dates don't line up." },
  { icon: "clock", title: "Available Mon–Sun 7am–10pm", body: "Evenings and weekends included, so you can move when it suits you." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Moving Services"
        title="Your Move, Handled."
        body="From a single apartment to a full office relocation — we send the right team for every job. Flat-rate pricing, confirmed before we arrive."
        cta={{ label: "Get a Free Quote", href: quoteHref }}
        image={collaterals.teamGroup}
        imagePosition="right center"
      />

      <section className="overflow-x-clip bg-brand-surface py-24 lg:py-36">
        <div className="container">
          <FadeUp>
            <h2 className="text-center font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-brand-navy">
              What We Handle
            </h2>
          </FadeUp>
          <ServicesBento />
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-24 lg:py-36">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-teal/10 blur-3xl"
          aria-hidden
        />
        <div className="container relative">
          <FadeUp>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              No Surprises. Ever.
            </h2>
          </FadeUp>
          <div className="mt-16 lg:mt-24">
            <NumeralColumns items={pricingSteps} />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container">
          <IconFeatures features={trust} />
        </div>
      </section>

      <ServiceAreas title="We Serve These Areas" className="bg-brand-surface" />

      <CtaBand
        title="Ready to Book Your Move?"
        primary={{ label: "Get a Free Quote", href: quoteHref }}
        showPhone
      />
    </>
  );
}
