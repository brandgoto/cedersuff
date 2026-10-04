export const siteConfig = {
  name: "CEDERSUFF Movers",
  legalName: "Cedersuff",
  tagline: "Moving & commercial cleaning you can count on.",
  description:
    "CEDERSUFF Movers provides residential and commercial moving and commercial cleaning services across Toronto and London, Ontario.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cedersuff.com",
  logo: "/cedersuff-logo.webp",
  phone: "+1 (437) 332-0981",
  phoneHref: "tel:+14373320981",
  email: "info@cedersuff.com",
  locations: ["Toronto, ON", "London, ON"],
  // Approved availability wording only — see CLAUDE.md
  hours: "Available Mon–Sun, 7am–10pm",
  hoursShort: "Available 7 days a week",
  whatsapp: {
    number: "14373320981",
    message: "Hi, I'd like to get a free quote from CEDERSUFF Movers",
  },
  navLinks: [
    { label: "Moving Services", href: "/services" },
    { label: "Commercial Cleaning", href: "/cleaning" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const whatsappHref = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
  siteConfig.whatsapp.message
)}`;

export const quoteHref = "/get-a-quote";

export const ctaLabels = {
  moving: "Get a Quote",
  // Commercial cleaning's primary CTA is always this, never "Get a Quote"
  cleaning: "Book a Free Site Visit",
} as const;

/** Pages whose hero is dark: the navbar renders white (logo filtered) until it turns to glass on scroll. */
export const darkHeroPaths: string[] = ["/", "/services", "/cleaning", "/about", "/contact"];

/** Pages whose top half is split light/dark: the navbar is glass from the start. */
export const solidNavPaths: string[] = [];

/** Landing pages with their own header (logo + back link): the global navbar is not rendered. */
export const hiddenNavPaths: string[] = ["/get-a-quote"];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export const socialLinks: { label: string; href: string }[] = [
  // TODO: add LinkedIn once the CEDERSUFF company page is created
  // { label: "LinkedIn", href: "https://www.linkedin.com/company/cedersuff" },
];

/**
 * Flat colour overlays for photos/video (no gradients). Brand navy #2D2B6B = rgb(45, 43, 107).
 * Swap here if a different overlay tint is wanted.
 */
export const overlay = {
  navy72: "rgba(45, 43, 107, 0.72)",
  navy82: "rgba(45, 43, 107, 0.82)",
  ink65: "rgba(10, 10, 15, 0.65)",
} as const;
