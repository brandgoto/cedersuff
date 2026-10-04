export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="bg-brand-surface pb-24 pt-32 sm:pt-36">
      <div className="container max-w-3xl space-y-6 text-[15px] leading-relaxed text-foreground/80 [&_a]:text-brand-navy [&_a]:underline [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:text-brand-navy [&_h2]:pt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand-navy [&_li]:mt-1.5 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
