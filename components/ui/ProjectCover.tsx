import Image from "next/image";

import type { Project } from "@/types/content";

/** The visual for a project — its screenshot, or a drawn stand-in when there
 *  is not one yet.
 *
 *  A generic mockup would read as a screenshot at a glance and quietly claim
 *  something that is not true, so the fallback is deliberately typographic:
 *  it shows the project's name and sector over its own accent, and never
 *  pretends to be an interface. Every project therefore keeps the same frame
 *  and aspect ratio whether or not it has been photographed. */
export default function ProjectCover({
  project,
  priority = false,
  sizes,
  className,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <div
      // The accent only lives on this element, so it tints the wash and the
      // rule without leaking into the surrounding page.
      style={{ "--cover-accent": project.accent } as React.CSSProperties}
      className="absolute inset-0 flex flex-col justify-end overflow-hidden bg-surface-2/60 p-6 sm:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -right-1/4 size-[120%] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--cover-accent), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--cover-accent), transparent)",
        }}
      />

      <p className="relative font-display text-2xl leading-tight font-semibold text-fg sm:text-3xl">
        {project.name}
      </p>
      <p
        className="relative mt-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase"
        style={{ color: "var(--cover-accent)" }}
      >
        {project.sector}
      </p>
    </div>
  );
}
