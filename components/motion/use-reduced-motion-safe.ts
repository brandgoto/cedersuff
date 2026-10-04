"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Reduced-motion flag that is `false` on the server and the first client render, then updates.
 * Use it when the preference changes *rendered elements or classes* (not just motion props), so hydration matches.
 */
export function useReducedMotionSafe() {
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(!!prefers), [prefers]);
  return reduce;
}
