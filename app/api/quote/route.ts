import { NextResponse } from "next/server";
import { quoteSchema, serviceLabel } from "@/lib/quote";
import { emailConfig, getResend } from "@/lib/resend";

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Honeypot tripped: pretend success so bots don't retry
  if (body && typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  if (!emailConfig.to) {
    console.error("QUOTE_TO_EMAIL is not set");
    return NextResponse.json({ error: "Something went wrong. Please call or WhatsApp us." }, { status: 500 });
  }

  const q = parsed.data;
  const rows: [string, string | undefined][] = [
    ["Lead source", q.leadSource],
    ["Service", serviceLabel(q.service)],
    ["Name", q.name],
    ["Email", q.email],
    ["Phone", q.phone],
    ["Preferred date", q.date],
    ["From / site address", q.from],
    ["To", q.to],
    ["Details", q.message],
  ];

  const subject =
    q.leadSource === "contact-page"
      ? `New contact message — ${q.name}`
      : `${q.leadSource === "door-hanger" ? "[Door hanger] " : ""}New quote request — ${serviceLabel(q.service)} — ${q.name}`;
  const { error } = await getResend().emails.send({
    from: emailConfig.from,
    to: emailConfig.to,
    replyTo: q.email,
    subject,
    html: rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v!).replace(/\n/g, "<br>")}</p>`)
      .join(""),
  });

  if (error) {
    console.error("Resend error", error);
    return NextResponse.json({ error: "We couldn't send your request. Please call or WhatsApp us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
