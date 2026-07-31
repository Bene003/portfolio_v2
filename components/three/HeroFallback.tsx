"use client";

import { m, useTransform } from "motion/react";

import { usePointerParallax } from "@/hooks/usePointerParallax";
import { cn } from "@/lib/utils";

/** One tilted orbital plane: a ring, plus a carrier that spins around it
 *  holding a planet. The planet is counter-tilted so it stays a disc rather
 *  than a squashed ellipse. */
function Orbit({
  /** Diameter as a % of the scene box. */
  size,
  tiltX,
  tiltZ,
  duration,
  reverse,
  delay = 0,
  ringClassName,
  planetClassName,
  planetSize,
}: {
  size: number;
  tiltX: number;
  tiltZ: number;
  duration: number;
  reverse?: boolean;
  delay?: number;
  ringClassName: string;
  planetClassName: string;
  planetSize: string;
}) {
  const inset = `${(100 - size) / 2}%`;

  return (
    <div
      className="absolute [transform-style:preserve-3d]"
      style={{
        inset,
        transform: `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`,
      }}
    >
      <div className={cn("absolute inset-0 rounded-full border", ringClassName)} />

      <div
        className={cn(
          "absolute inset-0 [transform-style:preserve-3d] motion-reduce:animate-none",
          reverse ? "animate-orbit-rev" : "animate-orbit",
        )}
        style={{ animationDuration: `${duration}s`, animationDelay: `-${delay}s` }}
      >
        <div
          className={cn(
            "absolute top-0 left-1/2 rounded-full",
            planetSize,
            planetClassName,
          )}
          style={{ transform: `translate(-50%, -50%) rotateX(${-tiltX}deg)` }}
        />
      </div>
    </div>
  );
}

/** A mote that fades in, holds, and fades back out. */
function Mote({
  className,
  delay,
  duration = 5.5,
}: {
  className: string;
  delay: number;
  duration?: number;
}) {
  return (
    <span
      className={cn("absolute animate-twinkle motion-reduce:hidden", className)}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    />
  );
}

/** The hero's orbital system, in pure CSS + transforms. This is what phones,
 *  tablets, low-tier GPUs and reduced-motion users get — so it is a designed
 *  scene in its own right, not a degraded placeholder. It occupies exactly the
 *  same box as the WebGL canvas, so swapping between them shifts nothing. */
export default function HeroFallback() {
  const { x, y } = usePointerParallax();

  // The whole system tips towards the cursor.
  const rotateY = useTransform(x, [-1, 1], [-16, 16]);
  const rotateX = useTransform(y, [-1, 1], [10, -10]);
  const shiftX = useTransform(x, [-1, 1], [-18, 18]);
  const shiftY = useTransform(y, [-1, 1], [-12, 12]);

  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <m.div
        style={{ x: shiftX, y: shiftY }}
        className="relative aspect-square w-[min(86vw,32rem)] [perspective:1400px] sm:w-[min(72vw,38rem)] lg:w-[min(46vw,42rem)]"
      >
        <m.div
          style={{ rotateX, rotateY }}
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          {/* ── ambient bloom behind everything ───────────────────── */}
          <div className="absolute inset-[6%] animate-breathe rounded-full bg-[conic-gradient(from_210deg,var(--color-accent),var(--color-accent-2),var(--color-cool),var(--color-accent))] blur-[70px] motion-reduce:animate-none" />

          {/* ── outer wireframe shell ─────────────────────────────── */}
          <div className="absolute inset-0 animate-spin-slow [transform-style:preserve-3d] motion-reduce:animate-none">
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 size-full text-accent/20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <circle cx="200" cy="200" r="168" />
              <path d="M200 32 L345 284 L55 284 Z" className="text-accent/10" />
              <path d="M200 368 L55 116 L345 116 Z" className="text-accent/10" />
              <path d="M32 200 L284 55 L284 345 Z" className="text-cool/10" />
              <path d="M368 200 L116 55 L116 345 Z" className="text-cool/10" />
            </svg>
          </div>

          {/* ── orbits, outer to inner ────────────────────────────── */}
          <Orbit
            size={100}
            tiltX={78}
            tiltZ={8}
            duration={52}
            delay={6}
            ringClassName="border-line/70"
            planetClassName="size-2 bg-cool shadow-[0_0_16px_2px_color-mix(in_oklab,var(--color-cool)_60%,transparent)]"
            planetSize="size-2"
          />
          <Orbit
            size={78}
            tiltX={72}
            tiltZ={-20}
            duration={34}
            ringClassName="border-accent/20"
            planetClassName="bg-[radial-gradient(circle_at_32%_28%,var(--color-accent-2),var(--color-accent-deep))] shadow-[0_0_24px_4px_color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
            planetSize="size-3.5"
          />
          <Orbit
            size={56}
            tiltX={66}
            tiltZ={28}
            duration={23}
            reverse
            delay={4}
            ringClassName="border-accent-2/15"
            planetClassName="bg-accent-2 shadow-[0_0_18px_3px_color-mix(in_oklab,var(--color-accent-2)_55%,transparent)]"
            planetSize="size-2.5"
          />

          {/* ── the core ──────────────────────────────────────────── */}
          <div className="absolute inset-[34%] [transform-style:preserve-3d]">
            {/* rim glow */}
            <div className="absolute -inset-4 animate-breathe rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_55%,transparent),transparent_70%)] blur-xl motion-reduce:animate-none" />
            {/* body */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_26%,color-mix(in_oklab,var(--color-accent-2)_60%,transparent),color-mix(in_oklab,var(--color-accent-deep)_35%,transparent)_45%,var(--color-surface-2)_72%)] shadow-glow" />
            {/* specular highlight */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_22%,rgb(255_255_255/0.5),transparent_38%)] opacity-60 mix-blend-screen" />
            {/* terminator */}
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,transparent_38%,rgb(0_0_0/0.55)_82%)]" />
          </div>

          {/* ── motes that appear and vanish ──────────────────────── */}
          <Mote
            className="top-[14%] left-[18%] size-1 rounded-full bg-accent"
            delay={0}
          />
          <Mote
            className="top-[72%] left-[9%] size-1.5 rounded-full bg-accent-2/70"
            delay={1.4}
            duration={6.5}
          />
          <Mote
            className="top-[26%] left-[84%] size-1 rounded-full bg-cool"
            delay={2.8}
            duration={7}
          />
          <Mote
            className="top-[86%] left-[68%] size-1 rounded-full bg-accent/80"
            delay={4.1}
          />
          <Mote
            className="top-[52%] left-[95%] size-2 rotate-45 border border-accent/50"
            delay={3.2}
            duration={8}
          />
          <Mote
            className="top-[8%] left-[58%] size-2.5 rotate-12 border border-cool/40"
            delay={5.6}
            duration={9}
          />
        </m.div>
      </m.div>
    </div>
  );
}
