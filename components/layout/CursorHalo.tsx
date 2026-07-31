"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

/** Soft copper bloom trailing the cursor. Desktop pointers only, and never
 *  under reduced motion — it is pure decoration. */
export default function CursorHalo() {
  const mounted = useMounted();
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const enabled = mounted && fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      style={{ x, y, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed top-0 left-0 z-[55] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
    >
      <div className="size-[22rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_11%,transparent),transparent)] mix-blend-plus-lighter" />
    </m.div>
  );
}
