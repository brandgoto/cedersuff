import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

/** Replaces the global navbar on this page (see hiddenNavPaths). */
export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/5 bg-brand-ink px-5 md:px-10 lg:px-[max(2.5rem,calc((100vw_-_1280px)/2_+_2rem))]">
      <Link href="/" aria-label={`${siteConfig.name} home`} className="flex items-center">
        {/* No white logo exists: brightness(0) invert(1) renders the navy artwork white */}
        <Image
          quality={90}
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={384}
          height={144}
          priority
          className="-ml-1 h-7 w-auto brightness-0 invert"
        />
      </Link>
      <Link href="/" className="text-xs font-medium text-brand-teal transition-colors hover:text-white sm:text-sm">
        ← Back to site
      </Link>
    </header>
  );
}
