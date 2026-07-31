"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  const shown = reduced && inView ? value : display;

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString("en-CA")}
      {suffix}
    </span>
  );
}
