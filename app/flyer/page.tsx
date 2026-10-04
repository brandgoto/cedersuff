import type { Metadata } from "next";

import { QuotePage } from "@/components/quote/quote-page";

// Door-hanger landing page: duplicate of /get-a-quote, so keep it out of search results
export const metadata: Metadata = {
  title: "You Found Us — Get 10% Off Your First Move",
  robots: { index: false, follow: false },
};

export default function FlyerPage() {
  return (
    <QuotePage
      headline="You Found Us — Get 10% Off Your First Move"
      intro="Thanks for scanning our door hanger. Request your free quote below and we'll apply 10% off your first move with CEDERSUFF."
      leadSource="door-hanger"
    />
  );
}
