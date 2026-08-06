"use client";

import { m } from "motion/react";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { process } from "@/lib/content";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { pad } from "@/lib/utils";

export default function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="relative border-y border-line/70 bg-surface/20 py-section"
    >
      <div className="shell">
        <SectionHeading
          id="process-title"
          index="07"
          eyebrow="Process"
          title="Four steps, no mystery"
        />

        <RevealGroup
          className="relative mt-12 grid gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-10"
          stagger={0.1}
        >
          {/* connecting dashes, desktop only — drawn left to right on entry */}
          <m.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: EASE_EXPO }}
            className="absolute top-[13px] right-0 left-0 hidden h-px origin-left lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-line) 0 6px, transparent 6px 14px)",
            }}
          />

          {process.map((step, i) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="relative grid size-7 shrink-0 place-items-center rounded-full border border-accent/45 bg-bg font-mono text-[0.625rem] text-accent-text"
                >
                  <span
                    className="absolute inset-0 animate-pulse-soft rounded-full bg-accent/20 motion-reduce:animate-none"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                  <span className="relative">{pad(i + 1)}</span>
                </span>
                <span aria-hidden className="h-px flex-1 bg-line lg:hidden" />
              </div>
              <h3 className="mt-5 text-h3">{step.title}</h3>
              <p className="mt-3 text-muted">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
