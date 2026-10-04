"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { TealCheck } from "@/components/quote/landing/icons";
import { LearnMoreLinks } from "@/components/quote/landing/learn-more-links";
import { useEntrance } from "@/components/quote/landing/use-entrance";
import { collaterals } from "@/lib/collaterals";

const image = collaterals.residential;

const trust = [
  "Flat-rate pricing — your price confirmed before we book",
  "50% deposit to confirm your date",
  "Available Mon–Sun, 7am–10pm",
];

/**
 * Mobile/tablet: dark hero band (heading → image → trust) above the form sheet.
 * ≥1024px: sticky left column (heading → trust → image filling the rest → links).
 */
export function QuoteHero() {
  const controls = useEntrance("hero");

  return (
    <aside className="relative overflow-hidden bg-brand-ink text-white lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)]">
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="relative mx-auto flex max-w-[600px] flex-col px-6 pb-12 pt-8 md:px-10 md:pb-14 md:pt-10 lg:mx-0 lg:h-full lg:max-w-none lg:px-10 lg:pb-6 lg:pt-10 xl:px-14"
      >
        <div className="order-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-teal">Toronto · London ON</p>
          <h1 className="mt-3 font-heading text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[44px] lg:mt-4 lg:text-[clamp(2.5rem,3.4vw,3rem)]">
            Get Your Free Moving Quote.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70 lg:mt-4 lg:max-w-md lg:text-base">
            Flat-rate pricing confirmed before we arrive. No commitment required.
          </p>
        </div>

        {/* Photo: between intro and trust on mobile; fills the bottom of the column on desktop */}
        <div className="relative order-2 mt-6 h-[220px] overflow-hidden rounded-lg md:h-[280px] lg:order-3 lg:mt-8 lg:h-auto lg:min-h-[160px] lg:flex-1">
          <Image
            quality={90}
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 600px, 100vw"
            className="object-cover object-center"
          />
        </div>

        <ul className="order-3 mt-6 space-y-3 lg:order-2 lg:mt-8 lg:space-y-4">
          {trust.map((t) => (
            <li key={t} className="flex items-start gap-3 text-[15px] text-white/85">
              <TealCheck className="mt-px h-5 w-5 shrink-0" />
              {t}
            </li>
          ))}
        </ul>

        <LearnMoreLinks tone="dark" className="order-4 mt-5 hidden lg:flex" />
      </motion.div>
    </aside>
  );
}
