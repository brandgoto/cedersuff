"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { MaskedHeadline } from "@/components/sections/page-hero";

const WORDMARK = "MOVING · CLEANING · TORONTO · LONDON ON · ";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Two outlined wordmark rows slide in opposite directions as you scroll
  const rowA = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const rowB = useTransform(scrollYProgress, [0, 1], reduce ? ["-18%", "-18%"] : ["-18%", "0%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);

  return (
    <section ref={ref} className="relative flex min-h-[72vh] items-center overflow-hidden bg-brand-ink pb-40 pt-36 sm:pb-52">
      <div className="pointer-events-none absolute inset-x-0 bottom-6 select-none space-y-2" aria-hidden>
        {[rowA, rowB].map((x, i) => (
          <motion.p
            key={i}
            style={{ x, WebkitTextStroke: "1px rgba(62,207,170,0.22)" }}
            className="whitespace-nowrap font-heading text-[clamp(4rem,11vw,10rem)] font-bold leading-none tracking-[-0.03em] text-transparent"
          >
            {WORDMARK.repeat(3)}
          </motion.p>
        ))}
      </div>
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />

      <motion.div style={{ y: copyY }} className="container relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">About CEDERSUFF</p>
        <MaskedHeadline
          text="Built Around Your Move."
          className="mt-6 max-w-4xl font-heading text-[clamp(2.75rem,6vw,4rem)] font-semibold leading-[1] tracking-[-0.035em] text-white"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          CEDERSUFF is a Toronto-based moving and commercial cleaning company serving Ontario households and
          businesses. We coordinate every job personally — the right team for your move, confirmed pricing, and a
          direct line to us throughout.
        </motion.p>
      </motion.div>
    </section>
  );
}
