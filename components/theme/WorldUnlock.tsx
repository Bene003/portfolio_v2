"use client";

import { Sparkles, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect } from "react";

import { useExplorer } from "@/hooks/useExplorer";
import { acknowledgeUnlock } from "@/lib/explorer";
import { EASE_EXPO } from "@/lib/motion";
import { SECRET_THEME, setTheme, THEME_LABELS } from "@/lib/theme";

const AUTO_DISMISS_MS = 14000;

/** Congratulates the visitor the first time every public world has been seen,
 *  and offers a one-click trip to the world they just unlocked. */
export default function WorldUnlock() {
  const { celebrating } = useExplorer();

  useEffect(() => {
    if (!celebrating) return;
    const timer = window.setTimeout(acknowledgeUnlock, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [celebrating]);

  return (
    <AnimatePresence>
      {celebrating && (
        <m.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="glass fixed inset-x-[var(--spacing-gutter)] bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-[85] mx-auto flex max-w-md items-center gap-4 rounded-2xl p-4 shadow-lift sm:inset-x-auto sm:right-[var(--spacing-gutter)]"
        >
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full border border-accent/45 bg-accent/10 text-accent-text"
          >
            <Sparkles className="size-5" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="eyebrow text-[0.56rem] text-accent-text">
              New world unlocked
            </p>
            <p className="mt-1 text-sm text-fg">
              You visited every planet. {THEME_LABELS[SECRET_THEME]} is now open.
            </p>
            <button
              type="button"
              onClick={() => {
                acknowledgeUnlock();
                setTheme(SECRET_THEME, {
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  source: "command",
                });
              }}
              className="mt-2 min-h-11 font-mono text-[0.6875rem] tracking-[0.1em] text-accent-text underline-offset-4 transition-colors duration-300 hover-fine:underline"
            >
              Travel to {THEME_LABELS[SECRET_THEME]} →
            </button>
          </div>

          <button
            type="button"
            onClick={acknowledgeUnlock}
            className="grid size-11 shrink-0 place-items-center self-start rounded-full text-muted transition-colors duration-300 hover-fine:text-fg"
          >
            <X aria-hidden className="size-4" />
            <span className="sr-only">Dismiss</span>
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
