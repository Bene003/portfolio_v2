"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";

import { site } from "@/lib/site";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={copy}
        className="glass glass-hover group inline-flex min-h-11 max-w-full items-center gap-3 rounded-pill px-5 py-3 transition-colors duration-300 hover-fine:border-accent/35"
      >
        <span className="truncate font-mono text-sm text-fg">{site.email}</span>
        <span className="relative size-4 shrink-0 text-muted transition-colors group-hover-fine:text-accent">
          <AnimatePresence initial={false} mode="wait">
            {copied ? (
              <m.span
                key="check"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 text-accent"
              >
                <Check className="size-4" aria-hidden />
              </m.span>
            ) : (
              <m.span
                key="copy"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0"
              >
                <Copy className="size-4" aria-hidden />
              </m.span>
            )}
          </AnimatePresence>
        </span>
        <span className="sr-only">Copy email address</span>
      </button>

      <p aria-live="polite" className="eyebrow h-4 text-accent-text">
        {copied ? "Copied to clipboard" : ""}
      </p>
    </div>
  );
}
