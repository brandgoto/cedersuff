import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote/landing/quote-landing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/get-a-quote",
  title: "Get a Free Moving Quote | CEDERSUFF Movers",
  description:
    "Get a flat-rate moving or commercial cleaning quote from CEDERSUFF Movers. Takes 60 seconds. Serving Toronto, London ON, and surrounding areas.",
});

// Ad / QR landing page — mobile-first. Global navbar is hidden here (hiddenNavPaths); TopBar replaces it.
export default function GetAQuotePage() {
  return <QuoteLanding />;
}
