"use client";

import { useEffect, useRef } from "react";

/** Ignore taps that land on something the visitor is clearly interacting with:
 *  a burst behind an open dialog or a form field reads as a glitch. */
const IGNORED = '[role="dialog"],[role="menu"],input,textarea,select';

const SHARDS = 8;
const THROTTLE_MS = 110;
const LIFETIME_MS = 1200;
/** A slow tap-happy visitor should never stack more than a handful of bursts. */
const MAX_LIVE = 5;
/** Beyond this, the gesture is a drag or a text selection, not a tap. */
const TAP_SLOP_PX = 12;

function buildBurst(x: number, y: number) {
  const burst = document.createElement("span");
  burst.className = "world-pulse";
  burst.style.setProperty("--px", `${x}px`);
  burst.style.setProperty("--py", `${y}px`);

  for (const part of ["ring", "core", "bolt"]) {
    const node = document.createElement("span");
    node.className = `world-pulse__${part}`;
    burst.append(node);
  }

  for (let i = 0; i < SHARDS; i += 1) {
    const shard = document.createElement("span");
    shard.className = "world-pulse__shard";
    shard.style.setProperty("--angle", `${(360 / SHARDS) * i}deg`);
    shard.style.setProperty("--i", `${i}`);
    burst.append(shard);
  }

  return burst;
}

/** Every world answers a tap in its own language — embers scatter in Fire,
 *  lightning strikes in Storm, the ground cracks in Terra, and so on. The
 *  whole thing is plain DOM so a burst never re-renders the React tree. */
export default function WorldPulse() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lastBurst = 0;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (event: PointerEvent) => {
      startX = event.clientX;
      startY = event.clientY;
    };

    // `pointerup` never fires when a touch turns into a scroll — the browser
    // sends `pointercancel` instead — so this stays quiet while scrolling.
    const onPointerUp = (event: PointerEvent) => {
      const host = layer.current;
      if (!host || reducedMotion.matches || event.button !== 0) return;
      if (
        Math.abs(event.clientX - startX) > TAP_SLOP_PX ||
        Math.abs(event.clientY - startY) > TAP_SLOP_PX
      ) {
        return;
      }

      const target = event.target as Element | null;
      if (target?.closest?.(IGNORED)) return;

      const now = event.timeStamp;
      if (now - lastBurst < THROTTLE_MS) return;
      lastBurst = now;

      while (host.childElementCount >= MAX_LIVE) {
        host.firstElementChild?.remove();
      }

      const burst = buildBurst(event.clientX, event.clientY);
      host.append(burst);
      window.setTimeout(() => burst.remove(), LIFETIME_MS);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return <div ref={layer} className="world-pulse-layer" aria-hidden />;
}
