"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, MessageCircle, Phone } from "@/components/icons";

import { LearnMoreLinks } from "@/components/quote/landing/learn-more-links";
import { useEntrance } from "@/components/quote/landing/use-entrance";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions, type ServiceValue } from "@/lib/quote";
import { ctaLabels, siteConfig, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Kind = "moving" | "cleaning" | "bundle" | "other" | "none";
type FieldErrors = Partial<Record<string, string[]>>;

const kindOf = (v: string): Kind =>
  v === "residential-move" || v === "commercial-move"
    ? "moving"
    : v === "commercial-cleaning"
      ? "cleaning"
      : v === "moving-cleaning-bundle"
        ? "bundle"
        : v === "other"
          ? "other"
          : "none";

const submitLabel: Record<Kind, string> = {
  moving: "Get My Free Moving Quote",
  cleaning: ctaLabels.cleaning,
  bundle: "Get My Bundle Quote",
  other: "Submit My Request",
  none: "Submit My Request",
};

/** Pre-selects the service from `?service=` (homepage and cleaning CTAs link here with it). */
function ServicePrefill({ onService }: { onService: (v: ServiceValue) => void }) {
  const requested = useSearchParams().get("service");
  useEffect(() => {
    const match = serviceOptions.find((s) => s.value === requested);
    if (match) onService(match.value);
  }, [requested, onService]);
  return null;
}

/** Height-animated reveal for conditional fields. */
function Collapse({ show, children }: { show: boolean; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Required() {
  return (
    <span className="text-[#17735c]" aria-hidden>
      {" "}
      *
    </span>
  );
}

export function QuoteFormCard({ onSuccess }: { onSuccess: () => void }) {
  const controls = useEntrance("form");
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [service, setService] = useState("");
  const [today, setToday] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Local date (en-CA formats as YYYY-MM-DD); set after mount so server and client HTML match
  useEffect(() => setToday(new Date().toLocaleDateString("en-CA")), []);

  const kind = kindOf(service);
  const showSiteAddress = kind === "cleaning" || kind === "bundle";
  const showMoveDate = kind === "moving" || kind === "bundle";

  const scrollToTop = () =>
    sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        onSuccess();
        return;
      }
      const fields: FieldErrors = json.fields ?? {};
      setFieldErrors(fields);
      const first = Object.keys(fields)[0];
      if (first) {
        setError("Please check the highlighted fields.");
        requestAnimationFrame(() => (form.elements.namedItem(first) as HTMLElement | null)?.focus());
      } else {
        setError("server");
        scrollToTop();
      }
    } catch {
      setError("server");
      scrollToTop();
    } finally {
      setSubmitting(false);
    }
  }

  const field = (name: string) => ({
    id: `q-${name}`,
    name,
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `q-${name}-error` : undefined,
  });
  const FieldError = ({ name }: { name: string }) =>
    fieldErrors[name] ? (
      <p id={`q-${name}-error`} className="mt-1.5 text-sm text-red-600">
        {fieldErrors[name]![0]}
      </p>
    ) : null;

  const input = "mt-2 h-12 bg-white text-base";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="quote-form-heading"
      className="relative z-10 -mt-5 scroll-mt-14 rounded-t-2xl bg-brand-surface px-7 pb-14 pt-8 md:px-10 md:pb-16 lg:mt-0 lg:flex lg:min-h-[calc(100svh-3.5rem)] lg:items-center lg:justify-center lg:rounded-none lg:py-16"
    >
      <motion.div initial={{ opacity: 0 }} animate={controls} className="mx-auto w-full max-w-[600px] lg:max-w-[480px]">
        <h2 id="quote-form-heading" className="font-heading text-2xl font-semibold leading-tight tracking-[-0.02em] text-brand-navy md:text-[28px]">
          Tell us about your move
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">Takes about 60 seconds.</p>

        <form onSubmit={onSubmit} noValidate className="mt-7">
          {error && (
            <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error === "server" ? (
                <>
                  Something went wrong — please try again, or{" "}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    WhatsApp us directly
                  </a>
                  .
                </>
              ) : (
                error
              )}
            </div>
          )}

          <Suspense fallback={null}>
            <ServicePrefill onService={setService} />
          </Suspense>
          <input type="hidden" name="leadSource" value="website" />
          {/* Honeypot — hidden from people and assistive tech */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="q-website">Website</label>
            <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="q-name">
                Full Name
                <Required />
              </Label>
              <Input {...field("name")} required aria-required autoComplete="name" className={input} />
              <FieldError name="name" />
            </div>
            <div>
              <Label htmlFor="q-phone">
                Phone Number
                <Required />
              </Label>
              <Input {...field("phone")} type="tel" inputMode="tel" required aria-required autoComplete="tel" className={input} />
              <FieldError name="phone" />
            </div>
            <div>
              <Label htmlFor="q-email">
                Email Address
                <Required />
              </Label>
              <Input {...field("email")} type="email" inputMode="email" required aria-required autoComplete="email" className={input} />
              <FieldError name="email" />
            </div>
            <div>
              <Label htmlFor="q-service">
                Service Type
                <Required />
              </Label>
              <NativeSelect
                {...field("service")}
                required
                aria-required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={cn(input, !service && "text-muted-foreground")}
              >
                <option value="" disabled>
                  Choose a service
                </option>
                {serviceOptions.map((s) => (
                  <option key={s.value} value={s.value} className="text-foreground">
                    {s.label}
                  </option>
                ))}
              </NativeSelect>
              <FieldError name="service" />
            </div>
          </div>

          {/* Site address → API "from" field (emailed as "From / site address") */}
          <Collapse show={showSiteAddress}>
            <Label htmlFor="q-from">Site Address</Label>
            <Input {...field("from")} autoComplete="street-address" className={input} aria-describedby="q-from-note" />
            <p id="q-from-note" className="mt-1.5 text-[13px] text-muted-foreground">
              We&apos;ll visit your space for a free assessment
            </p>
          </Collapse>

          <Collapse show={showMoveDate}>
            <Label htmlFor="q-date">Preferred Move Date</Label>
            <Input {...field("date")} type="date" min={today} className={input} />
          </Collapse>

          <div className="pt-5">
            <Label htmlFor="q-message">
              Additional Details <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea {...field("message")} rows={3} className="mt-2 min-h-0 bg-white text-base" />
          </div>

          {/* bg-brand-ink + white = 19.8:1 */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-7 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand-ink font-heading text-base font-semibold text-white transition-colors hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {submitting ? "Sending…" : submitLabel[kind]}
          </button>
        </form>

        <div className="mt-3 space-y-5">
          <p className="text-center text-xs text-muted-foreground">Your details are only used to respond to your enquiry.</p>
          <hr className="border-gray-200" />
          <div>
            <p className="text-center text-[13px] text-muted-foreground">Prefer to talk?</p>
            <div className="mt-3 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-navy/25 bg-white px-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                Call (437) 332-0981
              </a>
              {/* Ink text on teal (10:1) — white on teal is ~2:1 */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-teal px-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-teal/90"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp Us
              </a>
            </div>
          </div>
          <LearnMoreLinks tone="light" className="pt-1 lg:hidden" />
        </div>
      </motion.div>
    </section>
  );
}
