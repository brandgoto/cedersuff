import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Secondary exits. Light backgrounds use a darker teal (#17735c, 5.5:1 on surface) — brand teal
 * text on off-white is only ~1.9:1.
 */
export function LearnMoreLinks({ tone, className }: { tone: "light" | "dark"; className?: string }) {
  const color = tone === "light" ? "text-[#17735c] hover:text-brand-navy" : "text-brand-teal/80 hover:text-white";
  return (
    <div className={cn("flex flex-col items-center gap-2 text-sm min-[420px]:flex-row min-[420px]:justify-center min-[420px]:gap-6", className)}>
      <Link href="/about" className={cn("transition-colors", color)}>
        Learn more about us →
      </Link>
      <Link href="/services" className={cn("transition-colors", color)}>
        See our services →
      </Link>
    </div>
  );
}
