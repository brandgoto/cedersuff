"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";

import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { MaskedLines } from "@/components/motion/masked-lines";
import { quoteHref, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const included = [
  "Flat-rate pricing",
  "One dedicated point of contact throughout your job",
  "4 weeks free storage",
  "Licensed & insured",
];

function ClockIllustration() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden>
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="60" cy="60" r="44" stroke="#3ECFAA" strokeWidth="4" strokeDasharray="200 77" strokeLinecap="round" transform="rotate(-90 60 60)" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="60" y1="20" x2="60" y2="27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} 60 60)`} />
      ))}
      <line x1="60" y1="60" x2="60" y2="34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="60" x2="78" y2="70" stroke="#3ECFAA" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5" fill="#3ECFAA" />
    </svg>
  );
}

function Cell({
  className,
  wrapperClassName,
  children,
}: {
  featured?: boolean;
  className: string;
  wrapperClassName?: string;
  children: ReactNode;
}) {
  return (
    <StaggerItem className={cn("h-full", wrapperClassName)}>
      <div className={cn("relative flex h-full flex-col overflow-hidden rounded-3xl p-8 lg:p-10", className)}>
        {children}
      </div>
    </StaggerItem>
  );
}

export function Packages() {
  return (
    <section className="relative bg-white py-24 lg:py-36">
      <div className="container relative">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <MaskedLines lines={["Transparent Packages"]} className="font-heading text-[clamp(2.5rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-brand-navy" />
          <p className="mt-5 text-lg text-foreground/65">
            Every package includes flat-rate pricing and one point of contact from quote to completion.
          </p>
        </FadeUp>

        <Stagger className="mt-16 grid gap-4 lg:grid-cols-[1fr_1fr_1.2fr] lg:grid-rows-[auto_auto]">
          {/* Cell 1 — Basic Move */}
          <Cell className="border border-brand-navy bg-white text-brand-navy">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-navy/50">Package 01</p>
            <h3 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.02em]">Basic Move</h3>
            <p className="mt-5 font-heading text-[32px] font-semibold leading-none">From $500</p>
            <p className="mt-3 text-sm font-medium text-brand-navy/70">2 movers · up to 3 hours · $150/hr after</p>
            <p className="mt-5 text-foreground/65">
              Loading, transport, and unloading. Our team handles everything from your door to theirs.
            </p>
            <div className="mt-auto pt-8">
              <Button asChild size="lg" className="w-full rounded-full">
                <Link href={quoteHref}>Get a Quote</Link>
              </Button>
            </div>
          </Cell>

          {/* Cell 2 — Move + Deep Clean (Most Popular) */}
          <Cell featured className="bg-brand-teal text-brand-navy">
            <span className="w-fit rounded-full bg-brand-navy px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Most Popular
            </span>
            <h3 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.02em]">Move + Deep Clean</h3>
            <dl className="mt-5 space-y-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy/70">Studio / 1 bed</dt>
                <dd className="font-heading text-[28px] font-semibold leading-tight">From $799</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy/70">2 bedroom</dt>
                <dd className="font-heading text-[28px] font-semibold leading-tight">From $1,000</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm font-medium text-brand-navy/80">Includes move-out clean · $150/hr extra time</p>
            <p className="mt-5 text-brand-navy/80">
              Everything in Basic Move, plus a professional deep clean of your old or new space. One booking, one
              team.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-white text-brand-navy hover:bg-white/90"
            >
              <Link href={quoteHref}>Get a Quote</Link>
            </Button>
          </Cell>

          {/* Cell 3 — Emergency, spans both rows */}
          <Cell
            wrapperClassName="lg:col-start-3 lg:row-span-2 lg:row-start-1"
            className="bg-brand-ink text-white"
          >
            <span className="w-fit rounded-full bg-brand-teal px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy">
              Same-Day
            </span>
            <h3 className="mt-5 font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Emergency Move
            </h3>
            <p className="mt-5 font-heading text-2xl font-semibold text-brand-teal">Pricing on request</p>
            <p className="mt-2 text-sm text-white/70">Call or WhatsApp to confirm availability</p>
            <p className="mt-5 max-w-sm text-white/70">
              Need to move today? We dispatch our fastest available team. Availability not guaranteed — call to
              confirm.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 w-fit rounded-full bg-brand-teal px-7 text-brand-navy hover:bg-brand-teal/90"
            >
              <a href={siteConfig.phoneHref}>
                <Phone />
                Call Now
              </a>
            </Button>
            <div className="mt-auto flex items-end justify-between gap-6 pt-16 text-white">
              <ClockIllustration />
              <p className="text-right text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Fast response
              </p>
            </div>
          </Cell>

          {/* Cell 4 — included in every package (fills the bento's second row) */}
          <Cell wrapperClassName="lg:col-span-2" className="gap-5 bg-brand-surface">
            <div className="flex items-baseline justify-between gap-6">
              <p className="font-heading text-xl font-semibold text-brand-navy">Included in every package</p>
              <Link
                href={quoteHref}
                className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-brand-navy sm:inline-flex"
              >
                Get a quote
                <ArrowRight className="h-4 w-4 text-brand-teal transition-transform motion-safe:group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-brand-navy">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" strokeWidth={3} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Cell>
        </Stagger>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link href={quoteHref} className="group transition-colors hover:text-brand-navy">
            Bigger home or moving outside London? Contact us for a free quote{" "}
            <span className="inline-block transition-transform motion-safe:group-hover:translate-x-0.5">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
