import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/*
 * Per-page SEO: title, description, canonical, Open Graph and Twitter card.
 * OG images are 1200×630 JPG crops of the collaterals, generated into /public/og.
 */

export const SITE_URL = "https://cedersuff.com";

export const ogImages = {
  truck: "/og/og-truck.jpg",
  team: "/og/og-team.jpg",
  cleaning: "/og/og-cleaning.jpg",
} as const;

const OG_ALT = "CEDERSUFF Movers — Toronto Moving & Commercial Cleaning";

export function pageMetadata({
  path,
  title,
  description,
  image = ogImages.truck,
}: {
  /** Leading slash, e.g. "/services" ("/" for the homepage) */
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    // `absolute` skips the root layout's "%s | CEDERSUFF Movers" template — these titles already carry the brand
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: OG_ALT }],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
