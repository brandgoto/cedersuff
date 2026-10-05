import { FadeUp } from "@/components/motion/reveal";
import { IconFeatures, type Feature } from "@/components/sections/icon-features";
import { MaskedLines } from "@/components/motion/masked-lines";

const features: Feature[] = [
  {
    icon: "tag",
    title: "Flat-Rate Pricing",
    body: "Your price is confirmed before we book. It only changes if the scope of your job changes.",
  },
  {
    icon: "shieldCheck",
    title: "Vetted Moving Teams",
    body: "Every team we send is experienced, insured, and held to our service standard. Your belongings are in good hands.",
  },
  {
    icon: "rings",
    title: "One Team, Two Services",
    body: "Book a move and add professional cleaning in the same call. One point of contact, one invoice, less stress.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-brand-surface py-24 lg:py-36">
      <div className="container">
        <FadeUp>
          <MaskedLines lines={["Why Choose CEDERSUFF?"]} className="text-center font-heading text-[clamp(2.5rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-brand-navy" />
        </FadeUp>
        <IconFeatures features={features} className="mx-auto mt-16 max-w-6xl lg:mt-20 lg:gap-x-16" />
      </div>
    </section>
  );
}
