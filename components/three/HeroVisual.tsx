"use client";

import dynamic from "next/dynamic";

import { useCan3D } from "@/hooks/useCan3D";

import HeroFallback from "./HeroFallback";

/** `ssr: false` keeps WebGL client-only. The capability gate runs before the
 *  import, so constrained devices never download the Three.js chunk; capable
 *  phones receive the responsive low-quality scene. */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/** Single decision point for the hero visual. */
export default function HeroVisual() {
  const can3D = useCan3D();
  return can3D ? <HeroCanvas /> : <HeroFallback />;
}
