import Image from "next/image";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Halo from "@/components/ui/Halo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/lib/content";

const paragraphs = [
  "I started building for the web in 2019, on my own, because I wanted to make things that existed outside my head. Five years later that instinct met formal training — a bachelor's degree in web development — and the two turned out to reinforce each other.",
  "Today I work across the whole stack. Design systems and motion on one end, PostgreSQL schemas and Stripe webhooks on the other. I like being the person who can take a product from a blank Figma file to a live URL without a handoff.",
  "I'm based in Montréal, work in English and French, and I care about the same three things on every project: it should be fast, it should be clear, and it should actually ship.",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-x-clip py-section"
    >
      <Halo className="top-1/4 -left-40 size-[26rem] opacity-30" />

      <div className="shell">
        <SectionHeading
          id="about-title"
          index="02"
          eyebrow="About"
          title={
            <>
              I build the whole thing —{" "}
              <span className="text-gradient-copper">design included.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealGroup className="flex flex-col gap-6">
              {paragraphs.map((p) => (
                <RevealItem key={p}>
                  <p className="text-lead text-muted prose-width">{p}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup
              className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-10 sm:grid-cols-3"
              stagger={0.12}
            >
              {stats.map((stat) => (
                <RevealItem key={stat.label}>
                  <p className="font-display text-h3 font-semibold text-fg">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="eyebrow mt-2">{stat.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="portrait-card glass relative cursor-pointer p-3 shadow-lift touch-manipulation">
                  <span
                    aria-hidden
                    className="portrait-halo absolute inset-[12%] rounded-full bg-accent/45 blur-[52px]"
                  />
                  <span
                    aria-hidden
                    className="portrait-orbit absolute -inset-4 rounded-[2rem] border border-accent/25"
                  />
                  <div className="relative aspect-4/5 overflow-hidden rounded-[1.1rem] bg-[radial-gradient(circle_at_65%_32%,color-mix(in_oklab,var(--color-accent)_15%,transparent),var(--color-surface-2)_62%)]">
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-35 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
                    />
                    <Image
                      src="/images/portrait.webp"
                      alt="Portrait of Eben Kwete"
                      fill
                      sizes="(max-width: 1024px) 22rem, 28rem"
                      className="portrait-cutout object-contain object-bottom"
                    />
                    <span
                      aria-hidden
                      className="portrait-flare absolute right-[22%] bottom-[18%] size-2 rounded-full bg-accent-2 shadow-[0_0_18px_5px_var(--color-accent)]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
