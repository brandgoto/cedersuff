/*
 * GA4 + Meta Pixel IDs and conversion events.
 * Both tags only load once the placeholder IDs below are replaced, so no junk hits are sent before launch.
 */

// TODO: Replace G-XXXXXXXXXX with real GA4 Measurement ID from Google Analytics before launch
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
// TODO: Replace XXXXXXXXXXXXXXX with real Meta Pixel ID from Meta Business Manager before launch
export const META_PIXEL_ID = "XXXXXXXXXXXXXXX";

export const gaEnabled = !GA_MEASUREMENT_ID.includes("XXXX");
export const pixelEnabled = !META_PIXEL_ID.includes("XXXX");

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** A quote/contact form was submitted successfully. */
export function trackLead() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead");
  }
}

/** A tel: link or WhatsApp link was clicked. */
export function trackContact() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "contact");
  }
}
