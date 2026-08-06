import Halo from "@/components/ui/Halo";
import {
  RevealChip,
  RevealChips,
  RevealGroup,
  RevealItem,
} from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { stack } from "@/lib/content";

export default function Toolkit() {
  return (
    <section
      aria-labelledby="toolkit-title"
      className="relative overflow-x-clip py-section"
    >
      <Halo className="right-1/4 bottom-0 size-[22rem] opacity-20" />

      <div className="shell">
        <SectionHeading
          id="toolkit-title"
          index="06"
          eyebrow="Toolkit"
          title="What I reach for"
        />

        <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {stack.map((group) => (
            <RevealItem key={group.label}>
              <p className="eyebrow border-b border-line pb-3">{group.label}</p>
              <RevealChips className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <RevealChip
                    key={item}
                    className="rounded-pill border border-line/80 bg-surface/50 px-3 py-2 text-sm text-muted transition-all duration-300 hover-fine:-translate-y-0.5 hover-fine:border-accent/35 hover-fine:bg-accent/10 hover-fine:text-fg hover-fine:shadow-glow"
                  >
                    {item}
                  </RevealChip>
                ))}
              </RevealChips>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
