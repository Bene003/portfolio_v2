"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import Halo from "@/components/ui/Halo";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { timeline } from "@/lib/content";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative overflow-x-clip py-section"
    >
      <Halo tone="cool" className="top-1/4 -left-32 size-[26rem] opacity-25" />

      <div className="shell">
        <SectionHeading
          id="journey-title"
          index="04"
          eyebrow="Journey"
          title="How I got here"
          lead="Self-taught first, formally trained second, shipping ever since."
        />

        <div ref={railRef} className="relative mt-14 lg:mt-20">
          {/* rail */}
          <div
            aria-hidden
            className="rail-line absolute top-0 bottom-0 left-[7px] w-px lg:left-1/2 lg:-translate-x-1/2"
          />
          <m.div
            aria-hidden
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-accent-2 to-accent lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-12 lg:gap-20">
            {timeline.map((entry, i) => {
              const right = i % 2 === 1;
              return (
                <li key={entry.period} className="relative">
                  <div
                    className={cn(
                      "grid lg:grid-cols-2 lg:gap-16",
                      right && "lg:[&>*]:col-start-2",
                    )}
                  >
                    <m.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.7, ease: EASE_EXPO }}
                      className={cn(
                        "pl-10 lg:pl-0",
                        right ? "lg:pl-16" : "lg:pr-16 lg:text-right",
                      )}
                    >
                      <p className="font-mono text-sm tracking-[0.12em] text-accent-text">
                        {entry.period}
                      </p>
                      <h3 className="mt-3 text-h3">{entry.title}</h3>
                      <p className="mt-3 text-muted">{entry.body}</p>
                      <ul
                        className={cn(
                          "mt-5 flex flex-wrap gap-2",
                          !right && "lg:justify-end",
                        )}
                      >
                        {entry.tags.map((tag) => (
                          <li key={tag}>
                            <Tag>{tag}</Tag>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  </div>

                  {/* node */}
                  <m.span
                    aria-hidden
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, ease: EASE_EXPO }}
                    className="absolute top-1.5 left-0 size-[15px] rotate-45 border border-accent bg-accent shadow-glow lg:left-1/2 lg:-translate-x-1/2"
                  >
                    <span
                      className="absolute -inset-2 animate-pulse-soft rounded-sm bg-accent/20 blur-[6px] motion-reduce:animate-none"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                  </m.span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
