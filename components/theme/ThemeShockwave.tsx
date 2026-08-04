"use client";

import { useEffect, useRef } from "react";

import {
  THEME_CHANGE_EVENT,
  type Theme,
  type ThemeChangeDetail,
} from "@/lib/theme";

const WAVE_COLORS = {
  fire: "#ff6a2b",
  storm: "#ffd84d",
  ice: "#9cecff",
  flora: "#57d36b",
  terra: "#c9783d",
  water: "#168cff",
  nova: "#b78bff",
} as const satisfies Record<Theme, string>;

export default function ThemeShockwave() {
  const wave = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail;
      const element = wave.current;
      // Native View Transitions already animate a full-screen reveal. Running
      // a second full-screen bloom at the same time wastes GPU fill-rate.
      if (!element || detail.reducedMotion || detail.nativeTransition) return;

      element.style.setProperty("--wave-x", `${detail.x}px`);
      element.style.setProperty("--wave-y", `${detail.y}px`);
      element.style.setProperty(
        "--wave-color",
        WAVE_COLORS[detail.theme],
      );
      element.classList.remove("is-active");
      void element.offsetWidth;
      element.classList.add("is-active");
    };

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  }, []);

  return <div ref={wave} className="theme-shockwave" aria-hidden />;
}
