import {
  SECRET_THEME,
  THEME_CHANGE_EVENT,
  THEME_ORDER,
  type Theme,
  type ThemeChangeDetail,
} from "./theme";

export type ExplorerSnapshot = {
  /** Public worlds the visitor has already set foot on. */
  visited: readonly Theme[];
  /** True once every public world has been visited — unlocks `nova`. */
  unlocked: boolean;
  /** Transient: the unlock just happened and has not been acknowledged yet. */
  celebrating: boolean;
};

export const EXPLORER_STORAGE_KEY = "portfolio-worlds-visited";

const listeners = new Set<() => void>();
const emptySnapshot: ExplorerSnapshot = {
  visited: [],
  unlocked: false,
  celebrating: false,
};

let snapshot: ExplorerSnapshot = emptySnapshot;
let initialized = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function isPublicTheme(value: string): value is Theme {
  return THEME_ORDER.includes(value as Theme);
}

function readStoredVisits(): Theme[] {
  try {
    const raw = localStorage.getItem(EXPLORER_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (value): value is Theme =>
        typeof value === "string" && isPublicTheme(value),
    );
  } catch {
    // Corrupted or unavailable storage just means the visitor starts over.
    return [];
  }
}

function persist(visited: readonly Theme[]) {
  try {
    localStorage.setItem(EXPLORER_STORAGE_KEY, JSON.stringify(visited));
  } catch {
    // Exploration is a bonus; it must never break the page.
  }
}

/** Records a visit. `celebrate` is false when replaying storage on boot, so a
 *  returning visitor is not congratulated again on every page load. */
function record(theme: string, celebrate: boolean) {
  if (!isPublicTheme(theme) || snapshot.visited.includes(theme)) return;

  const visited = [...snapshot.visited, theme];
  const unlocked = THEME_ORDER.every((world) => visited.includes(world));

  persist(visited);
  snapshot = {
    visited,
    unlocked,
    celebrating: celebrate && unlocked && !snapshot.unlocked,
  };
  emit();
}

function initialize() {
  if (initialized || typeof document === "undefined") return;
  initialized = true;

  const stored = readStoredVisits();
  const unlocked = THEME_ORDER.every((world) => stored.includes(world));
  snapshot = { visited: stored, unlocked, celebrating: false };

  record(document.documentElement.dataset.theme ?? "", false);

  window.addEventListener(THEME_CHANGE_EVENT, (event) => {
    const detail = (event as CustomEvent<ThemeChangeDetail>).detail;
    record(detail.theme, true);
  });
}

export function getExplorerSnapshot(): ExplorerSnapshot {
  initialize();
  return snapshot;
}

export function getServerExplorerSnapshot(): ExplorerSnapshot {
  return emptySnapshot;
}

export function subscribeExplorer(listener: () => void) {
  initialize();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function acknowledgeUnlock() {
  if (!snapshot.celebrating) return;
  snapshot = { ...snapshot, celebrating: false };
  emit();
}

/** Worlds that should appear in the picker right now. */
export function visibleThemes(unlocked: boolean): Theme[] {
  return unlocked ? [...THEME_ORDER, SECRET_THEME] : THEME_ORDER;
}
