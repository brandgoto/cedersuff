"use client";

import { motion, useReducedMotion } from "framer-motion";

import { MaskedHeadline } from "@/components/sections/page-hero";

/** Minimal centred hero (no image) above the contact columns. */
export function ContactHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden bg-brand-ink px-5 pb-14 pt-32 text-center">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />
      <div className="relative max-w-2xl">
        <MaskedHeadline
          text="Get in Touch"
          className="font-heading text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] text-white lg:text-[64px]"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-[480px] text-base leading-relaxed text-white/70"
        >
          We&apos;re available Mon–Sun, 7am–10pm. We typically respond within a few hours.
        </motion.p>
      </div>
    </section>
  );
}
