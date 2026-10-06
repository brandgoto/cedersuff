import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Tiktok } from "@/components/icons";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { legalNav, quoteHref, siteConfig, socialLinks } from "@/lib/site";

const socialIcons = { Instagram, Facebook, TikTok: Tiktok, LinkedIn: Linkedin };

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-l-4 border-brand-teal bg-brand-navy text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-5">
          <Link href="/" className="-ml-2 inline-block" aria-label={`${siteConfig.name} home`}>
            {/* No white logo exists: brightness(0) invert(1) renders the navy artwork white on the navy footer */}
            <Image
              quality={90}
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={384}
              height={144}
              className="h-16 w-auto brightness-0 invert"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">{siteConfig.tagline}</p>
          <NewsletterForm />
          <ul className="flex gap-2" aria-label="Follow us">
            {socialLinks.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} — ${s.handle}`}
                    title={`${s.label} — ${s.handle}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-teal hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="md:justify-self-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[...siteConfig.navLinks, { label: "Get a Quote", href: quoteHref }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-end">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <a href={siteConfig.phoneHref} className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 text-brand-teal" aria-hidden />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand-teal" aria-hidden />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-brand-teal" aria-hidden />
              {siteConfig.hours}
            </li>
            {siteConfig.locations.map((loc) => (
              <li key={loc} className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-teal" aria-hidden />
                {loc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/* Extra right/bottom padding keeps links clear of the floating WhatsApp button */}
        <div className="container flex flex-col items-center justify-between gap-3 pb-24 pt-6 text-xs text-white/50 sm:flex-row sm:pb-6 sm:pr-24">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
