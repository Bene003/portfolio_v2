import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import SecretSpot from "@/components/easter/SecretSpot";
import Halo from "@/components/ui/Halo";
import ProjectCover from "@/components/ui/ProjectCover";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { caseStudies, otherWork } from "@/lib/content/projects";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on products shipped end to end: e-commerce, B2B SaaS, booking, ticketing and patient journeys, plus the client platforms behind them.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <section
        aria-labelledby="work-index-title"
        className="grain relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-24"
      >
        <Halo className="-top-32 left-1/4 size-[30rem] opacity-40 sm:size-[42rem]" />

        <div className="shell relative z-10">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent-text">All</span>
              <span aria-hidden className="h-px w-8 bg-line sm:w-12" />
              <span>Selected work</span>
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 id="work-index-title" className="mt-6 max-w-4xl text-h1">
              <SecretSpot spot="title">
                Products, platforms and{" "}
                <span className="text-gradient-copper">
                  the businesses behind them
                </span>
                .
              </SecretSpot>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="prose-width mt-6 text-lead text-muted">
              Not concepts or dribbble shots. Real codebases with real users,
              real payments and real uptime. The case studies below cover the
              problem, what I built and the engineering decisions behind it; the
              rest covers what each platform actually removed from
              someone&apos;s day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Case studies ───────────────────────────────────────── */}
      <section aria-labelledby="case-studies-title" className="pb-section">
        <div className="shell">
          <Reveal>
            <h2 id="case-studies-title" className="eyebrow">
              Case studies
            </h2>
          </Reveal>

          <RevealGroup
            className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
            stagger={0.08}
          >
            {caseStudies.map((project, i) => (
              <RevealItem key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group glass flex h-full flex-col overflow-hidden p-0 transition-[transform,border-color] duration-500 hover-fine:-translate-y-1.5 hover-fine:border-accent/30"
                >
                  <div className="relative aspect-16/10 overflow-hidden border-b border-line/70 bg-surface-2/50">
                    <ProjectCover
                      project={project}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover-fine:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="eyebrow flex items-center gap-3">
                      <span className="text-accent-text">{pad(i + 1)}</span>
                      <span aria-hidden className="h-px w-6 bg-line" />
                      <span>{project.sector}</span>
                    </p>

                    <h3 className="mt-5 text-h3">{project.name}</h3>
                    <p className="mt-2 text-sm text-accent-text">
                      {project.tagline}
                    </p>
                    <p className="mt-4 flex-1 text-sm text-muted">
                      {project.summary}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg">
                      Read the case study
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 text-accent transition-transform duration-300 group-hover-fine:-translate-y-0.5 group-hover-fine:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Also shipped ───────────────────────────────────────── */}
      <section
        aria-labelledby="other-work-title"
        className="border-t border-line/70 py-section"
      >
        <div className="shell">
          <Reveal>
            <h2 id="other-work-title" className="eyebrow">
              Also shipped
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="prose-width mt-4 text-muted">
              Products of my own and platforms built for a client&apos;s
              operation: the storefront, the booking, the automation and the
              audience work that replaced whatever was being handled by hand.
            </p>
          </Reveal>

          <RevealGroup
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {otherWork.map((project) => (
              <RevealItem key={project.slug}>
                {/* Not a link: these have no page of their own, and a card
                    that looks clickable but is not is worse than a plain one. */}
                <article className="glass flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-16/10 overflow-hidden border-b border-line/70 bg-surface-2/50">
                    <ProjectCover
                      project={project}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="eyebrow flex items-center gap-3">
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full"
                        style={{ background: project.accent }}
                      />
                      <span>{project.sector}</span>
                    </p>

                    <h3 className="mt-4 text-h3">{project.name}</h3>
                    <p className="mt-2 text-sm text-accent-text">
                      {project.tagline}
                    </p>
                    <p className="mt-4 text-sm text-muted">{project.summary}</p>

                    {project.scope && (
                      <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-line pt-5">
                        {project.scope.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-sm text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
