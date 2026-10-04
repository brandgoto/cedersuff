import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { FadeUp } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { MaskedLines } from "@/components/motion/masked-lines";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

/** Closing CTA band. `teal` = white text on teal, `ink` = white on near-black with teal button. */
export function CtaBand({
  tone = "teal",
  title,
  body,
  primary,
  showPhone = false,
  note,
}: {
  tone?: "teal" | "ink";
  title: string;
  body?: string;
  primary: Action;
  showPhone?: boolean;
  note?: string;
}) {
  const ink = tone === "ink";
  return (
    <section className={cn("relative overflow-hidden", ink ? "bg-brand-ink" : "bg-brand-teal")}>
      {ink && (
        <div
          className="pointer-events-none absolute left-1/2 top-full h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/15 blur-3xl"
          aria-hidden
        />
      )}
      <FadeUp className="container relative flex flex-col items-center py-24 text-center lg:py-32">
        <MaskedLines lines={[title]} className="max-w-3xl text-balance font-heading text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white" />
        {body && <p className={cn("mt-5 max-w-xl text-lg", ink ? "text-white/65" : "text-white/80")}>{body}</p>}
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            size="lg"
            className={cn(
              "group h-14 rounded-full px-8 text-base",
              ink ? "bg-brand-teal text-brand-ink hover:bg-brand-teal/90" : "bg-white text-brand-navy hover:bg-white/90"
            )}
          >
            <Link href={primary.href}>
              {primary.label}
              {ink && <ArrowRight className="transition-transform motion-safe:group-hover:translate-x-1" />}
            </Link>
          </Button>
          {showPhone && (
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full border-2 border-white bg-transparent px-8 text-base text-white hover:bg-white/10"
            >
              <a href={siteConfig.phoneHref}>
                <Phone />
                Call (437) 332-0981
              </a>
            </Button>
          )}
        </div>
        {note && <p className="mt-8 text-sm text-white/50">{note}</p>}
      </FadeUp>
    </section>
  );
}
