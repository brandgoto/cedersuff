import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Feature icons (About, Why CEDERSUFF, Services trust row, Cleaning audiences).
 * Static, complete SVGs — no stroke-drawing animation, so an icon can never be caught half-drawn.
 * Explicit 36×36 size, viewBox 0 0 24 24, display:block + flexShrink:0.
 */
const icons = {
  // Reliability / Licensed & Insured / Vetted teams
  shieldCheck: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  // Transparency
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // Care
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
  // The right team for every job
  team: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  // Your price, confirmed first
  dollar: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  // One point of contact
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  // Flat-rate pricing
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
  // One team, two services
  rings: (
    <>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </>
  ),
  // Price match
  scale: (
    <>
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="7" y1="21" x2="17" y2="21" />
      <line x1="3" y1="7" x2="21" y2="7" />
      <path d="M6 7l-3 7a3 3 0 0 0 6 0z" />
      <path d="M18 7l-3 7a3 3 0 0 0 6 0z" />
    </>
  ),
  // Storage
  box: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  // Hours
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  // Cleaning audiences
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </>
  ),
  steeple: (
    <>
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="10" y1="4" x2="14" y2="4" />
      <path d="M6 22V11l6-5 6 5v11" />
      <line x1="3" y1="22" x2="21" y2="22" />
      <path d="M10 22v-4a2 2 0 0 1 4 0v4" />
    </>
  ),
  warehouse: (
    <>
      <path d="M2 21V8l10-5 10 5v13" />
      <path d="M6 21v-9h12v9" />
      <line x1="6" y1="15" x2="18" y2="15" />
      <line x1="6" y1="18" x2="18" y2="18" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 12v9h14v-9" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
  keys: (
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export function LineIcon({
  name,
  size = 36,
  strokeWidth = 1.5,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flexShrink: 0 }}
      className={cn("text-brand-teal", className)}
    >
      {icons[name]}
    </svg>
  );
}
