"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Inertial smooth scrolling (as on the reference sites). Native scroll position is kept, so
 * Framer Motion's useScroll / sticky sections keep working. Off for reduced-motion users;
 * touch devices keep native scrolling (Lenis default).
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => lenis.destroy();
  }, []);

  // Start each page at the top without Lenis easing back to the old position
  useEffect(() => {
    (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
