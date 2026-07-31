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
  size: 0.7 + ((index * 17) % 18) / 10,
  delay: -((index * 1.37) % 12),
  duration: 4.8 + ((index * 29) % 65) / 10,
  warmth: index % 6,
}));

const SHOOTING_STARS = [
  { top: "12%", left: "18%", delay: "-3s", duration: "13s", scale: 0.8 },
  { top: "38%", left: "68%", delay: "-9s", duration: "17s", scale: 1.05 },
  { top: "72%", left: "8%", delay: "-14s", duration: "21s", scale: 0.65 },
] as const;

const DUST = [
  { top: "21%", left: "13%", size: 90, duration: 24, delay: -6 },
  { top: "63%", left: "78%", size: 140, duration: 31, delay: -18 },
  { top: "82%", left: "30%", size: 70, duration: 27, delay: -11 },
] as const;

function StarField() {
  return (
    <div className="absolute inset-0 motion-reduce:hidden">
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
            className="absolute animate-star-pulse rounded-full opacity-0"
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

function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden motion-reduce:hidden">
      {SHOOTING_STARS.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="absolute h-px w-28 origin-left animate-shooting-star opacity-0"
          style={{
            top: star.top,
            left: star.left,
            scale: star.scale,
            animationDelay: star.delay,
            animationDuration: star.duration,
            background:
              "linear-gradient(90deg, rgb(255 177 92 / 0), rgb(255 177 92 / .8) 74%, white)",
            filter: "drop-shadow(0 0 5px rgb(255 106 43 / .65))",
          }}
        >
          <span className="absolute -right-0.5 -top-0.5 size-1 rounded-full bg-white shadow-[0_0_10px_var(--color-accent-2)]" />
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
        className="absolute -inset-24 opacity-35 motion-reduce:hidden"
      >
        <div className="size-full animate-cosmic-drift [background-image:radial-gradient(1px_1px_at_20%_30%,var(--color-fg)_55%,transparent_60%),radial-gradient(1px_1px_at_72%_18%,var(--color-fg)_45%,transparent_60%),radial-gradient(1px_1px_at_45%_78%,var(--color-cool)_60%,transparent_62%),radial-gradient(1px_1px_at_88%_62%,var(--color-fg)_40%,transparent_60%)] [background-size:270px_270px,410px_410px,350px_350px,520px_520px]" />
      </m.div>

      {/* Individual stars have independent brightness cycles. */}
      <m.div
        style={{ x: nearX, y: scrollNear }}
        className="absolute -inset-10"
      >
        <StarField />
      </m.div>

      {/* Rare enough to feel incidental rather than like a looping effect. */}
      <m.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
        <ShootingStars />
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
        className="absolute top-[8%] right-[-8%] w-[min(64rem,70vw)] opacity-[0.07] motion-reduce:opacity-[0.04]"
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
      <div className="absolute inset-0 [background:radial-gradient(120%_100%_at_50%_8%,transparent_32%,color-mix(in_oklab,var(--color-bg)_72%,transparent)_72%,var(--color-bg)_100%)]" />
    </div>
  );
}
