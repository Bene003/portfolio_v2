"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/** Pulls its child slightly toward the cursor. Mouse only, motion-safe only. */
export default function MagneticButton({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </m.div>
  );
}
