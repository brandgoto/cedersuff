import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MessageCircle, Phone } from "@/components/icons";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { siteConfig, whatsappHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact CEDERSUFF Movers | Get a Free Quote",
  description:
    "Get in touch with CEDERSUFF Movers in Toronto and London ON. Call, WhatsApp, or fill in the form. Available Mon–Sun, 7am–10pm.",
});

const contacts = [
  { Icon: Phone, label: "Phone", value: "(437) 332-0981", href: siteConfig.phoneHref },
  { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { Icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: whatsappHref, external: true },
  { Icon: Clock, label: "Hours", value: "Mon–Sun, 7am–10pm" },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Info — navy */}
        <section className="relative overflow-hidden bg-brand-navy px-5 py-16 text-white sm:px-10 lg:py-24 lg:pl-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))] lg:pr-16">
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-brand-teal/15 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <FadeUp>
              {/* No white logo exists: brightness(0) invert(1) renders the navy artwork white */}
              <Image
                quality={90}
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={384}
                height={144}
                loading="lazy"
                className="-ml-2 h-16 w-auto brightness-0 invert"
              />
              <h2 className="mt-10 font-heading text-[36px] font-semibold leading-tight tracking-[-0.02em]">
                Contact Details
              </h2>
            </FadeUp>
            <Stagger as="ul" className="mt-10 space-y-6">
              {contacts.map(({ Icon, label, value, href, external }) => (
                <StaggerItem as="li" key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-teal">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 block text-lg font-medium text-white underline-offset-4 hover:text-brand-teal hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg font-medium">{value}</p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <FadeUp className="mt-12 border-t border-white/10 pt-6 text-white/60">
              Serving Toronto, London ON &amp; surrounding areas
            </FadeUp>
          </div>
        </section>

        {/* Form — surface */}
        <section className="bg-brand-surface px-5 py-16 sm:px-10 lg:py-24 lg:pl-16 lg:pr-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))]">
          <div className="max-w-2xl">
            <FadeUp>
              <h2 className="font-heading text-[32px] font-semibold leading-tight tracking-[-0.02em] text-brand-navy">
                Send Us a Message
              </h2>
              <p className="mt-3 text-foreground/65">We typically respond within a few hours during business hours.</p>
            </FadeUp>
            <FadeUp delay={0.1} className="mt-10">
              <ContactForm />
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
}
