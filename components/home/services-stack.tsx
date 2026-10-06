"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "@/components/icons";

import { FadeUp } from "@/components/motion/reveal";
import { MaskedLines } from "@/components/motion/masked-lines";
import { collaterals, type Collateral } from "@/lib/collaterals";
import { quoteHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Service = {
  eyebrow: string;
  title: string[];
  body: string;
  cta: { label: string; href: string };
  image: Collateral;
  dark?: boolean;
};

const services: Service[] = [
  {
    eyebrow: "Moving Services",
    title: ["Your Move,", "Handled."],
    body: "Residential, commercial, long-distance, or same-day — we send the right team for your job. Flat-rate pricing confirmed before we arrive. No surprises on moving day.",
    cta: { label: "See all moving services", href: "/services" },
    image: collaterals.team,
  },
  {
    eyebrow: "Commercial Cleaning",
    title: ["Clean Spaces,", "Monthly."],
    body: "Offices, churches, warehouses, retail — we manage recurring commercial cleaning so you don't have to think about it. One contract, one invoice, one team that shows up.",
    cta: { label: "Book a site visit", href: `${quoteHref}?service=commercial-cleaning` },
    image: collaterals.cleaning,
    dark: true,
  },
];

function Card({ service }: { service: Service }) {
  const dark = service.dark;
  return (
    <article
      className={cn(
        "grid w-full overflow-hidden rounded-[32px] md:h-[min(640px,78vh)] md:grid-cols-2",
        dark ? "bg-brand-ink text-white" : "border border-brand-navy/10 bg-white text-brand-navy shadow-xl shadow-brand-navy/5"
      )}
    >
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
        {/* Brand teal fails contrast on white — darker teal (#17735c) on the light card */}
        <p className={cn("text-xs font-semibold uppercase tracking-[0.25em]", dark ? "text-brand-teal" : "text-[#17735c]")}>
          {service.eyebrow}
        </p>
        <MaskedLines
          lines={service.title}
          className="mt-5 font-heading text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        />
        <p className={cn("mt-6 max-w-md text-lg leading-relaxed", dark ? "text-white/65" : "text-foreground/65")}>
          {service.body}
        </p>
        <Link
          href={service.cta.href}
          className={cn(
            "group mt-8 inline-flex w-fit items-center gap-2 border-b-2 pb-1 font-semibold transition-colors hover:border-brand-teal",
            dark ? "border-white/20 text-white" : "border-brand-navy/15 text-brand-navy"
          )}
        >
          {service.cta.label}
          <ArrowRight className="h-4 w-4 text-brand-teal transition-transform motion-safe:group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="relative h-72 sm:h-96 md:h-auto">
        <Image
          quality={90}
          src={service.image.src}
          alt={service.image.alt}
          fill
          loading="lazy"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "top center" }}
        />
      </div>
    </article>
  );
}

/** Each card pins; the next slides over it while the one underneath settles back (scale + dim). */
function StackedCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const isLast = index === total - 1;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], reduce || isLast ? [1, 1] : [1, 0.94]);
  const brightness = useTransform(progress, [start, 1], reduce || isLast ? [1, 1] : [1, 0.75]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div className="sticky flex h-screen items-center" style={{ top: 0 }}>
      <motion.div
        style={{ scale, filter, y: index * 24 }}
        className="w-full origin-top will-change-transform"
      >
        <Card service={service} />
      </motion.div>
    </div>
  );
}

export function ServicesStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="bg-brand-surface">
      {/* Desktop / tablet: pinned stacking cards */}
      {/* +30vh so the last card holds for a beat before the section moves on */}
      <div ref={ref} className="container relative hidden md:block" style={{ height: `${services.length * 100 + 30}vh` }}>
        {services.map((s, i) => (
          <StackedCard key={s.eyebrow} service={s} index={i} total={services.length} progress={scrollYProgress} />
        ))}
      </div>

      {/* Phones: simple stack */}
      <div className="container space-y-6 py-16 md:hidden">
        {services.map((s) => (
          <FadeUp key={s.eyebrow}>
            <Card service={s} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
