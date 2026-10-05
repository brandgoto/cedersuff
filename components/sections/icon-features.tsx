import { LineIcon, type IconName } from "@/components/sections/line-icon";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type Feature = { icon: IconName; title: string; body: string };

/** Icon + title + copy in columns. Icons draw themselves in as they enter view. */
export function IconFeatures({
  features,
  tone = "light",
  size = "md",
  className,
}: {
  features: Feature[];
  tone?: "light" | "dark";
  size?: "md" | "xl";
  className?: string;
}) {
  const dark = tone === "dark";
  const cols = features.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <Stagger as="ul" className={cn("grid gap-x-8 gap-y-12", cols, className)}>
      {features.map((f) => (
        <StaggerItem as="li" key={f.title} className="group">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 transition-transform duration-300 motion-safe:group-hover:-translate-y-1">
            <LineIcon name={f.icon} size={36} />
          </div>
          <h3
            className={cn(
              "font-heading font-semibold leading-tight",
              size === "xl" ? "mt-8 text-4xl tracking-[-0.02em]" : "mt-6 text-xl",
              dark ? "text-white" : "text-brand-navy"
            )}
          >
            {f.title}
          </h3>
          <p
            className={cn(
              "mt-3 leading-relaxed",
              size === "xl" ? "text-xl" : "text-base",
              dark ? "text-white/70" : "text-foreground/65"
            )}
          >
            {f.body}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
