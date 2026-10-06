"use client";

import { useEffect } from "react";

import { trackContact } from "@/lib/analytics";

/**
 * Fires the Contact conversion for every tel: and WhatsApp link click, site-wide.
 * One delegated listener instead of an onClick on each link, so new links are covered automatically.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"], a[href*="wa.me/"]');
      if (link) trackContact();
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
