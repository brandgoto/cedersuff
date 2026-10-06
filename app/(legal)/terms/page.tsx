import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms of Service | CEDERSUFF Movers",
  description:
    "Terms that apply to CEDERSUFF Movers moving and commercial cleaning services and this website.",
});

// TODO: have this reviewed by the business owner / a lawyer before launch. Template only.
const LAST_UPDATED = "October 1, 2026";

export default function TermsPage() {
  const { legalName, name, email, phone, phoneHref } = siteConfig;

  return (
    <>
      <header className="space-y-2">
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

      <p>
        These terms apply to the moving and commercial cleaning services provided by {legalName} (&ldquo;{name}
        &rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and to your use of this website. By booking a service or using
        this website, you agree to these terms. Your booking confirmation may include additional terms specific
        to your job; if they conflict with these terms, the booking confirmation applies.
      </p>

      <h2>1. Quotes and estimates</h2>
      <ul>
        <li>
          Quotes are based on the information you provide. If the actual scope differs — for example additional
          items, access difficulties, or extra rooms or areas to clean — the price may change. We will discuss any
          change with you before proceeding where possible.
        </li>
        <li>Quotes are valid for 30 days unless stated otherwise.</li>
        <li>Prices are in Canadian dollars and exclude applicable taxes (HST) unless stated otherwise.</li>
      </ul>

      <h2>2. Bookings, deposits and cancellations</h2>
      <ul>
        <li>
          A <strong>50% deposit</strong> is required to confirm a booking. Your date is reserved once the deposit
          is received and we send you a written confirmation.
        </li>
        <li>
          To receive a <strong>full refund of your deposit</strong>, cancel with at least{" "}
          <strong>48 hours&rsquo; notice</strong> before your scheduled start time. Cancellations with less than 48
          hours&rsquo; notice are not eligible for a deposit refund.
        </li>
        <li>
          To reschedule, contact us as early as possible. We will do our best to move your booking to another
          available date.
        </li>
      </ul>

      <h2>3. Your responsibilities</h2>
      <ul>
        <li>Provide accurate information about the job, addresses, access, parking and elevator bookings.</li>
        <li>Ensure someone authorized is present at the start and end of the job, or as agreed.</li>
        <li>
          Keep cash, jewellery, important documents, medication and other valuables with you. We are not
          responsible for these items unless agreed in writing.
        </li>
        <li>
          Do not ask us to move hazardous, flammable or illegal items, including propane tanks, paint, chemicals
          and firearms.
        </li>
        <li>Make sure items you pack yourself are packed securely.</li>
      </ul>

      <h2>4. Care of your belongings and premises</h2>
      <p>
        Our team takes reasonable care with your belongings and premises. If something is damaged or missing,
        please note it on the job sheet and notify us in writing as soon as possible, with photos where you can.
        Claims are handled under the terms in your booking confirmation. We are not responsible for pre-existing
        damage, normal wear and tear, the contents of boxes we did not pack, or damage caused by the condition of
        an item.
      </p>

      <h2>5. Payment</h2>
      <p>
        The deposit is credited toward your final price. The remaining balance is due as set out in your booking
        confirmation or invoice. We may charge for additional time or services you request on the day.
      </p>

      <h2>6. Promotions and discounts</h2>
      <ul>
        <li>
          <strong>First-move offer:</strong> new clients receive 10% off their first move, including clients who
          book through our door hanger. One discount per client.
        </li>
        <li>
          Promotional offers apply only as described in the offer, cannot be exchanged for cash, and cannot be
          combined with other offers unless stated.
        </li>
      </ul>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent permitted by law, our total liability for any claim relating to a service is limited to the
        amount you paid for that service, and we are not liable for indirect or consequential losses such as lost
        income or delays caused by circumstances outside our control (including weather, traffic and building
        access). Nothing in these terms limits any rights you have under Ontario&rsquo;s{" "}
        <em>Consumer Protection Act, 2002</em>.
      </p>

      <h2>8. Use of this website</h2>
      <p>
        Website content is provided for general information and may change without notice. You may not misuse
        the website or attempt to interfere with its operation. Our handling of personal information is described
        in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that
        apply there.
      </p>

      <h2>10. Contact us</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${email}`}>{email}</a> or call{" "}
        <a href={phoneHref}>{phone}</a>.
      </p>
    </>
  );
}
