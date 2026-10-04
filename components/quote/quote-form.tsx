"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { type LeadSource, type ServiceValue, serviceOptions } from "@/lib/quote";
import { ctaLabels, siteConfig, whatsappHref } from "@/lib/site";

type FieldErrors = Partial<Record<string, string[]>>;
type Status = "idle" | "submitting" | "success" | "error";

/** Pre-selects the service from `?service=<value>` (e.g. /get-a-quote?service=commercial-cleaning). */
function ServicePrefill({ onService }: { onService: (v: ServiceValue) => void }) {
  const requested = useSearchParams().get("service");
  useEffect(() => {
    const match = serviceOptions.find((s) => s.value === requested);
    if (match) onService(match.value);
  }, [requested, onService]);
  return null;
}

export function QuoteForm({ leadSource }: { leadSource: LeadSource }) {
  const [service, setService] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const kind = serviceOptions.find((s) => s.value === service)?.kind;
  const isCleaning = kind === "cleaning";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const fields: FieldErrors = json.fields ?? {};
        setFieldErrors(fields);
        const first = Object.keys(fields)[0];
        if (first) requestAnimationFrame(() => (form.elements.namedItem(first) as HTMLElement | null)?.focus());
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const fieldProps = (name: string) => ({
    id: name,
    name,
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });
  const FieldError = ({ name }: { name: string }) =>
    fieldErrors[name] ? (
      <p id={`${name}-error`} className="text-sm text-destructive">
        {fieldErrors[name]![0]}
      </p>
    ) : null;

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-12 text-center"
          role="status"
        >
          <CheckCircle2 className="h-14 w-14 text-brand-teal" aria-hidden />
          <h2 className="text-2xl font-semibold text-brand-navy">Thanks — we&apos;ve got your request</h2>
          <p className="max-w-sm text-muted-foreground">
            Our team will be in touch shortly. {siteConfig.hours}. Need us sooner? Call{" "}
            <a href={siteConfig.phoneHref} className="font-medium text-brand-navy underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -12 }}
          onSubmit={onSubmit}
          noValidate
          className="grid gap-5 sm:grid-cols-2"
        >
          <Suspense fallback={null}>
            <ServicePrefill onService={setService} />
          </Suspense>
          <input type="hidden" name="leadSource" value={leadSource} />
          {/* Honeypot — hidden from people and assistive tech */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="service">What do you need?</Label>
            <NativeSelect
              {...fieldProps("service")}
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </NativeSelect>
            <FieldError name="service" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input {...fieldProps("name")} required autoComplete="name" />
            <FieldError name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input {...fieldProps("phone")} type="tel" required autoComplete="tel" />
            <FieldError name="phone" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input {...fieldProps("email")} type="email" required autoComplete="email" />
            <FieldError name="email" />
          </div>

          <div className={isCleaning ? "space-y-2 sm:col-span-2" : "space-y-2"}>
            <Label htmlFor="from">{isCleaning ? "Site address or city" : "Moving from"}</Label>
            <Input {...fieldProps("from")} placeholder={isCleaning ? "e.g. 100 King St W, Toronto" : "City or postal code"} />
          </div>
          {!isCleaning && (
            <div className="space-y-2">
              <Label htmlFor="to">Moving to</Label>
              <Input {...fieldProps("to")} placeholder="City or postal code" />
            </div>
          )}

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="date">
              {isCleaning ? "Preferred site visit date" : "Preferred move date"}{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input {...fieldProps("date")} type="date" />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="message">
              Tell us more <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              {...fieldProps("message")}
              placeholder={
                isCleaning
                  ? "Type of space, approximate square footage, how often you need cleaning…"
                  : "Home size, number of bedrooms, stairs or elevators, large items…"
              }
            />
          </div>

          {error && (
            <p className="text-sm text-destructive sm:col-span-2" role="alert">
              {error}
              {Object.keys(fieldErrors).length === 0 && (
                <>
                  {" "}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="underline">
                    Message us on WhatsApp
                  </a>
                </>
              )}
            </p>
          )}

          <div className="sm:col-span-2">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full rounded-full"
              disabled={status === "submitting"}
            >
              {status === "submitting" && <Loader2 className="animate-spin" aria-hidden />}
              {isCleaning ? ctaLabels.cleaning : "Get My Free Quote"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No obligation. We&apos;ll only use your details to respond to this request — see our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
