"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MaskedLines } from "@/components/motion/masked-lines";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Tell us about your move",
    body: "Fill in the quote form or message us on WhatsApp. Takes 60 seconds.",
  },
  {
    title: "Get your flat-rate quote",
    body: "Your price is confirmed before we book. It only changes if the scope of your job changes.",
  },
  {
    title: "Lock in your date",
    body: "A 50% deposit confirms your booking. The rest is due on the day.",
  },
  {
    title: "We handle the rest",
    body: "Our team arrives on time, moves everything with care, and checks in with you throughout the job.",
  },
];

const EASE = [0.2, 0.7, 0.2, 1] as const;
const num = (i: number) => String(i + 1).padStart(2, "0");

/** Desktop: the panel pins while scroll advances through the steps (Plinth-style chapter). */
function PinnedSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${steps.length * 90 + 10}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-20">
          {/* Left: heading + progress rail */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">How it works</p>
            <MaskedLines
              lines={["Four Steps to Your", "Stress-Free Move"]}
              className="mt-5 font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white"
            />
            <ol className="relative mt-12 space-y-5 pl-6">
              <span className="absolute bottom-1 left-0 top-1 w-px bg-white/15" aria-hidden>
                <motion.span style={{ height: railFill }} className="block w-full bg-brand-teal" />
              </span>
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "flex items-baseline gap-4 font-heading text-lg transition-colors duration-300",
                    i === active ? "text-white" : "text-white/35"
                  )}
                >
                  <span className="w-6 text-sm tabular-nums text-brand-teal">{num(i)}</span>
                  {s.title}
                </li>
              ))}
            </ol>
          </div>

          {/* Right: the active step takes the stage */}
          <div className="relative min-h-[420px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -28 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              >
                <span
                  className="block select-none font-heading text-[220px] font-bold leading-[0.8] tracking-[-0.06em] text-brand-teal/15"
                  aria-hidden
                >
                  {num(active)}
                </span>
                <h3 className="mt-6 font-heading text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                  <span className="sr-only">Step {active + 1}: </span>
                  {steps[active].title}
                </h3>
                <p className="mt-5 max-w-lg text-xl leading-relaxed text-white/70">{steps[active].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Phones / tablets: a plain list with soft reveals. */
function StepList() {
  return (
    <div className="container py-24 lg:hidden">
      <FadeUp>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-teal">How it works</p>
      </FadeUp>
      <MaskedLines
        lines={["Four Steps to Your", "Stress-Free Move"]}
        className="mt-5 font-heading text-[clamp(2.25rem,7vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
      />
      <Stagger as="ol" className="mt-12 space-y-10">
        {steps.map((s, i) => (
          <StaggerItem as="li" key={s.title} className="border-t border-white/10 pt-6">
            <span className="font-heading text-sm tabular-nums text-brand-teal">{num(i)}</span>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-lg text-white/70">{s.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="relative bg-brand-navy">
      <PinnedSteps />
      <StepList />
    </section>
  );
}
