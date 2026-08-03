"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import BrowserFrame from "@/components/ui/BrowserFrame";
import Tag from "@/components/ui/Tag";
import { fadeUp, viewportOnce } from "@/lib/motion";
import type { Project } from "@/types/content";
import { cn, pad } from "@/lib/utils";

export default function WorkRow({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const flipped = index % 2 === 1;
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "")
    : `${project.slug}.com`;

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Type", value: project.type },
    { label: "Status", value: project.status },
  ];

  return (
    <article
      ref={ref}
      id={`project-${project.slug}`}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      {/* visual */}
      <m.div
        style={{ y }}
        className={cn(
          "group relative lg:col-span-7",
          flipped && "lg:order-2 lg:col-start-6",
        )}
      >
        <Link
          href={`/work/${project.slug}`}
          aria-label={`Open the ${project.name} case study`}
          className="block"
        >
          <BrowserFrame url={displayUrl}>
            <div className="relative aspect-16/10 overflow-hidden">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover-fine:scale-[1.03]"
              />
              {/* diagonal light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-[150%] skew-x-[-18deg] bg-fg/10 blur-lg transition-transform duration-1000 ease-[var(--ease-expo)] group-hover-fine:translate-x-[420%] motion-reduce:hidden"
              />
            </div>
          </BrowserFrame>
        </Link>
      </m.div>

      {/* content */}
      <div className={cn("lg:col-span-5", flipped && "lg:order-1 lg:col-start-1")}>
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent-text">{pad(index + 1)}</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            <span>{project.type}</span>
          </p>

          <h3 className="mt-5 text-h2">
            <Link
              href={`/work/${project.slug}`}
              className="transition-colors duration-300 hover-fine:text-accent-text"
            >
              {project.name}
            </Link>
          </h3>

          <p className="mt-2 text-lead text-accent-text">{project.tagline}</p>
          <p className="mt-5 text-muted">{project.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:grid-cols-4 lg:grid-cols-2">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1.5 text-sm text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={`/work/${project.slug}`}
              className="group/link inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg"
            >
              Case study
              <ArrowRight
                aria-hidden
                className="size-4 text-accent transition-transform duration-300 group-hover-fine/link:translate-x-1"
              />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover-fine:text-fg"
              >
                Live site
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover-fine/link:-translate-y-0.5 group-hover-fine/link:translate-x-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </m.div>
      </div>
    </article>
  );
}
