import { Code2, PenTool, Server } from "lucide-react";

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
import { services } from "@/lib/content";
import { pad } from "@/lib/utils";

const icons = {
  pen: PenTool,
  code: Code2,
  server: Server,
} as const;

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-x-clip py-section"
    >
      <Halo className="top-0 right-0 size-[24rem] opacity-25" />

      <div className="shell">
        <SectionHeading
          id="services-title"
          index="03"
          eyebrow="Services"
          title="What I actually do"
          lead="Three disciplines, one person. That means no handoff, no translation loss, and no waiting on someone else to unblock the build."
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-3"
          stagger={0.12}
        >
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <RevealItem key={service.title} className="h-full">
                <GlassCard>
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span
                        aria-hidden
                        className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2/70 text-accent"
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="eyebrow">{pad(i + 1)}</span>
                    </div>

                    <h3 className="mt-8 text-h3">{service.title}</h3>
                    <p className="mt-4 text-muted">{service.body}</p>

                    <RevealChips className="mt-8 flex flex-wrap gap-2 pt-2">
                      {service.tags.map((tag) => (
                        <RevealChip key={tag}>
                          <Tag>{tag}</Tag>
                        </RevealChip>
                      ))}
                    </RevealChips>
                  </div>
                </GlassCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
