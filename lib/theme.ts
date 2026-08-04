export type Theme =
  | "fire"
  | "storm"
  | "ice"
  | "flora"
  | "terra"
  | "water"
  | "nova";

export type ThemeOrigin = {
  x: number;
  y: number;
  source: "planet" | "header" | "command";
};

export type ThemeSnapshot = {
  theme: Theme;
  revision: number;
  transitioning: boolean;
};

export type ThemeChangeDetail = ThemeOrigin & {
  theme: Theme;
  previousTheme: Theme;
  revision: number;
  reducedMotion: boolean;
  nativeTransition: boolean;
};

export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_CHANGE_EVENT = "portfolio:theme-change";
export const THEME_TRANSITION_MS = 1200;

/** The worlds anyone can reach. `nova` is deliberately absent: it only shows
 *  up once every other world has been visited (see `lib/explorer.ts`). */
export const THEME_ORDER: Theme[] = [
  "fire",
  "storm",
  "ice",
  "flora",
  "terra",
  "water",
];

export const SECRET_THEME: Theme = "nova";

export const THEME_LABELS: Record<Theme, string> = {
  fire: "Fire",
  storm: "Storm",
  ice: "Ice",
  flora: "Flora",
  terra: "Terra",
  water: "Water",
  nova: "Nova",
};

const THEME_COLORS: Record<Theme, string> = {
  fire: "#07070a",
  storm: "#050914",
  ice: "#04111f",
  flora: "#06130c",
  terra: "#160d08",
  water: "#020b1d",
  nova: "#0a0616",
};
const listeners = new Set<() => void>();

let snapshot: ThemeSnapshot = {
  theme: "fire",
  revision: 0,
  transitioning: false,
};
const serverSnapshot: ThemeSnapshot = {
  theme: "fire",
  revision: 0,
  transitioning: false,
};
let initialized = false;
let storageListening = false;

type NativeViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => NativeViewTransition;
};

const ALL_THEMES: Theme[] = [...THEME_ORDER, SECRET_THEME];

function isTheme(value: string | null): value is Theme {
  return ALL_THEMES.includes(value as Theme);
}

function normalizeTheme(value: string | null): Theme {
  if (value === "dark" || value === "copper") return "fire";
  if (value === "light" || value === "earth") return "storm";
  return isTheme(value) ? value : "fire";
}

function readDocumentTheme(): Theme {
  if (typeof document === "undefined") return "fire";
  return normalizeTheme(document.documentElement.dataset.theme ?? null);
}

function initializeSnapshot() {
  if (initialized || typeof document === "undefined") return;
  initialized = true;
  snapshot = { ...snapshot, theme: readDocumentTheme() };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function updateSnapshot(next: Partial<ThemeSnapshot>) {
  snapshot = { ...snapshot, ...next };
  emit();
}

function updateThemeMeta(theme: Theme) {
  const content = THEME_COLORS[theme];
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.append(meta);
  }

  meta.content = content;
}

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = "dark";
  updateThemeMeta(theme);

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The visual theme still works when storage is unavailable.
    }
  }
}

function defaultOrigin(): ThemeOrigin {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    source: "header",
  };
}

function setWaveGeometry(origin: ThemeOrigin) {
  const { innerWidth: width, innerHeight: height } = window;
  const radius =
    Math.max(
      Math.hypot(origin.x, origin.y),
      Math.hypot(width - origin.x, origin.y),
      Math.hypot(origin.x, height - origin.y),
      Math.hypot(width - origin.x, height - origin.y),
    ) + 64;
  const root = document.documentElement;

  root.style.setProperty("--theme-wave-x", `${origin.x}px`);
  root.style.setProperty("--theme-wave-y", `${origin.y}px`);
  root.style.setProperty("--theme-wave-radius", `${radius}px`);
}

function dispatchThemeChange(detail: ThemeChangeDetail) {
  window.dispatchEvent(
    new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, { detail }),
  );
}

function listenForStorage() {
  if (storageListening || typeof window === "undefined") return;
  storageListening = true;

  window.addEventListener("storage", (event) => {
    if (event.key !== THEME_STORAGE_KEY || event.newValue === null) return;
    const nextTheme = normalizeTheme(event.newValue);
    initializeSnapshot();
    if (nextTheme === snapshot.theme) return;

    applyTheme(nextTheme, false);
    updateSnapshot({
      theme: nextTheme,
      revision: snapshot.revision + 1,
      transitioning: false,
    });
  });
}

export function getThemeSnapshot(): ThemeSnapshot {
  initializeSnapshot();
  return snapshot;
}

export function getServerThemeSnapshot(): ThemeSnapshot {
  return serverSnapshot;
}

export function subscribeTheme(listener: () => void) {
  initializeSnapshot();
  listenForStorage();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setTheme(theme: Theme, suppliedOrigin?: ThemeOrigin) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  initializeSnapshot();
  if (snapshot.transitioning || snapshot.theme === theme) return;

  const previousTheme = snapshot.theme;
  const origin = suppliedOrigin ?? defaultOrigin();
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const viewTransitionDocument = document as ViewTransitionDocument;
  const canUseNativeTransition =
    !reducedMotion &&
    document.documentElement.dataset.effects !== "lite" &&
    typeof viewTransitionDocument.startViewTransition === "function";
  const revision = snapshot.revision + 1;

  setWaveGeometry(origin);

  const commit = () => {
    applyTheme(theme, true);
    updateSnapshot({ theme, revision, transitioning: !reducedMotion });
    dispatchThemeChange({
      ...origin,
      theme,
      previousTheme,
      revision,
      reducedMotion,
      nativeTransition: canUseNativeTransition,
    });
  };

  if (reducedMotion) {
    commit();
    updateSnapshot({ transitioning: false });
    return;
  }

  updateSnapshot({ transitioning: true });

  if (canUseNativeTransition) {
    const transition = viewTransitionDocument.startViewTransition?.(commit);
    transition?.finished.then(
      () => updateSnapshot({ transitioning: false }),
      () => updateSnapshot({ transitioning: false }),
    );
    return;
  }

  commit();
  window.setTimeout(
    () => updateSnapshot({ transitioning: false }),
    THEME_TRANSITION_MS,
  );
}

export function toggleTheme(origin?: ThemeOrigin) {
  initializeSnapshot();
  const currentIndex = THEME_ORDER.indexOf(snapshot.theme);
  const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
  setTheme(nextTheme, origin);
}
