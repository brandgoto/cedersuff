import { SITE_URL } from "@/lib/seo";
import { siteConfig, socialLinks } from "@/lib/site";

const movingCompany = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: siteConfig.name,
  url: SITE_URL,
  telephone: "+14373320981",
  email: siteConfig.email,
  logo: `${SITE_URL}/cedersuff-logo.webp`,
  image: `${SITE_URL}/collaterals/cedersuff.png`,
  description:
    "Residential and commercial moving services and commercial cleaning contracts across Toronto, London ON, and surrounding areas.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    "Toronto", "London ON", "Etobicoke", "North York",
    "Scarborough", "Mississauga", "Brampton", "Vaughan",
    "Hamilton", "Oakville", "Burlington", "Ajax",
    "Pickering", "Whitby", "Oshawa", "Markham",
    "Richmond Hill", "Newmarket", "Barrie",
    "Kitchener", "Waterloo", "Guelph",
  ],
  openingHours: "Mo-Su 07:00-22:00",
  priceRange: "$$",
  // Lets Google tie the business to its social profiles
  sameAs: socialLinks.map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moving & Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Moving",
          description:
            "Local residential moving from a single bedroom to a full family home. Flat-rate pricing, vetted team.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Moving",
          description: "Office and commercial relocations with weekend and after-hours availability.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Same-Day Emergency Moving",
          description: "Emergency same-day moving service across Toronto and London ON.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Cleaning",
          description: "Monthly commercial cleaning contracts for offices, churches, warehouses, and retail spaces.",
        },
      },
    ],
  },
};

/** MovingCompany (LocalBusiness) JSON-LD, rendered on every page from the root layout. */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompany).replace(/</g, "\\u003c") }}
    />
  );
}
