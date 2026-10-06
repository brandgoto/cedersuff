"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import type { Collateral } from "@/lib/collaterals";
import { cn } from "@/lib/utils";

/** Fills its (relatively positioned) parent; the photo drifts against the scroll inside the frame. */
export function ParallaxImage({
  image,
  sizes,
  strength = 8,
  priority,
  position,
  className,
}: {
  image: Collateral;
  sizes: string;
  /** Max travel, in % of frame height, each way */
  strength?: number;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }} className="absolute inset-x-0">
        <Image
          quality={90}
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position ?? image.focus }}
        />
      </motion.div>
    </div>
  );
}
