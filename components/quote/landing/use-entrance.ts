"use client";

import { useEffect } from "react";
import { useAnimationControls, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Breakpoint-aware entrance. Server + first client render share `initial={{ opacity: 0 }}` (no transform),
 * so hydration matches; the direction is chosen after mount:
 *   <1024px  hero fades in (0.4s) · form slides up y:30→0 (0.5s, +0.2s)
 *   ≥1024px  hero from left x:-20→0 (0.6s) · form from right x:20→0 (0.6s, +0.1s)
 */
export function useEntrance(part: "hero" | "form") {
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      controls.set({ opacity: 1, x: 0, y: 0 });
      return;
    }
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (desktop) {
      controls.set({ x: part === "hero" ? -20 : 20 });
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.6, delay: part === "hero" ? 0 : 0.1, ease: EASE } });
    } else if (part === "hero") {
      controls.start({ opacity: 1, transition: { duration: 0.4 } });
    } else {
      controls.set({ y: 30 });
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: EASE } });
    }
  }, [controls, part, reduce]);

  return controls;
}
