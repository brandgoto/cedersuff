import type { ReactNode, SVGProps } from "react";

/*
 * Self-contained inline SVG icons (replaces lucide-react).
 * Every icon: explicit width/height, viewBox 0 0 24 24, stroke = currentColor, round caps/joins,
 * display:block + flexShrink:0 so it never collapses or clips. Tailwind size classes (h-4 w-4 …)
 * still override the width/height attributes where used.
 */

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function icon(name: string, children: ReactNode, defaults: { size: number; strokeWidth: number }) {
  function Icon({ size = defaults.size, strokeWidth = defaults.strokeWidth, style, ...props }: IconProps) {
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
        style={{ display: "block", flexShrink: 0, ...style }}
        {...props}
      >
        {children}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

const SMALL = { size: 16, strokeWidth: 2 };
const MEDIUM = { size: 18, strokeWidth: 1.5 };
const UI = { size: 24, strokeWidth: 2 };

export const Check = icon("Check", <polyline points="20 6 9 17 4 12" />, SMALL);

export const ArrowRight = icon(
  "ArrowRight",
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>,
  SMALL
);

export const ChevronDown = icon("ChevronDown", <polyline points="6 9 12 15 18 9" />, SMALL);

export const Phone = icon(
  "Phone",
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  MEDIUM
);

export const Mail = icon(
  "Mail",
  <>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </>,
  MEDIUM
);

export const Clock = icon(
  "Clock",
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>,
  MEDIUM
);

export const MapPin = icon(
  "MapPin",
  <>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </>,
  MEDIUM
);

export const MessageCircle = icon(
  "MessageCircle",
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  MEDIUM
);

export const CalendarCheck = icon(
  "CalendarCheck",
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="9 16 11 18 15 14" />
  </>,
  MEDIUM
);

export const CheckCircle2 = icon(
  "CheckCircle2",
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </>,
  MEDIUM
);

export const Loader2 = icon("Loader2", <path d="M21 12a9 9 0 1 1-6.22-8.56" />, SMALL);

export const Menu = icon(
  "Menu",
  <>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>,
  UI
);

export const X = icon(
  "X",
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>,
  UI
);

export const Building2 = icon(
  "Building2",
  <>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
  </>,
  MEDIUM
);

export const ClipboardList = icon(
  "ClipboardList",
  <>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </>,
  MEDIUM
);

export const Receipt = icon(
  "Receipt",
  <>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <line x1="12" y1="6.5" x2="12" y2="17.5" />
  </>,
  MEDIUM
);

export const Repeat = icon(
  "Repeat",
  <>
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </>,
  MEDIUM
);
