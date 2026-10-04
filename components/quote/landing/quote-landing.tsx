"use client";

import { useState } from "react";

import { QuoteFormCard } from "@/components/quote/landing/quote-form-card";
import { QuoteHero } from "@/components/quote/landing/quote-hero";
import { SuccessView } from "@/components/quote/landing/success-view";
import { TopBar } from "@/components/quote/landing/top-bar";

/**
 * Mobile-first ad / QR landing page.
 * <1024px: one column — dark hero band, then the form as a bottom sheet lifting over it.
 * ≥1024px: sticky dark column (45%) + form column (55%). Success replaces everything below the top bar.
 */
export function QuoteLanding() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <TopBar />
      <div className="pt-14">
        {sent ? (
          <SuccessView />
        ) : (
          <div className="bg-brand-ink lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:bg-brand-surface">
            <QuoteHero />
            <QuoteFormCard
              onSuccess={() => {
                setSent(true);
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
