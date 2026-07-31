"use client";

import dynamic from "next/dynamic";

import { useCan3D } from "@/hooks/useCan3D";

import HeroFallback from "./HeroFallback";

/** `ssr: false` plus a gate that runs before the import means a phone never
 *  downloads the Three.js chunk at all — it is not deferred, it is absent. */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/** Single decision point for the hero visual. */
export default function HeroVisual() {
  const can3D = useCan3D();
  return can3D ? <HeroCanvas /> : <HeroFallback />;
}
