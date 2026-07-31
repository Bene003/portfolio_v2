"use client";

import { ArrowDownRight, Github, Linkedin } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import HeroVisual from "@/components/three/HeroVisual";
import Button from "@/components/ui/Button";
import Halo from "@/components/ui/Halo";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitText from "@/components/ui/SplitText";
import { EASE_EXPO } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
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
        className="pointer-events-none absolute -right-[22%] -bottom-[4%] left-[16%] z-0 h-[42%] opacity-90 sm:-right-[14%] sm:left-[30%] sm:h-[46%] lg:inset-0 lg:left-[44%] lg:h-auto lg:opacity-100"
      >
        <HeroVisual />
      </m.div>

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

      <m.div style={{ y: textY }} className="shell relative z-10">
        <div className="max-w-3xl lg:max-w-[46rem]">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="eyebrow flex items-center gap-3"
          >
            <span
              aria-hidden
              className="size-1.5 animate-pulse-soft rounded-full bg-accent motion-reduce:animate-none"
            />
            {site.location} — Available for work
          </m.p>

          <h1 id="hero-title" className="mt-6 text-display font-display">
            <SplitText text="Eben" delay={0.1} />{" "}
            <SplitText
              text="Kwete"
              delay={0.16}
              wordClassName="text-gradient-copper"
            />
          </h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE_EXPO }}
            className="mt-6 max-w-xl text-lead text-muted"
          >
            Web developer crafting fast, considered interfaces — from pixel to
            production. I design it, I build it, I ship it.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: EASE_EXPO }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
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
            className="mt-10 flex items-center gap-3"
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
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover-fine:border-accent/45 hover-fine:text-accent"
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
