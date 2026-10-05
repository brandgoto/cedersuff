"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, CalendarCheck, ChevronDown } from "@/components/icons";

import { Marquee } from "@/components/home/marquee";
import { collaterals } from "@/lib/collaterals";
import { overlay, quoteHref } from "@/lib/site";
import { useMediaQuery } from "@/lib/use-media-query";

const HEADLINE = "The Move You'll Actually Remember — For the Right Reasons.";
const MARQUEE =
  "TORONTO · LONDON ON · LICENSED & INSURED · PRICE MATCH GUARANTEE · AVAILABLE 7 DAYS · FLAT-RATE PRICING · ";
const TRUST = ["Flat-Rate Pricing", "50% Deposit to Confirm", "Mon–Sun, 7am–10pm"];

const WORDS = HEADLINE.split(" ");
const WORD_STAGGER = 0.07;
// Subheadline waits for the headline: words × 0.07s + 0.2s
const SUB_DELAY = WORDS.length * WORD_STAGGER + 0.2;
const EASE = [0.22, 1, 0.36, 1] as const;

const headline: Variants = { hidden: {}, show: { transition: { staggerChildren: WORD_STAGGER } } };
const word: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const wordInstant: Variants = { hidden: word.hidden, show: { opacity: 1, y: 0, transition: { duration: 0 } } };

const image = collaterals.truck;

/**
 * Full-bleed hero: truck photo (layer 1, parallax ≥768px) → flat navy overlay (layer 2)
 * → content (layer 4) → notification pill + scroll cue (desktop only).
 */
export function Hero() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const parallax = desktop && !reduce;

  const { scrollY } = useScroll();
  // Exit: background drifts at ~0.3× scroll (parallax ≥768px); the copy rises faster and fades,
  // so the hero hands over to the next section instead of hard-cutting.
  const imageY = useTransform(scrollY, [0, 400], parallax ? [0, -80] : [0, 0]);
  const contentY = useTransform(scrollY, [0, 400], reduce ? [0, 0] : [0, -120]);
  const contentOpacity = useTransform(scrollY, [0, 300], reduce ? [1, 1] : [1, 0]);
  const cueOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-navy">
      {/* Layer 1 — photo. 100px taller than the hero so the parallax never exposes an edge. */}
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 top-0 h-[calc(100%+100px)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="h-full w-full object-cover object-center md:object-[right_center]"
        />
      </motion.div>

      {/* Layer 2 — flat overlay (no gradient); darker on mobile */}
      <div className="absolute inset-0 md:hidden" style={{ background: overlay.navy82 }} aria-hidden />
      <div className="absolute inset-0 hidden md:block" style={{ background: overlay.navy72 }} aria-hidden />

      {/* Layer 4 — content (rises and fades on scroll) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 pb-[clamp(60px,10vh,120px)] pt-[clamp(80px,12vh,140px)]"
      >
        <div className="mx-auto max-w-[800px] text-center md:mx-0 md:text-left">
          <motion.div {...fade(0)}>
            <Marquee
              text={MARQUEE}
              duration="30s"
              itemClassName="font-heading text-[11px] font-semibold tracking-[0.1em] text-brand-teal"
            />
          </motion.div>

          <motion.h1
            variants={headline}
            initial="hidden"
            animate="show"
            className="mt-8 font-heading text-[42px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[64px] lg:text-[88px]"
          >
            {WORDS.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span variants={reduce ? wordInstant : word} className="inline-block">
                  {w}
                  {i < WORDS.length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...fade(SUB_DELAY)}
            className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-white/70 md:mx-0 lg:text-[18px]"
          >
            Residential moving and commercial cleaning across Toronto, London ON, and surrounding areas.
          </motion.p>

          <motion.div {...fade(SUB_DELAY + 0.15)} className="mt-9 flex flex-col gap-3 md:flex-row">
            <Link
              href={quoteHref}
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-brand-teal px-8 font-heading text-base font-semibold text-brand-navy transition-colors hover:bg-brand-teal/90"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/40 px-8 font-heading text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              See Our Services
            </Link>
          </motion.div>

          <motion.p
            {...fade(SUB_DELAY + 0.3)}
            className="mt-6 text-[13px] text-white/50"
          >
            {TRUST.map((t, i) => (
              <span key={t}>
                {i > 0 && <span aria-hidden> · </span>}
                <span className="whitespace-nowrap">{t}</span>
              </span>
            ))}
          </motion.p>
        </div>
      </motion.div>

      {/* Layer 5 — notification pill (desktop). Sits left of the floating WhatsApp button. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22, delay: 1.2 }}
        className="absolute bottom-10 right-28 z-10 hidden items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-lg md:flex"
      >
        <span className="relative flex h-2.5 w-2.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-teal" />
        </span>
        <CalendarCheck className="h-4 w-4 text-brand-navy" aria-hidden />
        <span className="text-[13px] font-semibold text-brand-navy">New booking confirmed</span>
      </motion.div>

      {/* Scroll cue (desktop) — fades out over the first 80px */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-7 w-7 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
