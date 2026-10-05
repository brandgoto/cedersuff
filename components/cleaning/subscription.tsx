"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "@/components/icons";

import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BookingCard } from "@/components/sections/booking-card";
import { Button } from "@/components/ui/button";
import { ctaLabels, quoteHref } from "@/lib/site";

const points = [
  "Flexible scheduling around your hours",
  "Consistent team every visit",
  "Monthly invoice — no per-visit billing",
  "Cancel with 30 days notice",
];

export function Subscription() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [4, 0, -2]);
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -10]);

  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 lg:py-36">
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />
      <div className="container relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">Monthly Contracts</p>
            <h2 className="mt-5 font-heading text-[clamp(2.5rem,5vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              Set It and Forget It.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Sign a monthly cleaning contract and we take it from there. Same team every visit, flexible
              scheduling, and one invoice at the end of the month.
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
          </FadeUp>
        </div>

        <div ref={ref} className="relative flex justify-center lg:justify-end">
          <motion.div
            style={{ y: ghostY }}
            className="absolute right-0 top-10 hidden h-[80%] w-[85%] max-w-sm -rotate-6 rounded-3xl border border-white/10 bg-white/5 lg:block"
            aria-hidden
          />
          <motion.div style={{ y: cardY, rotate: cardRotate }} className="relative w-full max-w-md">
            <BookingCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
