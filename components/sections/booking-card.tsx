"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, ClipboardList, Receipt, Repeat } from "@/components/icons";

import { cn } from "@/lib/utils";

type ClientRecord = {
  id: string;
  status: "Cleaning Confirmed" | "Move Confirmed";
  client: string;
  frequency: string;
  service: string;
  billing: string;
};

// Example bookings (illustrative, not real client records).
const clients: ClientRecord[] = [
  {
    id: "CS-0142",
    status: "Cleaning Confirmed",
    client: "Riverside Church",
    frequency: "Weekly",
    service: "Sanctuary & Hall Clean",
    billing: "Monthly invoice",
  },
  {
    id: "MV-0891",
    status: "Move Confirmed",
    client: "Hartley & Associates",
    frequency: "One-time",
    service: "Commercial Office Move",
    billing: "50% deposit paid",
  },
  {
    id: "CS-0203",
    status: "Cleaning Confirmed",
    client: "Nexus Coworking",
    frequency: "3× per week",
    service: "Office Deep Clean",
    billing: "Monthly invoice",
  },
  {
    id: "MV-0334",
    status: "Move Confirmed",
    client: "The Patel Family",
    frequency: "One-time",
    service: "Residential Move + Clean",
    billing: "50% deposit paid",
  },
  {
    id: "CS-0178",
    status: "Cleaning Confirmed",
    client: "Lakeshore Dental",
    frequency: "Weekly",
    service: "Medical Office Clean",
    billing: "Monthly invoice",
  },
  {
    id: "MV-0512",
    status: "Move Confirmed",
    client: "Bravo Retail Group",
    frequency: "One-time",
    service: "Store Relocation",
    billing: "50% deposit paid",
  },
];

const ROTATE_MS = 3000;
const EASE = [0.22, 1, 0.36, 1] as const;

// Out: up and away. In: up from below. mode="wait" keeps them sequential.
const swap = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
};
const swapInstant = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

/**
 * Faux booking UI used on the homepage (cleaning pitch) and the cleaning page (subscription).
 * The frame is static; the header status/id and the rows rotate through `clients` every 3s.
 * Pauses on mouse hover, or toggles pause on tap for touch. Reduced motion: first client, no rotation.
 */
export function BookingCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tapPaused, setTapPaused] = useState(false);
  const pointerType = useRef<string>("mouse");

  const paused = hovered || tapPaused;

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % clients.length), ROTATE_MS);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  const c = clients[reduce ? 0 : index];
  const isMove = c.status === "Move Confirmed";
  const motionProps = reduce ? swapInstant : swap;

  const rows = [
    { Icon: Building2, label: "Client", value: c.client },
    { Icon: ClipboardList, label: "Service", value: c.service },
    { Icon: Repeat, label: "Frequency", value: c.frequency },
    { Icon: Receipt, label: "Billing", value: c.billing },
  ];

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Example bookings"
        onPointerDown={(e) => (pointerType.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        onClick={() => pointerType.current !== "mouse" && setTapPaused((p) => !p)}
        className="overflow-hidden rounded-3xl bg-white text-brand-navy shadow-2xl shadow-black/30"
      >
        {/* Header: status + id swap with the rows */}
        <div className="flex h-[65px] items-center border-b border-brand-navy/10 px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`h-${c.id}`} {...motionProps} className="flex w-full items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none",
                      isMove ? "bg-brand-navy" : "bg-brand-teal"
                    )}
                  />
                  <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", isMove ? "bg-brand-navy" : "bg-brand-teal")} />
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-heading text-xs font-semibold",
                    isMove ? "bg-brand-navy text-white" : "bg-brand-teal/15 text-[#17735c]"
                  )}
                >
                  {c.status}
                </span>
              </div>
              <span className="rounded-md bg-brand-surface px-2 py-1 font-mono text-[11px] text-brand-navy/50">
                #{c.id}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.dl key={`r-${c.id}`} {...motionProps} className="divide-y divide-brand-navy/5">
              {rows.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between gap-4 py-4 text-sm">
                  <dt className="flex items-center gap-3 text-brand-navy/55">
                    <Icon className="h-4 w-4" aria-hidden />
                    {label}
                  </dt>
                  <dd className="text-right font-semibold">{value}</dd>
                </div>
              ))}
            </motion.dl>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between bg-brand-surface px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy font-heading text-lg font-bold leading-none text-brand-teal">
              C
            </span>
            <span className="font-heading text-xs font-semibold tracking-[0.2em]">CEDERSUFF</span>
          </div>
          <span className="text-xs text-brand-navy/45">{paused && !reduce ? "Paused" : `${index + 1} / ${clients.length}`}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
        {clients.map((client, i) => {
          const active = i === (reduce ? 0 : index);
          return (
            <motion.span
              key={client.id}
              initial={false}
              animate={{ width: active ? 16 : 6, backgroundColor: active ? "#3ECFAA" : "#D1D5DB" }}
              transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              className="block h-1.5 rounded-full"
            />
          );
        })}
      </div>

    </div>
  );
}
