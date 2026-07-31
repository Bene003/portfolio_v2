"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

/** LazyMotion + `m.*` keeps roughly 20 kB of animation code out of the
 *  initial bundle. `reducedMotion="user"` makes every transform respect the
 *  OS setting without a single conditional in the components. */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
