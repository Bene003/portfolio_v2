"use client";

import { m, useScroll, useTransform } from "motion/react";

import { usePointerParallax } from "@/hooks/usePointerParallax";

type Star = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  warmth: number;
};

/** Deterministic pseudo-random layout: no hydration mismatch and no jump on
 * navigation, while still avoiding an obvious repeating grid. */
const STARS: Star[] = Array.from({ length: 46 }, (_, index) => ({
  x: (index * 47 + (index % 5) * 13) % 100,
  y: (index * 71 + (index % 7) * 9) % 100,
  size: 1 + ((index * 17) % 22) / 10,
  delay: -((index * 1.37) % 12),
  duration: 4.8 + ((index * 29) % 65) / 10,
  warmth: index % 6,
}));

const SKILL_COMETS = [
  { label: "Product Strategy", top: "6%", left: "-24%", delay: "0s", duration: "60s", angle: 20, scale: 1, path: "se" },
  { label: "Entrepreneurial Thinking", top: "14%", left: "112%", delay: "-6s", duration: "60s", angle: 160, scale: 0.82, path: "sw" },
  { label: "Digital Marketing", top: "108%", left: "-18%", delay: "-12s", duration: "60s", angle: -22, scale: 0.92, path: "ne" },
  { label: "Business Strategy", top: "110%", left: "116%", delay: "-18s", duration: "60s", angle: -158, scale: 0.86, path: "nw" },
  { label: "AI Product Design", top: "38%", left: "-32%", delay: "-24s", duration: "60s", angle: 17, scale: 0.9, path: "se" },
  { label: "Full-Stack Product Development", top: "48%", left: "120%", delay: "-30s", duration: "60s", angle: 164, scale: 0.78, path: "sw" },
  { label: "Systems Thinking", top: "114%", left: "12%", delay: "-36s", duration: "60s", angle: -18, scale: 0.84, path: "ne" },
  { label: "Product Vision", top: "112%", left: "92%", delay: "-42s", duration: "60s", angle: -162, scale: 0.8, path: "nw" },
  { label: "Strategic Decision Making", top: "76%", left: "-38%", delay: "-48s", duration: "60s", angle: 14, scale: 0.76, path: "se" },
  { label: "Opportunity Identification", top: "73%", left: "116%", delay: "-54s", duration: "60s", angle: 166, scale: 0.74, path: "sw" },
] as const;

const DUST = [
  { top: "21%", left: "13%", size: 90, duration: 24, delay: -6 },
  { top: "63%", left: "78%", size: 140, duration: 31, delay: -18 },
  { top: "82%", left: "30%", size: 70, duration: 27, delay: -11 },
] as const;

