"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [note, setNote] = useState<string | null>(null);

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO(Phase B): wire to Brevo (contact list + double opt-in). Not connected yet —
        // submissions are intentionally discarded until then.
        setNote("Newsletter sign-ups open soon. Thanks for your interest!");
      }}
    >
      <label htmlFor="newsletter-email" className="text-sm font-medium text-white">
        Moving tips &amp; offers
      </label>
      <div className="flex max-w-sm overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15 focus-within:ring-brand-teal">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="m-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-teal text-brand-ink transition-colors hover:bg-brand-teal/90"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="min-h-[1rem] text-xs text-white/60" aria-live="polite">
        {note}
      </p>
    </form>
  );
}
