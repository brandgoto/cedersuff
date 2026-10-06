# CEDERSUFF Movers — website

Next.js 14 (App Router, TS), Tailwind 3 + shadcn/ui (manual setup, `components/ui`), Framer Motion, Resend, next-sitemap.
Business details, nav, hours and CTA labels live in `lib/site.ts` — use them instead of hard-coding.

## Business constraints (apply to ALL copy, pages and components)
- Never say "crew" (in any phrasing), "our drivers", "our staff". Use "our team" or "vetted moving professionals we work with".
- Never mention the subcontracting model or markup. Every job is presented as a CEDERSUFF job.
- "24/7" must never appear. Use "Available Mon–Sun, 7am–10pm" or "Available 7 days a week" (`siteConfig.hours`).
- Social links (Instagram, Facebook, TikTok, LinkedIn) live in `socialLinks` in `lib/site.ts`.
- Footer newsletter input is not wired yet — Phase B: Brevo integration (TODO in `components/layout/newsletter-form.tsx`).
- Commercial cleaning primary CTA is "Book a Free Site Visit" (`ctaLabels.cleaning`), not "Get a Quote".
- `/get-a-quote` service dropdown must include "Moving + Cleaning Bundle".
- `/flyer` mirrors `/get-a-quote` with hidden lead source `door-hanger` and headline "You Found Us — Get 10% Off Your First Move".

`npm run lint:copy` (also runs before every build) fails on banned phrases.
