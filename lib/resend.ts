import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  client ??= new Resend(apiKey);
  return client;
}

export const emailConfig = {
  from: process.env.RESEND_FROM_EMAIL ?? "CEDERSUFF Movers <onboarding@resend.dev>",
  to: process.env.QUOTE_TO_EMAIL ?? "",
};
