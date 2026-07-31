import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BrowserFrame from "@/components/ui/BrowserFrame";
import Halo from "@/components/ui/Halo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { getProject, projects } from "@/lib/content/projects";
import { pad } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-sm text-fg">{value}</dd>
    </div>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "")
    : `${project.slug}.com`;

  return (
    <article>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        aria-labelledby="case-title"
        className="grain relative overflow-hidden pt-40 pb-16 sm:pt-48"
      >
        <Halo className="-top-40 right-1/4 size-[30rem] opacity-40 sm:size-[44rem]" />

        <div className="shell relative z-10">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover-fine:text-fg"
            >
              <ArrowLeft aria-hidden className="size-4" />
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="eyebrow mt-8 flex items-center gap-3">
              <span className="text-accent">{pad(index + 1)}</span>
              <span aria-hidden className="h-px w-8 bg-line sm:w-12" />
              <span>{project.type}</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 id="case-title" className="mt-6 text-display">
              {project.name}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-h3 text-gradient-copper">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="prose-width mt-8 text-lead text-muted">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
              <MetaItem label="Role" value={project.role} />
              <MetaItem label="Year" value={project.year} />
              <MetaItem label="Type" value={project.type} />
              <MetaItem label="Status" value={project.status} />
            </dl>
          </Reveal>

          {project.liveUrl && (
            <Reveal delay={0.34}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-fg transition-colors hover-fine:text-accent-2"
              >
                Visit the live site
                <ArrowUpRight aria-hidden className="size-4 text-accent" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          )}
        </div>
      </header>

      {/* ── Cover ──────────────────────────────────────────────── */}
      <div className="shell">
        <Reveal>
          <BrowserFrame url={displayUrl}>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={1600}
              height={1000}
              priority
              sizes="(min-width: 1400px) 88rem, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>
        </Reveal>
      </div>

      {/* ── Stack ──────────────────────────────────────────────── */}
      <section aria-labelledby="stack-title" className="pt-section">
        <div className="shell">
          <Reveal>
            <h2 id="stack-title" className="eyebrow">
              Stack
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Problem ────────────────────────────────────────────── */}
      <section aria-labelledby="problem-title" className="py-section">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <h2 id="problem-title" className="text-h2">
              The problem
            </h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            {project.problem.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <p className="prose-width text-lead text-muted not-first:mt-6">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I built ───────────────────────────────────────── */}
      <section
        aria-labelledby="build-title"
        className="border-y border-line/70 bg-surface/20 py-section"
      >
        <div className="shell">
          <Reveal>
            <h2 id="build-title" className="text-h2">
              What I built
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:gap-16">
            {project.build.map((section, i) => (
              <Reveal key={section.title}>
                <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="eyebrow flex items-center gap-3">
                      <span className="text-accent">{pad(i + 1)}</span>
                      <span aria-hidden className="h-px w-6 bg-line" />
                    </p>
                    <h3 className="mt-4 text-h3">{section.title}</h3>
                  </div>
                  <div className="lg:col-span-7 lg:col-start-6">
                    {section.body.map((p) => (
                      <p key={p} className="prose-width text-muted not-first:mt-5">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering notes ──────────────────────────────────── */}
      <section aria-labelledby="tech-title" className="py-section">
        <div className="shell">
          <Reveal>
            <h2 id="tech-title" className="text-h2">
              Engineering decisions
            </h2>
          </Reveal>

          <RevealGroup
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16"
            stagger={0.08}
          >
            {project.technical.map((item) => (
              <RevealItem key={item.title}>
                <div className="glass h-full p-6 sm:p-8">
                  <h3 className="text-h3">{item.title}</h3>
                  <p className="mt-4 text-muted">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Outcome ────────────────────────────────────────────── */}
      <section
        aria-labelledby="outcome-title"
        className="grain relative overflow-hidden border-t border-line/70 py-section"
      >
        <Halo className="right-1/3 -bottom-40 size-[28rem] opacity-30 sm:size-[40rem]" />

        <div className="shell relative z-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <h2 id="outcome-title" className="text-h2">
              Outcome
            </h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            {project.outcome.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <p className="prose-width text-lead text-fg not-first:mt-6">
                  {p}
                </p>
              </Reveal>
            ))}

            {project.liveUrl && (
              <Reveal delay={0.14}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover-fine:text-fg"
                >
                  See it live
                  <ArrowUpRight aria-hidden className="size-4 text-accent" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── Next project ───────────────────────────────────────── */}
      <nav
        aria-label="Next case study"
        className="border-t border-line/70 py-16 sm:py-24"
      >
        <div className="shell">
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="eyebrow">Next project</p>
            <p className="mt-4 flex flex-wrap items-center gap-4 text-h2">
              {next.name}
              <ArrowRight
                aria-hidden
                className="size-7 text-accent transition-transform duration-500 ease-[var(--ease-expo)] group-hover-fine:translate-x-2"
              />
            </p>
            <p className="mt-3 text-muted">{next.tagline}</p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
