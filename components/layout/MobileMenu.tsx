"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { useScrollLock } from "@/hooks/useScrollLock";
import { EASE_EXPO } from "@/lib/motion";
import { nav, site } from "@/lib/site";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  // Escape to close + focus trap.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: EASE_EXPO }}
          className="grain fixed inset-0 z-[70] flex h-[100dvh] flex-col bg-bg lg:hidden"
        >
          <div
            aria-hidden
            className="halo halo-copper -top-24 -right-24 size-72 opacity-40"
          />

          <div className="shell flex min-h-16 items-center justify-between pt-[max(1rem,env(safe-area-inset-top))] pb-4">
            <span className="font-display text-lg font-semibold">
              {site.name.split(" ")[0]}
              <span className="text-accent-text">{site.name.split(" ")[1]}</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="relative z-10 grid size-11 place-items-center rounded-full border border-line"
            >
              <span aria-hidden className="relative block size-4">
                <span className="absolute top-1/2 left-0 h-px w-4 rotate-45 bg-fg" />
                <span className="absolute top-1/2 left-0 h-px w-4 -rotate-45 bg-fg" />
              </span>
            </button>
          </div>

          <nav className="shell relative z-10 flex flex-1 flex-col justify-center gap-2">
            {nav.map((item, i) => (
              <m.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.16 + i * 0.06,
                  duration: 0.6,
                  ease: EASE_EXPO,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="eyebrow text-accent-text">
                    0{i + 1}
                  </span>
                  <span className="text-h2 font-display transition-colors duration-300 group-hover-fine:text-accent-text">
                    {item.label}
                  </span>
                </Link>
              </m.div>
            ))}
          </nav>

          <div className="shell relative z-10 flex flex-col gap-3 border-t border-line py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-muted"
            >
              {site.email}
            </a>
            <div className="flex gap-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
