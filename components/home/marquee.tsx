import { cn } from "@/lib/utils";

/** Pure-CSS marquee: two identical copies translate -50% on loop. Paused for reduced motion. */
export function Marquee({
  text,
  reverse = false,
  duration = "30s",
  className,
  itemClassName,
}: {
  text: string;
  reverse?: boolean;
  duration?: string;
  className?: string;
  itemClassName?: string;
}) {
  // Repeat so each copy is wider than any viewport → seamless loop
  const copy = text.repeat(3);
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <p className="sr-only">{text.replaceAll(" · ", ", ").replace(/,\s*$/, "")}</p>
      <div
        aria-hidden
        className={cn(
          "flex w-max shrink-0 motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[0, 1].map((i) => (
          <span key={i} className={cn("shrink-0 whitespace-pre", itemClassName)}>
            {copy}
          </span>
        ))}
      </div>
    </div>
  );
}
