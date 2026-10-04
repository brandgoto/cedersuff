"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BookingCard } from "@/components/sections/booking-card";
import { Button } from "@/components/ui/button";
import { MaskedLines } from "@/components/motion/masked-lines";
import { ctaLabels, quoteHref } from "@/lib/site";

const points = [
  "Flexible scheduling around your hours",
  // Spec wording swapped to "team" — see CLAUDE.md
  "Consistent team every visit",
  "Cancel with 30 days notice",
];

export function CleaningCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const backY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [100, -20]);

  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 lg:py-36">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-brand-teal/15 blur-3xl"
        aria-hidden
      />
      <div className="container relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">For Businesses</p>
            <MaskedLines lines={["Ongoing Cleaning, Sorted."]} className="mt-5 font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white" />
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Monthly contracts for offices, churches, warehouses, and commercial properties. Consistent team,
              flexible scheduling, one invoice per month.
            </p>
          </FadeUp>
          <Stagger as="ul" className="mt-8 space-y-3">
            {points.map((p) => (
              <StaggerItem as="li" key={p} className="flex items-center gap-3 font-medium text-white">
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                {p}
              </StaggerItem>
            ))}
          </Stagger>
          <FadeUp className="mt-10">
            <Button asChild variant="accent" size="lg" className="h-14 rounded-full px-8 text-base">
              <Link href={`${quoteHref}?service=commercial-cleaning`}>{ctaLabels.cleaning}</Link>
            </Button>
            <p className="mt-5 text-sm font-medium text-brand-teal">
              <Link href={`${quoteHref}?service=moving-cleaning-bundle`} className="hover:underline">
                Booking a move? Add cleaning for 20% off.
              </Link>
            </p>
          </FadeUp>
        </div>

        <div ref={ref} className="relative flex flex-col items-center lg:items-end">
          {/* Depth layer behind the card */}
          <motion.div
            style={{ y: backY }}
            className="absolute right-0 top-8 hidden h-[85%] w-[85%] max-w-sm rotate-6 rounded-3xl border border-white/10 bg-white/5 lg:block"
            aria-hidden
          />
          <motion.div style={{ y: cardY }} className="relative w-full max-w-md">
            <BookingCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
