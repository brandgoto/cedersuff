"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const line: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};
const still: Variants = { hidden: { y: "0%" }, show: { y: "0%" } };

type Tag = "h1" | "h2" | "h3" | "p";
const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

/**
 * Heading that slides up line by line from behind a mask (QuickFleet-style).
 * Pass `lines` to control the breaks; each line still wraps naturally on narrow screens.
 */
export function MaskedLines({
  lines,
  as = "h2",
  className,
  lineClassName,
}: {
  lines: string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  return (
    <Comp
      aria-label={lines.join(" ")}
      variants={group}
      initial="hidden"
      {...(reduce
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } })}
      className={className}
    >
      {lines.map((text, i) => (
        // padding/margin pair keeps descenders inside the mask
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={reduce ? still : line} className={cn("block", lineClassName)}>
            {text}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
