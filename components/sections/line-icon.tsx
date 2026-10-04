"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** 48×48 stroke icons. Each string is one path, drawn in sequence when it scrolls into view. */
const icons = {
  tag: ["M6 24 24 6h16a2 2 0 0 1 2 2v16L24 42a2 2 0 0 1-2.8 0L6 26.8a2 2 0 0 1 0-2.8Z", "M31 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0"],
  shield: ["M24 5 8 11v11c0 10 7 18 16 21 9-3 16-11 16-21V11L24 5Z", "m17 24 5 5 9-10"],
  rings: ["M4 24a12 12 0 1 0 24 0a12 12 0 1 0-24 0", "M20 24a12 12 0 1 0 24 0a12 12 0 1 0-24 0"],
  scale: ["M24 8v32", "M14 40h20", "M8 14h32", "M8 14 3 26a5 5 0 0 0 10 0L8 14Z", "M40 14l-5 12a5 5 0 0 0 10 0l-5-12Z"],
  box: ["M8 16 24 8l16 8v16l-16 8-16-8V16Z", "m8 16 16 8 16-8", "M24 24v16"],
  clock: ["M6 24a18 18 0 1 0 36 0a18 18 0 1 0-36 0", "M24 14v10l7 4"],
  team: ["M11 16a6 6 0 1 0 12 0a6 6 0 1 0-12 0", "M5 38c0-7 5-11 12-11s12 4 12 11", "M31 12a5 5 0 1 1 0 10", "M35 27c5 1 8 5 8 11"],
  receipt: ["M12 6h24v36l-4-3-4 3-4-3-4 3-4-3-4 3V6Z", "m18 22 4 4 8-8"],
  phone: ["M15 6h18a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z", "M21 36h6"],
  calendar: ["M8 12h32v28H8z", "M8 20h32", "M16 6v10", "M32 6v10", "m18 30 4 4 8-8"],
  eye: ["M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24Z", "M18 24a6 6 0 1 0 12 0a6 6 0 1 0-12 0"],
  heart: ["M24 40S6 29 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23Z"],
  building: ["M8 42V8h20v34", "M28 18h12v24", "M4 42h40", "M14 15h2M20 15h2M14 22h2M20 22h2M14 29h2M20 29h2", "M34 26h0M34 33h0"],
  steeple: ["M24 4v8", "M21 7h6", "M14 22 24 12l10 10v20H14V22Z", "M8 42h32", "M21 42v-8a3 3 0 0 1 6 0v8"],
  warehouse: ["M4 18 24 8l20 10v24H4V18Z", "M12 42V26h24v16", "M12 32h24", "M12 37h24"],
  store: ["M6 18 9 8h30l3 10", "M6 18a6 6 0 0 0 12 0 6 6 0 0 0 12 0 6 6 0 0 0 12 0", "M9 24v18h30V24", "M20 42V32h8v10"],
  keys: ["M10 30a8 8 0 1 0 16 0a8 8 0 1 0-16 0", "m23 24 15-15", "m33 14 5 5", "m29 18 4 4"],
} as const;

export type IconName = keyof typeof icons;

export function LineIcon({ name, className, strokeWidth = 2.5 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const reduce = useReducedMotion();
  const paths = icons[name];
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-brand-teal", className)}
      aria-hidden
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: 0.3, opacity: 1 }}
          {...(reduce
            ? { animate: { pathLength: 1, opacity: 1 } }
            : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, margin: "-60px" } })}
          transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.15 + i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
