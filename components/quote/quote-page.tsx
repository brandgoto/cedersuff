import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { QuoteForm } from "@/components/quote/quote-form";
import type { LeadSource } from "@/lib/quote";
import { siteConfig, whatsappHref } from "@/lib/site";

/** Shared view for /get-a-quote and /flyer — keep them identical apart from props. */
export function QuotePage({
  headline,
  intro,
  leadSource,
}: {
  headline: string;
  intro: string;
  leadSource: LeadSource;
}) {
  return (
    <section className="bg-brand-surface pb-24 pt-32 sm:pt-36">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Free quote</p>
            <h1 className="text-4xl font-semibold text-brand-navy sm:text-5xl">{headline}</h1>
            <p className="max-w-md text-lg text-muted-foreground">{intro}</p>
          </div>

          <ul className="space-y-4 text-brand-navy">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
              <span>{siteConfig.hours}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
              <span>Serving {siteConfig.locations.join(" & ")} and surrounding areas</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
              <a href={siteConfig.phoneHref} className="hover:underline">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Prefer WhatsApp? Message us
              </a>
            </li>
          </ul>
        </div>

        <div className="relative rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-10">
          <QuoteForm leadSource={leadSource} />
        </div>
      </div>
    </section>
  );
}
