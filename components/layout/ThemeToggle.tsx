"use client";

import { CircleDot, Flame, Leaf, Snowflake, Zap } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useTheme } from "@/hooks/useTheme";
import {
  setTheme,
  THEME_LABELS,
  THEME_ORDER,
  type Theme,
} from "@/lib/theme";

const THEME_ICONS = {
  fire: Flame,
  storm: Zap,
  ice: Snowflake,
  flora: Leaf,
} satisfies Record<Theme, typeof CircleDot>;

const WORLD_COLORS: Record<Theme, { primary: string; secondary: string }> = {
  fire: { primary: "#ff6a2b", secondary: "#ffb15c" },
  storm: { primary: "#ffd84d", secondary: "#4db8ff" },
  ice: { primary: "#73dcff", secondary: "#d9f5ff" },
  flora: { primary: "#57d36b", secondary: "#b7ef69" },
};

type WorldStyle = CSSProperties & {
  "--world-color": string;
  "--world-color-2": string;
};

const HOVER_DELAY = 520;

export default function ThemeToggle() {
  const { theme, transitioning } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const label = open
    ? "Close planet selector"
    : "Open planet selector";
  const Icon = THEME_ICONS[theme];

  const clearHoverTimer = () => {
    if (!hoverTimer.current) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };

  useEffect(() => {
    return clearHoverTimer;
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="theme-picker-anchor relative"
      onMouseEnter={() => {
        clearHoverTimer();
        if (transitioning) return;
        hoverTimer.current = window.setTimeout(() => setOpen(true), HOVER_DELAY);
      }}
      onMouseLeave={() => {
        clearHoverTimer();
        hoverTimer.current = window.setTimeout(() => setOpen(false), 220);
      }}
    >
      <button
        type="button"
        data-testid="theme-picker-trigger"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Change planet — hover to choose"
        disabled={transitioning}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        onClick={() => setOpen((current) => !current)}
        className="theme-toggle group relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-surface/45 text-fg transition-[border-color,background-color,color,transform] duration-300 hover-fine:border-accent/55 hover-fine:bg-surface-2 disabled:cursor-wait disabled:opacity-60"
      >
        <span
          aria-hidden
          className="absolute inset-1 rounded-full bg-accent/0 blur-md transition-colors duration-300 group-hover-fine:bg-accent/15"
        />
        <Icon aria-hidden className="relative size-[1.05rem] text-accent-text" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose a planet"
          className="theme-picker absolute top-[calc(100%+0.75rem)] right-0 z-[80] w-80 rounded-[1.35rem] border border-line bg-bg/92 p-2 shadow-lift backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between px-2.5 pt-1 pb-2">
            <span className="eyebrow text-[0.56rem] text-muted">Choose your world</span>
            <span className="font-mono text-[0.55rem] tracking-[0.12em] text-fg/35">04 PLANETS</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {THEME_ORDER.map((world) => {
              const WorldIcon = THEME_ICONS[world];
              const colors = WORLD_COLORS[world];
              const active = world === theme;

              return (
                <button
                  key={world}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  disabled={transitioning}
                  onClick={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setOpen(false);
                    setTheme(world, {
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                      source: "header",
                    });
                  }}
                  className="theme-picker__option group/world relative flex min-h-[5.25rem] items-end overflow-hidden rounded-2xl border p-3 text-left transition-[border-color,background-color,transform] duration-300 hover-fine:-translate-y-0.5"
                  data-active={active ? "true" : "false"}
                  data-world={world}
                  style={{
                    "--world-color": colors.primary,
                    "--world-color-2": colors.secondary,
                  } as WorldStyle}
                >
                  <span aria-hidden className="theme-picker__planet absolute top-2.5 right-3 grid size-8 place-items-center rounded-full">
                    <WorldIcon className="size-3.5" />
                  </span>
                  <span className="relative">
                    <span className="block font-display text-sm font-semibold text-fg">
                      {THEME_LABELS[world]}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">
                      {active ? "Current world" : "Enter world"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
