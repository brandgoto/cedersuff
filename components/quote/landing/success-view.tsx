"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { SuccessCheck } from "@/components/quote/landing/icons";
import { whatsappHref } from "@/lib/site";

export function SuccessView() {
  const reduce = useReducedMotion();
  return (
    <section
      role="status"
      className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center bg-brand-surface p-10"
    >
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-md flex-col items-center text-center"
      >
        <SuccessCheck className="h-16 w-16" />
        <h1 className="mt-6 font-heading text-[26px] font-semibold leading-tight text-brand-navy">
          We&apos;ll be in touch soon.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Thanks for reaching out. We&apos;ll review your details and get back to you within a few hours during
          business hours.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-ink px-7 font-semibold text-white transition-colors hover:bg-brand-navy"
          >
            Back to Homepage
          </Link>
          {/* Teal border; text in the darker teal for contrast on the light surface */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-brand-teal px-7 font-semibold text-[#17735c] transition-colors hover:bg-brand-teal/10"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp us now
          </a>
        </div>
      </motion.div>
    </section>
  );
}
