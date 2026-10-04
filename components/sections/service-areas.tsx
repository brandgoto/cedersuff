"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { MaskedLines } from "@/components/motion/masked-lines";
import { FadeUp } from "@/components/motion/reveal";
import { overlay, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Size = "lg" | "md" | "sm";
export type Area = { name: string; size: Size };

const lg = (name: string): Area => ({ name, size: "lg" });
const md = (name: string): Area => ({ name, size: "md" });
const sm = (name: string): Area => ({ name, size: "sm" });

/**
 * Full service-area list, ordered for the cluster: small pills on the outside, medium around,
 * Toronto + London ON in the middle so the centred wrap reads as a cluster.
 */
export const serviceAreas: Area[] = [
  sm("Markham"), sm("Richmond Hill"), sm("Newmarket"), sm("Aurora"), sm("Barrie"), sm("Kitchener"), sm("Waterloo"),
  md("Etobicoke"), md("North York"), md("Scarborough"), md("Mississauga"), md("Brampton"), md("Vaughan"), md("Hamilton"),
  lg("Toronto"), lg("London ON"),
  md("Oakville"), md("Burlington"), md("Milton"), md("Ajax"), md("Pickering"), md("Whitby"), md("Oshawa"),
  sm("Cambridge"), sm("Guelph"), sm("St. Catharines"), sm("Niagara Falls"), sm("Windsor"), sm("Kingston"), sm("Surrounding areas"),
];

const sizeClass: Record<Size, string> = {
  lg: "px-6 py-3 text-[15px] font-semibold",
  md: "px-4 py-2 text-[13px] font-medium",
  sm: "px-3 py-1.5 text-[12px] font-medium",
};

const toneClass = {
  light: {
    lg: "border-brand-navy bg-brand-navy text-white shadow-lg shadow-brand-navy/20",
    md: "border-brand-navy/15 bg-white text-brand-navy shadow-sm",
    sm: "border-brand-navy/10 bg-brand-surface text-brand-navy/80",
  },
  // On the video: translucent white glass, all text white
  dark: {
    lg: "border-white/25 bg-white/[0.12] text-white hover:bg-white/[0.22]",
    md: "border-white/25 bg-white/[0.12] text-white hover:bg-white/[0.22]",
    sm: "border-white/25 bg-white/[0.12] text-white hover:bg-white/[0.22]",
  },
};

// Vertical nudges (px) give the wrapped rows an organic, uneven edge on desktop
const NUDGE = [0, 10, -6, 4, -10, 6, -2, 8, -8, 2, 12, -4];

function Pill({ area, index, tone }: { area: Area; index: number; tone: "light" | "dark" }) {
  return (
    <li style={{ "--nudge": `${NUDGE[index % NUDGE.length]}px` } as React.CSSProperties} className="md:[margin-top:var(--nudge)]">
      <span
        className={cn(
          "inline-flex items-center gap-2 whitespace-nowrap rounded-full border font-heading transition duration-200 motion-safe:hover:-translate-y-0.5",
          sizeClass[area.size],
          toneClass[tone][area.size]
        )}
      >
        {area.size === "lg" && <span className="h-2 w-2 rounded-full bg-brand-teal" aria-hidden />}
        {area.name}
      </span>
    </li>
  );
}

/** Background video: plays only while on screen; held still for reduced motion. */
function BackgroundVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export function ServiceAreas({
  title = "We Come to You",
  className = "bg-white",
  areas = serviceAreas,
  video,
}: {
  title?: string;
  className?: string;
  areas?: Area[];
  /** Path to a looping background video (e.g. "/loading_logo.mp4"); switches the section to the dark style */
  video?: string;
}) {
  const tone = video ? "dark" : "light";

  return (
    <section className={cn("relative overflow-hidden py-24 lg:py-36", video ? "bg-brand-navy" : className)}>
      {video && (
        <>
          <BackgroundVideo src={video} />
          {/* Flat overlay — no gradient */}
          <div className="absolute inset-0" style={{ background: overlay.navy82 }} aria-hidden />
        </>
      )}

      <div className="container relative z-10">
        <MaskedLines
          lines={[title]}
          className={cn(
            "text-center font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold tracking-[-0.03em]",
            video ? "text-white" : "text-brand-navy"
          )}
        />

        <FadeUp className="mx-auto mt-14 max-w-5xl">
          <ul className="flex flex-wrap items-center justify-center gap-2.5 md:gap-x-3 md:gap-y-4">
            {areas.map((area, i) => (
              <Pill key={area.name} area={area} index={i} tone={tone} />
            ))}
          </ul>
        </FadeUp>

        <FadeUp className={cn("mt-12 text-center text-sm", video ? "text-white/60" : "text-foreground/60")}>
          Not sure if we cover your area?{" "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-semibold underline decoration-brand-teal decoration-2 underline-offset-4",
              video ? "text-white" : "text-brand-navy"
            )}
          >
            Message us
          </a>{" "}
          and we&apos;ll confirm.
        </FadeUp>
      </div>
    </section>
  );
}
