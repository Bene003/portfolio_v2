"use client";

import { ArrowDownRight, Github, Linkedin } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import HeroVisual from "@/components/three/HeroVisual";
import Button from "@/components/ui/Button";
import Halo from "@/components/ui/Halo";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitText from "@/components/ui/SplitText";
import { useTheme } from "@/hooks/useTheme";
import { EASE_EXPO } from "@/lib/motion";
import { site } from "@/lib/site";
import { WORLD_STORY } from "@/lib/worlds";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const story = WORLD_STORY[theme];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-24"
    >
      <Halo className="-top-32 -right-24 size-[28rem] sm:size-[38rem] lg:-right-40 lg:size-[46rem]" />
      <Halo
        tone="cool"
        className="-bottom-40 -left-32 size-[24rem] sm:size-[32rem]"
      />

      {/* Visual layer: full-bleed on small screens, right half on desktop. */}
      <m.div
        aria-hidden
        style={{ y: visualY, opacity: visualOpacity }}
        className="hero-world pointer-events-auto absolute top-[22%] -right-[26%] left-[18%] z-0 h-[48%] opacity-100 sm:top-[25%] sm:-right-[12%] sm:left-[30%] sm:h-[52%] md:left-[36%] lg:inset-0 lg:left-[44%] lg:h-auto lg:opacity-100"
      >
        <HeroVisual />
      </m.div>

      {/* On small screens the world sits behind the copy. These soft masks
          merge it into the hero instead of letting the canvas read as a box. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,var(--color-bg)_5%,transparent_30%,transparent_68%,color-mix(in_oklab,var(--color-bg)_82%,transparent)_88%,var(--color-bg)_100%)] lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-bg)_94%,transparent)_0%,color-mix(in_oklab,var(--color-bg)_58%,transparent)_46%,transparent_82%)] sm:opacity-70 lg:hidden"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[var(--spacing-gutter)] bottom-8 z-10 hidden items-center gap-3 lg:flex"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        <span className="eyebrow text-[0.6rem] text-fg/45">World engine / live</span>
        <span className="h-px w-12 bg-gradient-to-r from-accent/60 to-transparent" />
        <span className="font-mono text-[0.6rem] tracking-[0.14em] text-fg/30">43.65°N 79.38°W</span>
      </div>

      {/* From lg the system sits behind the right half of the copy column, so
          the background is washed back to keep the text at full contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] hidden lg:block lg:bg-[linear-gradient(90deg,var(--color-bg)_14%,color-mix(in_oklab,var(--color-bg)_55%,transparent)_40%,transparent_60%)]"
      />

      <m.div
        style={{ y: textY }}
        className="shell pointer-events-none relative z-10"
      >
        <div className="max-w-3xl lg:max-w-[46rem]">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span
              aria-hidden
              className="size-1.5 animate-pulse-soft rounded-full bg-accent motion-reduce:animate-none"
            />
            <span>{site.location} — Available for work</span>
            {/* Badge rather than plain text: on a narrow screen the location
                already wraps, and a bare word would read as part of it. */}
            <m.span
              key={theme}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_EXPO }}
              className="rounded-pill border border-accent/35 bg-accent/8 px-2.5 py-0.5 text-accent-text"
            >
              {story.focus}
            </m.span>
          </m.p>

          <h1 id="hero-title" className="mt-6 text-display font-display">
            <SplitText text="Eben" delay={0.1} />{" "}
            <SplitText
              text="Kwete"
              delay={0.16}
              wordClassName="text-gradient-copper"
            />
          </h1>

          {/* Each world tells a different facet of the same profile — the copy
              lives in `lib/worlds.ts`. Keying on the theme replays the reveal
              on every trip; there is no exit animation because the shockwave
              already covers the swap. */}
          <div className="mt-6 max-w-[30rem]">
            <m.p
              key={theme}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8, ease: EASE_EXPO }}
              className="text-lead text-muted"
            >
              {story.line}
            </m.p>

            <ul key={`${theme}-skills`} className="mt-5 flex flex-wrap gap-2">
              {story.skills.map((skill, index) => (
                <m.li
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.34 + index * 0.07,
                    duration: 0.6,
                    ease: EASE_EXPO,
                  }}
                  className="rounded-full border border-line bg-surface/40 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.1em] text-fg/60 uppercase"
                >
                  {skill}
                </m.li>
              ))}
            </ul>
          </div>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: EASE_EXPO }}
            className="pointer-events-auto mt-[clamp(2.5rem,10vh,5rem)] flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center lg:mt-9"
          >
            <MagneticButton className="w-full sm:w-auto">
              <Button href="/#work" className="w-full sm:w-auto">
                View selected work
                <ArrowDownRight className="size-4" aria-hidden />
              </Button>
            </MagneticButton>

            <Button
              href="/#contact"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Get in touch
            </Button>
          </m.div>

          <m.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="pointer-events-auto mt-10 flex items-center gap-3"
          >
            {[
              { href: site.socials.github, label: "GitHub", Icon: Github },
              { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover-fine:border-accent/45 hover-fine:text-accent-text"
                >
                  <Icon className="size-4" aria-hidden />
                  <span className="sr-only">
                    {label} (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </m.ul>
        </div>
      </m.div>

      {/* scroll cue */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="h-10 w-px overflow-hidden bg-line">
            <span className="block h-4 w-px animate-scroll-cue bg-accent motion-reduce:animate-none" />
          </span>
          <span className="eyebrow">Scroll</span>
        </div>
      </div>
    </section>
  );
}
