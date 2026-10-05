"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { Phone } from "@/components/icons";

import { ParallaxImage } from "@/components/sections/parallax-image";
import { collaterals, type Collateral } from "@/lib/collaterals";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  body: string;
  /** Entrance offset — each card arrives from its own direction */
  from: TargetAndTransition;
  duration?: number;
  image?: Collateral;
  large?: boolean;
  urgent?: boolean;
};

// 4-column bento: [Residential ×2][Commercial][Long-distance] / [Same-day][Packing][Storage ×2]
const services: Service[] = [
  {
    title: "Residential Moving",
    body: "From a single bedroom to a full family home. Our team handles loading, transport, and unloading with care.",
    image: collaterals.residential,
    large: true,
    from: { x: -60 },
  },
  {
    title: "Commercial Moving",
    body: "Office relocations handled efficiently — weekend and after-hours availability so your business loses no working time.",
    from: { y: 60 },
  },
  {
    title: "Long-Distance Moving",
    body: "Moving across Ontario or further? We coordinate long-distance moves with the same flat-rate pricing and personal service.",
    from: { x: 60 },
  },
  {
    title: "Same-Day Emergency",
    body: "Need to move today? Call us. We dispatch our fastest available team and confirm availability on the call.",
    urgent: true,
    from: { y: -60 },
    duration: 0.4,
  },
  {
    title: "Packing & Unpacking",
    body: "We supply materials and do the packing. Everything wrapped, labelled, and ready to move.",
    from: { y: 60 },
  },
  {
    title: "Storage",
    body: "4 weeks of free storage included with every move. Need longer? Ask about our storage options.",
    image: collaterals.storage,
    large: true,
    from: { x: 60 },
  },
];

function UrgencyDot() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-[#EF4444]"
      animate={reduce ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function ServicesBento() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 1, ...s.from }}
          {...(reduce
            ? { animate: { opacity: 1, x: 0, y: 0 } }
            : { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: "-60px" } })}
          transition={reduce ? { duration: 0 } : { duration: s.duration ?? 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full", s.large && "md:col-span-2")}
        >
          {/* Inner element carries the hover lift so it doesn't fight the entrance transform */}
          <div
            className={cn(
              "group relative flex h-full flex-col overflow-hidden rounded-3xl border-t-4 border-brand-teal shadow-sm transition duration-300 hover:shadow-2xl hover:shadow-brand-navy/10 motion-safe:hover:-translate-y-1.5",
              s.urgent ? "bg-brand-teal text-brand-navy" : "bg-white text-brand-navy"
            )}
          >
            {/* Decorative counter */}
            <span
              className="pointer-events-none absolute left-6 top-4 z-10 select-none font-heading text-[40px] font-bold leading-none text-brand-navy opacity-[0.06]"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.urgent && <UrgencyDot />}

            {s.image && (
              <div className="relative h-60 overflow-hidden lg:h-72">
                <div className="absolute inset-0 transition-transform [transition-duration:400ms] ease-out motion-safe:group-hover:scale-105">
                  <ParallaxImage image={s.image} sizes="(min-width: 1024px) 50vw, 100vw" strength={10} />
                </div>
              </div>
            )}

            <div className={cn("flex flex-1 flex-col p-8", !s.image && "pt-16")}>
              <h3
                className={cn(
                  "font-heading font-semibold leading-tight tracking-[-0.02em]",
                  s.large ? "text-3xl lg:text-4xl" : "text-2xl"
                )}
              >
                {s.title}
              </h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  s.urgent ? "text-brand-navy/80" : "text-foreground/65",
                  s.large && "max-w-lg text-lg"
                )}
              >
                {s.body}
              </p>
              {s.urgent && (
                <div className="mt-auto pt-6">
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-navy/90"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    Call Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
