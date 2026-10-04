"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { darkHeroPaths, hiddenNavPaths, quoteHref, siteConfig, solidNavPaths, whatsappHref } from "@/lib/site";

const SCROLL_THRESHOLD = 80;

// Drawer: in from the right, out to the left (iOS-style easing). Reduced motion: opacity only, instant close.
const DRAWER_EASE = [0.32, 0.72, 0, 1] as const;
const drawerMotion = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.35, ease: DRAWER_EASE } },
  exit: { x: "-100%", transition: { duration: 0.35, ease: DRAWER_EASE } },
};
const drawerReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};
const linkList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const linkItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: DRAWER_EASE } },
};
const linkItemReduced: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } };

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // While open: lock body scroll; close on Escape or browser back
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", close);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", close);
    };
  }, [open]);

  // Return focus to the hamburger when the drawer closes
  useEffect(() => {
    if (wasOpen.current && !open) menuButtonRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  if (hiddenNavPaths.includes(pathname)) return null;

  const glass = scrolled || solidNavPaths.includes(pathname);
  // Transparent navbar over a dark hero: render logo + links in white
  const onDark = !glass && darkHeroPaths.includes(pathname);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          glass
            ? "bg-white/70 shadow-[0_1px_0_0_rgba(45,43,107,0.08)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent"
        )}
      >
        <nav className="container flex h-20 items-center justify-between gap-6" aria-label="Main">
          <Link href="/" className="shrink-0" aria-label={`${siteConfig.name} home`}>
            {/* No white logo exists: brightness(0) invert(1) turns the navy artwork white on dark backgrounds */}
            <Image
              quality={90}
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={384}
              height={144}
              priority
              className={cn("h-12 w-auto transition-[filter] duration-300", onDark && "brightness-0 invert")}
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      onDark
                        ? "text-white/80 hover:text-white"
                        : "text-brand-navy/80 hover:text-brand-navy",
                      active && (onDark ? "text-white" : "text-brand-navy")
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild variant="accent" className="hidden rounded-full px-6 sm:inline-flex">
              <Link href={quoteHref}>Get a Quote</Link>
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
                onDark ? "text-white hover:bg-white/10" : "text-brand-navy hover:bg-brand-navy/5"
              )}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>

      </header>

      {/* Full-screen mobile drawer — outside <header> so the header's backdrop-filter can't contain it.
          z-60 sits above the floating WhatsApp button (z-50). */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            {...(reduceMotion ? drawerReduced : drawerMotion)}
            className="fixed inset-0 z-[60] flex flex-col bg-brand-ink text-white lg:hidden"
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label={`${siteConfig.name} home`}
              className="absolute left-6 top-6"
            >
              <Image
                quality={90}
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={384}
                height={144}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            >
              <X className="h-7 w-7" />
            </button>

            <nav aria-label="Mobile" className="flex flex-1 items-center justify-center px-6">
              <motion.ul variants={linkList} initial="hidden" animate="show" className="flex flex-col items-center gap-2">
                {siteConfig.navLinks.map((item) => (
                  <motion.li key={item.href} variants={reduceMotion ? linkItemReduced : linkItem}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                      className="block py-1 text-center font-heading text-[36px] font-semibold leading-tight tracking-[-0.02em] text-white transition-colors duration-200 hover:text-brand-teal focus-visible:text-brand-teal focus-visible:outline-none active:text-brand-teal aria-[current=page]:text-brand-teal"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* max() keeps 24px on devices that report a 0 safe-area inset */}
            <div
              className="flex flex-col items-center gap-5 px-6 pt-4"
              style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}
            >
              <Link
                href={quoteHref}
                onClick={() => setOpen(false)}
                className="inline-flex h-[52px] w-full max-w-[280px] items-center justify-center rounded-full bg-brand-teal font-heading text-base font-semibold text-brand-navy transition-colors hover:bg-brand-teal/90"
              >
                Get a Quote
              </Link>
              <div className="flex items-center gap-6 text-sm text-white/70">
                <a href={siteConfig.phoneHref} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4" aria-hidden />
                  (437) 332-0981
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
