import { NextResponse } from "next/server";
import { quoteSchema, serviceLabel } from "@/lib/quote";
import { emailConfig, getResend } from "@/lib/resend";

/*
 * Form handler for /get-a-quote, /contact and /flyer.
 * One job: email the enquiry to QUOTE_TO_EMAIL, then send the enquirer a plain-text auto-reply.
 */

const GENERIC_ERROR = "We couldn't send your request. Please call or WhatsApp us.";

// Single-line values only in subjects (no header-breaking newlines)
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const orFallback = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);

/** e.g. "Sun 4 Oct 2026, 2:34 PM EDT" in Toronto time */
function torontoTimestamp(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Toronto",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  return `${parts.weekday} ${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute} ${parts.dayPeriod} ${parts.timeZoneName}`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Honeypot tripped: pretend success so bots don't retry
  if (body && typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    // `fields` lets the forms highlight which inputs need fixing
    return NextResponse.json(
      { success: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  if (!emailConfig.to) {
    console.error("[quote] QUOTE_TO_EMAIL is not set");
    return NextResponse.json({ success: false, error: GENERIC_ERROR }, { status: 500 });
  }

  const q = parsed.data;
  const service = serviceLabel(q.service);

  const lines = [
    "New enquiry from the CEDERSUFF website",
    "",
    `Name: ${q.name}`,
    `Phone: ${orFallback(q.phone, "Not provided")}`,
    `Email: ${q.email}`,
    `Service: ${service}`,
    "",
    "Message:",
    orFallback(q.message, "No message provided"),
    "",
    `Move date: ${orFallback(q.date, "Not specified")}`,
    `Site address: ${orFallback(q.from, "Not specified")}`,
    // The /flyer form also collects a destination — only shown when given
    ...(q.to && q.to.trim() ? [`Moving to: ${q.to.trim()}`] : []),
    "",
    `Lead source: ${q.leadSource}`,
    `Submitted: ${torontoTimestamp()}`,
  ];

  try {
    const resend = getResend();

    // 1) Enquiry to the CEDERSUFF inbox — hitting Reply goes straight to the enquirer
    const notify = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: q.email,
      subject: oneLine(`New enquiry — ${service} — ${q.name}`),
      text: lines.join("\n"),
    });
    if (notify.error) {
      console.error("[quote] Enquiry email failed", notify.error);
      return NextResponse.json({ success: false, error: GENERIC_ERROR }, { status: 502 });
    }

    // 2) Auto-reply to the enquirer. Their enquiry is already delivered, so a failure here is logged only.
    const autoReply = await resend.emails.send({
      from: emailConfig.from,
      to: q.email,
      replyTo: emailConfig.to,
      subject: "We've received your enquiry — CEDERSUFF Movers",
      text: [
        `Hi ${oneLine(q.name)},`,
        "",
        "Thanks for reaching out to CEDERSUFF Movers. We've received your enquiry and will be in touch within a few hours during business hours (Mon–Sun, 7am–10pm).",
        "",
        "If you need to reach us sooner, you can:",
        "Call or text: (437) 332-0981",
        "WhatsApp: wa.me/14373320981",
        "",
        "— The CEDERSUFF Team",
      ].join("\n"),
    });
    if (autoReply.error) {
      console.error("[quote] Auto-reply failed", autoReply.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[quote] Unexpected error", err);
    return NextResponse.json({ success: false, error: GENERIC_ERROR }, { status: 500 });
  }
}
