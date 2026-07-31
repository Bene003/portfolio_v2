# Eben Kwete — Portfolio

Personal portfolio. Dark copper design system, a real-time WebGL orbital system in
the hero, and a full CSS fallback so the experience holds on every device.

**Stack** — Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
Tailwind CSS v4 · Motion · Three.js / React Three Fiber

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, everything prerendered
npx tsc --noEmit && npx eslint .
```

## Where things live

| Path | What it is |
| --- | --- |
| `app/globals.css` | The design system: `@theme` tokens, `@utility` helpers, keyframes. Everything is driven from here — Tailwind v4 means **no `tailwind.config.js`**. |
| `lib/site.ts` | Name, role, email, socials, résumé path, nav. |
| `lib/content/*` | Projects, services, timeline, stack, process. Single source of truth for the home page, `/work`, `/work/[slug]`, the sitemap and the OG images. |
| `components/sections/*` | One file per home-page section. |
| `components/three/*` | The hero visual: `HeroVisual` picks between `HeroCanvas` (WebGL) and `HeroFallback` (CSS). |
| `hooks/useCan3D.ts` | The single decision point for whether WebGL runs at all. |

To add a case study, add an entry to `lib/content/projects.ts` and drop a cover
image in `public/images/work/<slug>/`. Every page that references it updates on
its own.

## The 3D, and why it can't hurt performance

`HeroVisual` calls `useCan3D()` *before* the `dynamic()` import, so when the
answer is no, Three.js is never requested at all — a phone downloads zero bytes
of it. WebGL only runs when **all** of these hold: viewport ≥ 1024px, no
`prefers-reduced-motion`, no `saveData`, ≥ 4 GB memory, ≥ 4 cores, and a WebGL
context that can actually be created.

When it does run, `<Canvas frameloop>` flips to `"never"` as soon as the hero
leaves the viewport or the tab is hidden, so the GPU is idle while you read the
rest of the page. Lighting is fully local (`<Environment resolution={64}>` plus
hand-placed `<Lightformer>`s) — no HDR is fetched from a CDN.

The fallback is a designed scene in its own right, not a downgrade: rotating
orbits, a moon, a ringed planet and drifting motes, all in CSS.

## Motion rules

- `MotionConfig reducedMotion="user"` is set globally, and `LazyMotion` is in
  `strict` mode — use `m.*`, never `motion.*`.
- Anything with a CSS animation carries `motion-reduce:animate-none`.
- Hover effects go through the `hover-fine` variant
  (`@media (hover:hover) and (pointer:fine)`) so touch devices never get stuck
  in a hover state.

The site is meant to stay complete and good-looking with reduced motion on.

## Responsive

Type is fluid `clamp()` from 320px to 1920px, then frozen. The shell caps at
`88rem`; past that the extra room becomes negative space rather than longer
lines. Sections with halos use `overflow-x-clip` (not `hidden`, which would
break the sticky work rail).

Checked at 320 / 360 / 390 / 414 / 430 / 768 / 834 / 1024 / 1280 / 1440 / 1920 /
2560, plus mobile landscape.

## Placeholders still to replace

- `lib/site.ts` — GitHub and LinkedIn URLs
- `lib/content/projects.ts` — `liveUrl` for the three projects
- `public/images/portrait.svg` → a real portrait
- `public/images/work/<slug>/cover.svg` → real screenshots
- `public/resume/` → the English CV PDF
