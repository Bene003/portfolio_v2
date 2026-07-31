"use client";

import { useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/** Normalised pointer position as spring-smoothed motion values in [-1, 1].
 *  Motion values, not state — the pointer moves at 120 Hz and React must
 *  never re-render for it. Inert on touch and in reduced-motion. */
export function usePointerParallax(damping = 26) {
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 55, damping, mass: 0.8 };
  const px = useSpring(x, config);
  const py = useSpring(y, config);

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, x, y]);

  return { x: px, y: py };
}
