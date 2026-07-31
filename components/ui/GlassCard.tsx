"use client";

import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Frosted card with a pointer-tracked glow and an optional subtle 3D tilt.
 *  Both effects are fine-pointer only, so touch devices get a plain card. */
export default function GlassCard({
  children,
  className,
  tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), springSoft);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), springSoft);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const enableTilt = tilt && !reduced;

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <m.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={
          enableTilt
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        className={cn(
          "glass glass-hover h-full p-6 transition-[border-color,box-shadow] duration-500 sm:p-8",
          "hover-fine:border-accent/25 hover-fine:shadow-lift",
          className,
        )}
      >
        {children}
      </m.div>
    </div>
  );
}
