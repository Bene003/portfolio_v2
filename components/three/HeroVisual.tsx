"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useCan3D } from "@/hooks/useCan3D";

import HeroFallback from "./HeroFallback";

/** `ssr: false` keeps WebGL client-only. The capability gate runs before the
 *  import, so constrained devices never download the Three.js chunk; capable
 *  phones receive the responsive low-quality scene. */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/** Single decision point for the hero visual. */
export default function HeroVisual() {
  const can3D = useCan3D();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!can3D) return;
    const idleWindow = window as IdleWindow;
    const activate = () => setReady(true);

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(activate, { timeout: 700 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(activate, 120);
    return () => window.clearTimeout(handle);
  }, [can3D]);

  return can3D && ready ? <HeroCanvas /> : <HeroFallback />;
}
