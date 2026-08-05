import { getThemeSnapshot, type Theme } from "@/lib/theme";

/** One hidden reaction per world, and a different place to find each one.
 *
 *  The egg you get depends on where you are standing, not which page you are
 *  on: each world reacts in its own element, so the reward is a reason to
 *  travel rather than a reason to browse. Every spot below is global — the
 *  logo, the page title and five inert lines of the footer — so no world's
 *  egg is stranded on a route the visitor may never open.
 *
 *  Everything here is plain DOM appended to `<body>`: an egg is a purely
 *  visual reward, so it must never re-render the React tree or leave state
 *  behind once it has played. The overlay removes itself when it is done. */

/** The places an egg can be hidden. Marked on the page by `<SecretSpot>`. */
export type EggSpot =
  | "logo"
  | "title"
  | "identity"
  | "navigate"
  | "elsewhere"
  | "copyright"
  | "built";

/** Where each world hides its egg. Nothing else on the page reacts, so a
 *  world is silent everywhere except its own spot — that silence is what
 *  makes finding the right one worth something. */
const WORLD_SPOT = {
  fire: "logo",
  storm: "title",
  ice: "built",
  flora: "identity",
  terra: "copyright",
  water: "navigate",
  nova: "elsewhere",
} satisfies Record<Theme, EggSpot>;

type EasterEgg =
  "ember" | "blackout" | "freeze" | "bloom" | "quake" | "flood" | "warp";

/** Colours come from the active theme's `--color-accent`, so every egg is
 *  already tinted for its world — only the gesture has to be authored here. */
const WORLD_EGG = {
  fire: "ember",
  storm: "blackout",
  ice: "freeze",
  flora: "bloom",
  terra: "quake",
  water: "flood",
  nova: "warp",
} satisfies Record<Theme, EasterEgg>;

/** How long each overlay lives. Must stay in step with the longest animation
 *  on that egg in `globals.css`, or the layer is pulled mid-flight. */
const LIFETIME_MS = {
  ember: 1500,
  blackout: 1400,
  freeze: 1600,
  bloom: 1600,
  quake: 1500,
  flood: 1500,
  warp: 1300,
} satisfies Record<EasterEgg, number>;

/** The fixed washes and flashes each egg is built from, in paint order. */
const PARTS = {
  ember: ["heat", "flare"],
  blackout: ["dark", "bolt", "flash"],
  freeze: ["frost", "glare"],
  bloom: ["wash"],
  quake: ["crust", "dust"],
  flood: ["surge"],
  warp: ["dark", "core"],
} satisfies Record<EasterEgg, readonly string[]>;

/** The repeated element each egg scatters on top of its washes. Generated
 *  rather than written out because every one needs its own bearing, size and
 *  delay — and because the count is the main tuning knob for each gesture.
 *  `jitter` is how far off its exact bearing a piece may sit: zero reads as
 *  engineered, a few degrees reads as natural. */
const SWARM = {
  ember: { part: "ember", count: 26, jitter: 0 },
  freeze: { part: "shard", count: 22, jitter: 8 },
  bloom: { part: "leaf", count: 20, jitter: 0 },
  quake: { part: "crack", count: 7, jitter: 0 },
  flood: { part: "ring", count: 6, jitter: 0 },
  warp: { part: "streak", count: 18, jitter: 0 },
} satisfies Partial<
  Record<EasterEgg, { part: string; count: number; jitter: number }>
>;

let live: HTMLElement | null = null;
let timer = 0;

/** Spread in [-1, 1]. */
function jitterOf(amount: number) {
  return (Math.random() * 2 - 1) * amount;
}

function build(egg: EasterEgg) {
  const layer = document.createElement("div");
  layer.className = `easter-egg easter-egg--${egg}`;
  layer.setAttribute("aria-hidden", "true");

  for (const part of PARTS[egg]) {
    const node = document.createElement("span");
    node.className = `easter-egg__${part}`;
    layer.append(node);
  }

  const swarm = egg in SWARM ? SWARM[egg as keyof typeof SWARM] : null;
  if (!swarm) return layer;

  const step = 360 / swarm.count;

  for (let i = 0; i < swarm.count; i += 1) {
    const piece = document.createElement("span");
    piece.className = `easter-egg__${swarm.part}`;
    // Every piece carries the full set; each egg's CSS reads only what it
    // needs, which keeps this loop to one shape for all six swarms.
    piece.style.setProperty("--i", `${i}`);
    piece.style.setProperty(
      "--angle",
      `${step * i + jitterOf(swarm.jitter)}deg`,
    );
    piece.style.setProperty(
      "--x",
      `${((i + 0.5) / swarm.count) * 100 + jitterOf(3)}%`,
    );
    piece.style.setProperty("--d", `${jitterOf(1).toFixed(3)}`);
    piece.style.setProperty("--s", `${(0.6 + Math.random() * 0.4).toFixed(3)}`);
    layer.append(piece);
  }

  return layer;
}

/** Plays the current world's egg, but only from the spot that world hides it
 *  in. Replaces one already on screen rather than stacking: two blackouts at
 *  once would just cancel each other out. */
export function playEasterEgg(spot: EggSpot) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const theme = getThemeSnapshot().theme;
  if (WORLD_SPOT[theme] !== spot) return;

  live?.remove();
  window.clearTimeout(timer);

  const egg = WORLD_EGG[theme];
  const layer = build(egg);
  document.body.append(layer);
  live = layer;

  timer = window.setTimeout(() => {
    layer.remove();
    if (live === layer) live = null;
  }, LIFETIME_MS[egg]);
}
