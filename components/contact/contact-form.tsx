"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions } from "@/lib/quote";
import { siteConfig } from "@/lib/site";

type FieldErrors = Partial<Record<string, string[]>>;

/** Posts to the same endpoint as the quote form (/api/quote) with leadSource "contact-page". */
export function ContactForm() {
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(json.fields ?? {});
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
      topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  const field = (name: string) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `contact-${name}-error` : undefined,
  });
  const FieldError = ({ name }: { name: string }) =>
    fieldErrors[name] ? (
      <p id={`contact-${name}-error`} className="text-sm text-destructive">
        {fieldErrors[name]![0]}
      </p>
    ) : null;

  return (
    <div ref={topRef} className="scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            role="status"
            className="flex flex-col items-start gap-4 rounded-3xl bg-white p-10 shadow-xl shadow-brand-navy/5"
          >
            <CheckCircle2 className="h-12 w-12 text-brand-teal" aria-hidden />
            <h3 className="font-heading text-2xl font-semibold text-brand-navy">Message sent — thank you.</h3>
            <p className="text-foreground/65">
              We typically respond within a few hours during business hours ({siteConfig.hours}).
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5 sm:grid-cols-2"
          >
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:col-span-2"
              >
                {error}
              </p>
            )}
            <input type="hidden" name="leadSource" value="contact-page" />
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-name">Full name</Label>
              <Input {...field("name")} required autoComplete="name" className="bg-white" />
              <FieldError name="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input {...field("email")} type="email" required autoComplete="email" className="bg-white" />
              <FieldError name="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">
                Phone <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input {...field("phone")} type="tel" autoComplete="tel" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-service">
                Service type <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <NativeSelect {...field("service")} defaultValue="" className="bg-white">
                <option value="">Choose a service</option>
                {serviceOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea {...field("message")} rows={4} required className="min-h-0 bg-white" />
              <FieldError name="message" />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="h-14 w-full rounded-full text-base"
                disabled={status === "submitting"}
              >
                {status === "submitting" && <Loader2 className="animate-spin" aria-hidden />}
                Send Message
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
