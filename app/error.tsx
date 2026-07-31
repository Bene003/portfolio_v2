"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="grain relative grid min-h-[70svh] place-items-center overflow-hidden py-section">
      <div className="shell relative z-10 text-center">
        <p className="eyebrow justify-center">Something broke</p>
        <h1 className="mt-6 text-h1">
          That did not go{" "}
          <span className="text-gradient-copper">as planned.</span>
        </h1>
        <p className="prose-width mx-auto mt-6 text-lead text-muted">
          An unexpected error occurred while rendering this page. Try again — if
          it keeps happening, it is on me, not on you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-6 text-sm font-medium text-bg shadow-glow transition-colors duration-300 hover-fine:bg-accent-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-pill border border-line px-6 text-sm text-fg transition-colors duration-300 hover-fine:border-accent/45 hover-fine:text-accent-2"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
