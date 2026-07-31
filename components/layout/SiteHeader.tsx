"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useActiveSection } from "@/hooks/useActiveSection";
import Button from "@/components/ui/Button";
import { nav, sectionIds, site } from "@/lib/site";
import { cn } from "@/lib/utils";

import CommandPalette from "./CommandPalette";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const active = useActiveSection(sectionIds);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Measure the active link and slide the underline to it. The ResizeObserver
  // fires once on observe, so it doubles as the initial measurement.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const el = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      setIndicator(
        el
          ? { left: el.offsetLeft, width: el.offsetWidth }
          : { left: 0, width: 0 },
      );
    };

    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  const showIndicator = isHome && indicator.width > 0;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-line/80 bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex min-h-16 items-center justify-between gap-6 pt-[max(0px,env(safe-area-inset-top))] sm:min-h-20">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight sm:text-xl"
          >
            {site.name.split(" ")[0]}
            <span className="text-accent">{site.name.split(" ")[1]}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center gap-1">
              {nav.map((item) => {
                const id = item.href.split("#")[1];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-id={id}
                      aria-current={
                        isHome && active === id ? "location" : undefined
                      }
                      className={cn(
                        "inline-block rounded-pill px-4 py-2 text-sm transition-colors duration-300",
                        isHome && active === id
                          ? "text-fg"
                          : "text-muted hover-fine:text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              <m.span
                aria-hidden
                initial={false}
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: showIndicator ? 1 : 0,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-0.5 h-px bg-accent"
              />
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />

            <Button href="/#contact" className="hidden sm:inline-flex">
              Contact me
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            >
              <span aria-hidden className="flex flex-col gap-1.5">
                <span className="block h-px w-5 bg-fg" />
                <span className="block h-px w-5 bg-fg" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
