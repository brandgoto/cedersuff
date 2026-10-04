"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Collateral } from "@/lib/collaterals";

const words: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } };
const word: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const instant: Variants = { hidden: word.hidden, show: { opacity: 1, y: 0, transition: { duration: 0 } } };

export const ALIGN_LEFT = "px-5 lg:pl-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))] lg:pr-16";

/** Headline that rises word by word from behind a mask on load. */
export function MaskedHeadline({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const parts = text.split(" ");
  return (
    <motion.h1 variants={words} initial="hidden" animate="show" className={className}>
      {parts.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={reduce ? instant : word} className="inline-block">
            {w}
            {i < parts.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/**
 * Inner-page hero (Services, Cleaning): bg-ink, ≥60vh.
 * Desktop: copy 55% / image 45%. Mobile: image first, then copy.
 * Image is shown at its own aspect ratio inside a rounded frame — no gradient, no cropping.
 */
export function PageHero({
  eyebrow,
  title,
  body,
  cta,
  image,
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: Collateral;
  /** object-position — "right center" for truck/team shots, "center" for cleaning */
  imagePosition?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Copy drifts up and dims as the hero scrolls away
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0.3]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-brand-ink pt-24 lg:grid lg:min-h-[60vh] lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:items-center lg:pt-20"
    >
      {/* Image — first on mobile, right column on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="px-5 lg:order-last lg:py-16 lg:pl-0 lg:pr-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))]"
      >
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className={`relative z-10 flex flex-col justify-center pb-16 pt-10 lg:py-24 ${ALIGN_LEFT}`}
      >
        <motion.p {...fade(0)} className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">
          {eyebrow}
        </motion.p>
        <MaskedHeadline
          text={title}
          className="mt-5 font-heading text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] text-white lg:text-[64px]"
        />
        <motion.p {...fade(0.5)} className="mt-6 max-w-[480px] text-base leading-relaxed text-white/70">
          {body}
        </motion.p>
        <motion.div {...fade(0.65)} className="mt-9">
          <Button asChild variant="accent" size="lg" className="group h-14 rounded-full px-8 text-base">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight className="transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