function StarField() {
  return (
    <div className="absolute inset-0 mix-blend-screen">
      {STARS.map((star, index) => {
        const color =
          star.warmth === 0
            ? "var(--color-accent-2)"
            : star.warmth === 1
              ? "var(--color-cool)"
              : "var(--color-fg)";

        return (
          <span
            key={index}
            className="absolute animate-star-pulse rounded-full opacity-0 motion-reduce:animate-none motion-reduce:opacity-70"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              backgroundColor: color,
              boxShadow:
                star.size > 1.8
                  ? `0 0 ${star.size * 5}px ${color}`
                  : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

function SkillComets() {
  return (
    <div className="absolute inset-0 overflow-hidden motion-reduce:hidden">
      {SKILL_COMETS.map((skill, index) => (
        <span
          key={skill.label}
          className={`skill-comet skill-comet--${skill.path} absolute opacity-0`}
          style={{
            top: skill.top,
            left: skill.left,
            scale: skill.scale,
            animationDelay: skill.delay,
            animationDuration: skill.duration,
            color: index % 3 === 1 ? "var(--color-accent-2)" : index % 3 === 2 ? "#aebbd4" : "var(--color-accent)",
          }}
        >
          <span
            className="skill-comet__trail"
            style={{ transform: `translateY(-50%) rotate(${skill.angle}deg)` }}
          />
          <span className="skill-comet__core">
            <span className="skill-comet__spark" />
          </span>
          <span className="skill-comet__label">
            <span aria-hidden className="text-accent-2/70">✦</span>
            {skill.label}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Lightweight, fixed space environment shared by every route. Each depth
 * layer has a different pointer and scroll response, so the page feels like a
 * window into space instead of a flat texture. */
export default function AmbientBackground() {
  const { x, y } = usePointerParallax();
  const { scrollYProgress } = useScroll();

  const farX = useTransform(x, [-1, 1], [10, -10]);
  const nearX = useTransform(x, [-1, 1], [32, -32]);
  const nearY = useTransform(y, [-1, 1], [22, -22]);
  const scrollFar = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scrollNear = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bloomX = useTransform(x, [-1, 1], [-70, 70]);
  const bloomY = useTransform(y, [-1, 1], [-50, 50]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Deep star maps: dense but deliberately dim behind the content. */}
      <m.div
        style={{ x: farX, y: scrollFar }}
        className="absolute -inset-24 opacity-65"
      >
        <div className="size-full animate-cosmic-drift [background-image:radial-gradient(1px_1px_at_20%_30%,var(--color-fg)_55%,transparent_60%),radial-gradient(1px_1px_at_72%_18%,var(--color-fg)_45%,transparent_60%),radial-gradient(1px_1px_at_45%_78%,var(--color-cool)_60%,transparent_62%),radial-gradient(1px_1px_at_88%_62%,var(--color-fg)_40%,transparent_60%)] [background-size:270px_270px,410px_410px,350px_350px,520px_520px] motion-reduce:animate-none" />
      </m.div>

      {/* Individual stars have independent brightness cycles. */}
      <m.div
        style={{ x: nearX, y: scrollNear }}
        className="absolute -inset-10"
      >
        <StarField />
      </m.div>

      {/* Skills become named comets instead of generic shooting stars. */}
      <m.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
        <SkillComets />
      </m.div>

      {/* Tiny orbital dust systems add slow movement between meteor events. */}
      <div className="absolute inset-0 motion-reduce:hidden">
        {DUST.map((dust) => (
          <span
            key={`${dust.top}-${dust.left}`}
            className="absolute animate-dust-orbit rounded-full border border-accent/8"
            style={{
              top: dust.top,
              left: dust.left,
              width: dust.size,
              height: dust.size * 0.28,
              animationDuration: `${dust.duration}s`,
              animationDelay: `${dust.delay}s`,
            }}
          >
            <span className="absolute top-1/2 -left-0.5 size-1 rounded-full bg-accent/40 shadow-[0_0_10px_var(--color-accent)]" />
          </span>
        ))}
      </div>

      {/* A faint constellation / navigation motif. */}
      <svg
        viewBox="0 0 1000 700"
        className="absolute top-[8%] right-[-8%] w-[min(64rem,70vw)] opacity-[0.16] mix-blend-screen motion-reduce:opacity-[0.08]"
        fill="none"
      >
        <path
          d="M92 172 246 94 388 214 552 124 716 246 886 108M388 214l74 184 254-152 126 210-278 128-102-186-258 94L92 172"
          stroke="url(#constellation)"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
        {["92,172", "246,94", "388,214", "552,124", "716,246", "886,108", "462,398", "842,456", "564,584", "204,492"].map(
          (point) => {
            const [cx, cy] = point.split(",");
            return <circle key={point} cx={cx} cy={cy} r="3" fill="#ff9a55" />;
          },
        )}
        <defs>
          <linearGradient id="constellation" x1="92" y1="94" x2="886" y2="584">
            <stop stopColor="#ff6a2b" />
            <stop offset="1" stopColor="#7790bd" />
          </linearGradient>
        </defs>
      </svg>

      {/* Warm nebulae keep the black from becoming visually dead. */}
      <m.div
        style={{ x: bloomX, y: bloomY }}
        className="absolute top-[-22rem] left-1/2 size-[58rem] -translate-x-1/2 rounded-full opacity-[0.14] blur-[140px] [background:radial-gradient(circle,var(--color-accent),transparent_65%)]"
      />
      <div className="absolute -right-72 bottom-[-20rem] size-[46rem] animate-nebula rounded-full opacity-[0.07] blur-[150px] [background:radial-gradient(circle,var(--color-cool),transparent_64%)] motion-reduce:animate-none" />

      {/* The vignette protects text contrast at every viewport size. */}
      <div className="absolute inset-0 [background:radial-gradient(120%_100%_at_50%_8%,transparent_48%,color-mix(in_oklab,var(--color-bg)_38%,transparent)_82%,color-mix(in_oklab,var(--color-bg)_68%,transparent)_100%)]" />
    </div>
  );
}
