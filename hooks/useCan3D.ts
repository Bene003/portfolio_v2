"use client";

import { useSyncExternalStore } from "react";

import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface CapabilityNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/** Probed once per page load — the answer cannot change without a reload. */
let cached: boolean | null = null;

function probe(): boolean {
  if (cached !== null) return cached;

  const nav = navigator as CapabilityNavigator;

  // Respect an explicit data-saving request.
  if (nav.connection?.saveData) return (cached = false);
  // Undefined means the browser does not expose it — assume capable.
  if ((nav.deviceMemory ?? 8) < 4) return (cached = false);
  if ((nav.hardwareConcurrency ?? 8) < 4) return (cached = false);

  // The only check that actually proves anything: get a real context.
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
    if (!gl) return (cached = false);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return (cached = false);
  }

  return (cached = true);
}

const noopSubscribe = () => () => {};

/** The single decision point for WebGL. Every condition must hold, and the
 *  viewport and motion-preference parts stay live — shrinking the window
 *  below 1024px unmounts the canvas instead of just hiding it. */
export function useCan3D() {
  const capable = useSyncExternalStore(noopSubscribe, probe, () => false);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  return capable && isDesktop && !reduced;
}
