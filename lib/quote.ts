import { z } from "zod";

export const serviceOptions = [
  { value: "residential-move", label: "Residential Move", kind: "moving" },
  { value: "commercial-move", label: "Commercial / Office Move", kind: "moving" },
  { value: "commercial-cleaning", label: "Commercial Cleaning", kind: "cleaning" },
  { value: "moving-cleaning-bundle", label: "Moving + Cleaning Bundle", kind: "moving" },
  { value: "other", label: "Something else", kind: "other" },
] as const;

export type ServiceValue = (typeof serviceOptions)[number]["value"];

export const leadSources = ["website", "door-hanger", "contact-page"] as const;
export type LeadSource = (typeof leadSources)[number];

const serviceValues = serviceOptions.map((s) => s.value) as [ServiceValue, ...ServiceValue[]];
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const quoteSchema = z
  .object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.email("Please enter a valid email").max(200),
  phone: optionalText(40),
  service: z.enum(serviceValues, { error: "Please choose a service" }).optional().or(z.literal("")),
  date: optionalText(20),
  from: optionalText(200),
  to: optionalText(200),
  message: optionalText(5000),
  leadSource: z.enum(leadSources).catch("website"),
  // Honeypot: real visitors never fill this in
  website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((d, ctx) => {
    // Contact page: phone + service optional, message required. Quote forms: phone + service required.
    if (d.leadSource === "contact-page") {
      if (!d.message) ctx.addIssue({ code: "custom", path: ["message"], message: "Please enter a message" });
      return;
    }
    if (!d.phone || d.phone.length < 7)
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter a phone number" });
    if (!d.service) ctx.addIssue({ code: "custom", path: ["service"], message: "Please choose a service" });
  });

export type QuoteInput = z.infer<typeof quoteSchema>;

export const serviceLabel = (value?: string) =>
  value ? serviceOptions.find((s) => s.value === value)?.label ?? value : "Not specified";
