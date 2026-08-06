import GlassCard from "@/components/ui/GlassCard";
import Halo from "@/components/ui/Halo";
import {
  RevealChip,
  RevealChips,
  RevealGroup,
  RevealItem,
} from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { personalWork } from "@/lib/content";
import { pad } from "@/lib/utils";

export default function PersonalWork() {
  return (
    <section
      id="lab"
      aria-labelledby="lab-title"
      className="relative overflow-x-clip py-section"
    >
      <Halo tone="cool" className="top-1/3 -right-24 size-[28rem] opacity-25" />

      <div className="shell">
        <SectionHeading
          id="lab-title"
          index="05"
          eyebrow="Personal work"
          title="What I build when nobody is paying me to"
          lead="No brief, no deadline, no client to reassure, which is exactly why these are where I take the risks. Each one exists because something bothered me enough to build the answer."
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-3"
          stagger={0.12}
        >
          {personalWork.map((project, i) => (
            <RevealItem key={project.name} className="h-full">
              <GlassCard>
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="eyebrow text-accent-text">
                      {pad(i + 1)}
                    </span>
                    <span className="font-mono text-xs tracking-[0.12em] text-muted">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-7 text-h3">{project.name}</h3>
                  <p className="mt-2 text-sm text-accent-text">
                    {project.tagline}
                  </p>
                  <p className="mt-4 text-muted">{project.body}</p>

                  {/* The "why" is the point of this section — client work is
                      judged on delivery, personal work on the question it was
                      built to answer, so it gets its own emphasis. */}
                  <p className="mt-5 flex-1 border-l-2 border-accent/40 pl-4 text-sm text-muted italic">
                    {project.why}
                  </p>

                  <p className="mt-6 flex items-center gap-2.5 text-sm text-fg">
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {project.status}
                  </p>

                  <RevealChips className="mt-6 flex flex-wrap gap-2 pt-2">
                    {project.stack.map((item) => (
                      <RevealChip key={item}>
                        <Tag>{item}</Tag>
                      </RevealChip>
                    ))}
                  </RevealChips>
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
