import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Halo from "@/components/ui/Halo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { projects } from "@/lib/content/projects";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Three products shipped end to end — a beauty e-commerce storefront, a B2B real-estate intelligence SaaS and a content agency site with a real-time 3D hero.",
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
              Three products, shipped and{" "}
              <span className="text-gradient-copper">running in production</span>
              .
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="prose-width mt-6 text-lead text-muted">
              Not concepts or dribbble shots — real codebases with real users,
              real payments and real uptime. Each case study covers the problem,
              what I built and the engineering decisions behind it.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Case studies" className="pb-section">
        <div className="shell">
          <RevealGroup
            className="grid gap-8 lg:grid-cols-3 lg:gap-10"
            stagger={0.1}
          >
            {projects.map((project, i) => (
              <RevealItem key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group glass flex h-full flex-col overflow-hidden p-0 transition-[transform,border-color] duration-500 hover-fine:-translate-y-1.5 hover-fine:border-accent/30"
                >
                  <div className="relative aspect-16/10 overflow-hidden border-b border-line/70 bg-surface-2/50">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 90vw, 100vw"
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
                      <span>{project.type}</span>
                    </p>

                    <h2 className="mt-5 text-h3">{project.name}</h2>
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
    </>
  );
}
