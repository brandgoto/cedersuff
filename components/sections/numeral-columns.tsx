"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Three columns with giant teal numerals behind the copy; numerals drift at a different speed (depth). */
export function NumeralColumns({ items }: { items: { title: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);

  return (
    <ol ref={ref} className="grid gap-16 md:grid-cols-3 md:gap-10">
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 1, y: 40 }}
          {...(reduce
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } })}
          transition={reduce ? { duration: 0 } : { duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-16"
        >
          <motion.span
            style={{ y: numY }}
            className="absolute -top-4 left-0 select-none font-heading text-[140px] font-bold leading-none tracking-[-0.05em] text-brand-teal/15"
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </motion.span>
          <div className="relative">
            <h3 className="font-heading text-2xl font-semibold leading-tight text-white md:text-[28px]">
              <span className="sr-only">Step {i + 1}: </span>
              {item.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{item.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
