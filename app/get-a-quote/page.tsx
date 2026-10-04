import type { Metadata } from "next";

import { QuoteLanding } from "@/components/quote/landing/quote-landing";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free, no-obligation quote for moving or commercial cleaning in Toronto and London, Ontario.",
};

// Ad / QR landing page — mobile-first. Global navbar is hidden here (hiddenNavPaths); TopBar replaces it.
export default function GetAQuotePage() {
  return <QuoteLanding />;
}
