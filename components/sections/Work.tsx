import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Halo from "@/components/ui/Halo";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/lib/content/projects";

import WorkRow from "./WorkRow";

export default function Work() {
  return (
    // `overflow-x-clip` rather than `hidden`: it contains the halo without
    // creating a scroll container, which would break the sticky rail.
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-x-clip py-section"
    >
      <Halo className="top-1/3 -right-40 size-[30rem] opacity-30" />

      <div className="shell">
        <SectionHeading
          id="work-title"
          index="01"
          eyebrow="Selected work"
          title="Products and platforms, in production"
          lead="Not concepts or class projects — live systems with real users, real payments and real data pipelines behind them."
        />

        <div className="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-40">
          {featuredProjects.map((project, i) => (
            <WorkRow
              key={project.slug}
              project={project}
              index={i}
              priority={i === 0}
            />
          ))}
        </div>

        <Reveal className="mt-20">
          <Link
            href="/work"
            className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-fg"
          >
            <span aria-hidden className="h-px w-10 bg-accent" />
            All work
            <ArrowRight
              aria-hidden
              className="size-4 text-accent transition-transform duration-300 group-hover-fine:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
