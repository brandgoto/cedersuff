"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "@/components/icons";

import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";
import { FadeUp } from "@/components/motion/reveal";
import { MaskedLines } from "@/components/motion/masked-lines";
import { galleryImages } from "@/lib/collaterals";
import { quoteHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const ALIGN_LEFT = "pl-5 lg:pl-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))]";
// Vertical scroll needed per px of horizontal travel (<1 = track moves faster than the page)
const SCROLL_RATIO = 0.5;

function Heading() {
  return (
    <FadeUp className={ALIGN_LEFT}>
      <MaskedLines lines={["The Work Speaks."]} className="font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-white" />
      <p className="mt-4 text-lg text-white/60">Every job handled with care.</p>
    </FadeUp>
  );
}

function Cta() {
  return (
    <div className="flex justify-center">
      <Link
        href={quoteHref}
        className="group inline-flex items-center gap-2 border-b-2 border-white/20 pb-1 text-lg font-semibold text-white transition-colors hover:border-brand-teal"
      >
        Ready to book?
        <ArrowRight className="h-5 w-5 text-brand-teal transition-transform motion-safe:group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function GalleryImage({ index, className }: { index: number; className?: string }) {
  const img = galleryImages[index];
  return (
    <div className={cn("group relative shrink-0 overflow-hidden rounded-lg", className)}>
      <Image
        quality={90}
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        sizes="(min-width: 1024px) 860px, 100vw"
        className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
      />
    </div>
  );
}

/**
 * Desktop: the section pins while vertical scroll drives the gallery sideways.
 * Reduced motion: a plain horizontally scrollable, snap-aligned row instead.
 * Mobile: images stack vertically.
 */
export function Showcase() {
  const reduce = useReducedMotionSafe();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  const pinned = !reduce;

  return (
    <section className="bg-brand-ink" aria-label="Gallery">
      {/* ── Desktop ── */}
      <div
        ref={outerRef}
        className="relative hidden lg:block"
        style={{ height: pinned ? `calc(100vh + ${Math.round(distance * SCROLL_RATIO)}px)` : undefined }}
      >
        <div
          className={cn(
            "flex flex-col justify-center gap-10 overflow-hidden py-24",
            pinned && "sticky top-0 h-screen"
          )}
        >
          <Heading />
          <motion.div
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className={cn(
              "flex w-max gap-4 pr-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))]",
              ALIGN_LEFT,
              !pinned && "w-auto snap-x snap-mandatory overflow-x-auto pb-4 [&>*]:snap-start"
            )}
          >
            {galleryImages.map((_, i) => (
              <GalleryImage key={i} index={i} className="h-[min(480px,52vh)] w-auto [&_img]:w-auto" />
            ))}
          </motion.div>
          {pinned && (
            <div className={cn("pr-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))]", ALIGN_LEFT)}>
              <div className="h-px w-full bg-white/10">
                <motion.div style={{ width: progress }} className="h-px bg-brand-teal" />
              </div>
            </div>
          )}
          <Cta />
        </div>
      </div>

      {/* ── Mobile / tablet ── */}
      <div className="space-y-10 py-24 lg:hidden">
        <Heading />
        <div className="container space-y-4">
          {galleryImages.map((_, i) => (
            <FadeUp key={i}>
              <GalleryImage index={i} className="w-full" />
            </FadeUp>
          ))}
        </div>
        <Cta />
      </div>
    </section>
  );
}
