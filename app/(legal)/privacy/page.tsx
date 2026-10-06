import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy | CEDERSUFF Movers",
  description:
    "How CEDERSUFF Movers collects, uses and protects your personal information.",
});

// TODO: have this reviewed by the business owner / a lawyer before launch. Template only.
const LAST_UPDATED = "October 1, 2026";

export default function PrivacyPage() {
  const { legalName, name, email, phone, phoneHref } = siteConfig;

  return (
    <>
      <header className="space-y-2">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

      <p>
        {legalName} (&ldquo;{name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
        explains how we collect, use, disclose and protect personal information in accordance with
        Canada&rsquo;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and
        applicable Ontario law.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Contact details</strong> — your name, email address and phone number when you request a quote,
          book a site visit, or contact us by phone, email or WhatsApp.
        </li>
        <li>
          <strong>Job details</strong> — addresses, move or service dates, property details, inventory and any
          notes you share so we can quote and complete your job.
        </li>
        <li>
          <strong>Payment information</strong> — when you pay for a service. Card payments are handled by our
          payment processor; we do not store full card numbers.
        </li>
        <li>
          <strong>Website data</strong> — basic technical information such as browser type, device and pages
          visited, collected through server logs and essential cookies.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To prepare quotes, schedule and complete moving and cleaning services.</li>
        <li>To communicate with you about your request, booking, invoice or any issue with your job.</li>
        <li>To process payments and keep business and tax records as required by law.</li>
        <li>To improve our services and website.</li>
        <li>
          To send you news and offers, only where you have given express consent. You can unsubscribe at any
          time, in line with Canada&rsquo;s Anti-Spam Legislation (CASL).
        </li>
      </ul>

      <h2>3. Consent</h2>
      <p>
        By submitting a form or contacting us, you consent to our use of your information for the purposes
        above. You may withdraw consent at any time, subject to legal or contractual restrictions, by contacting
        us. Withdrawing consent may mean we are unable to provide a requested service.
      </p>

      <h2>4. When we share information</h2>
      <p>We do not sell or rent your personal information. We share it only:</p>
      <ul>
        <li>
          With our team and the vetted moving professionals we work with, limited to what is needed to complete
          your job.
        </li>
        <li>
          With service providers acting on our behalf, such as website hosting, email delivery, scheduling and
          payment processing, who are required to protect your information.
        </li>
        <li>Where required or permitted by law.</li>
      </ul>
      <p>
        Some of these providers may store or process information outside Canada, in which case it may be
        subject to the laws of those jurisdictions.
      </p>

      <h2>5. Retention and security</h2>
      <p>
        We keep personal information only as long as needed for the purposes above or as required by law, then
        securely delete or anonymize it. We use reasonable physical, administrative and technical safeguards to
        protect your information, though no method of transmission or storage is completely secure.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Our website uses essential cookies needed for it to function. If we add analytics or advertising
        cookies in the future, we will update this policy and, where required, ask for your consent.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You may request access to the personal information we hold about you, ask us to correct it, or ask
        questions about how it is handled. We will respond within 30 days. If you are not satisfied with our
        response, you may contact the{" "}
        <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">
          Office of the Privacy Commissioner of Canada
        </a>
        .
      </p>

      <h2>8. Contact us</h2>
      <p>
        Questions or requests about your privacy can be sent to our Privacy Officer at{" "}
        <a href={`mailto:${email}`}>{email}</a> or <a href={phoneHref}>{phone}</a>.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it was
        last changed. See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </>
  );
}
