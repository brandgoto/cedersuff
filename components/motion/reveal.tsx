"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/*
 * Scroll-reveal primitives, tuned to the reference sites: a short, soft rise (18px, 0.7s,
 * cubic-bezier(0.2, 0.7, 0.2, 1)). Content stays visible — only position moves.
 * Reduced motion: same `initial` (server and client HTML match), then jump to the resting state.
 */

const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;
export const REVEAL_EASE = [0.2, 0.7, 0.2, 1] as const;
const EASE = REVEAL_EASE;

const hiddenState = { opacity: 1, y: 18 };
const shownState = { opacity: 1, y: 0 };

type Tag = "div" | "ul" | "ol" | "li" | "section";
const tags = { div: motion.div, ul: motion.ul, ol: motion.ol, li: motion.li, section: motion.section };

type Props = { children: ReactNode; className?: string; as?: Tag };

export function FadeUp({ children, className, as = "div", delay = 0 }: Props & { delay?: number }) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      initial={hiddenState}
      {...(reduce ? { animate: shownState } : { whileInView: shownState, viewport: VIEWPORT })}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = {
  hidden: hiddenState,
  show: { ...shownState, transition: { duration: 0.7, ease: EASE } },
};
const itemInstant: Variants = { hidden: hiddenState, show: { ...shownState, transition: { duration: 0 } } };

export function Stagger({ children, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      variants={container}
      initial="hidden"
      {...(reduce ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT })}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  return (
    <Comp className={className} variants={reduce ? itemInstant : item}>
      {children}
    </Comp>
  );
}
