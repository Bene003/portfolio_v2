import type {
  PersonalProject,
  ProcessStep,
  Service,
  StackGroup,
  Stat,
  TimelineEntry,
} from "@/types/content";

export const services: Service[] = [
  {
    title: "UI / UX Design",
    icon: "pen",
    body: "I am not a pixel perfectionist. I am a user flow perfectionist. Clean, focused interfaces where every element earns its place, from colour and spacing to layout logic.",
    tags: ["Design systems", "Prototyping", "Motion", "Accessibility"],
  },
  {
    title: "Frontend Development",
    icon: "code",
    body: "I do not just build what looks good. I build what feels right. Structured CSS, deliberate interaction, and animation that carries meaning instead of decorating a page.",
    tags: ["React / Next.js", "TypeScript", "Tailwind", "WebGL"],
  },
  {
    title: "Backend Development",
    icon: "server",
    body: "I like backends that simply work. Fast, secure, built to last. Auth, payments, data models and admin logic: the foundation that lets a product scale with confidence.",
    tags: ["PostgreSQL", "Supabase", "Stripe", "API design"],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "2019 — 2021",
    title: "The Beginning",
    body: "I started teaching myself web development with the aim of making a career out of it. Static sites, then dynamic ones, then everything I could break and rebuild.",
    tags: ["HTML / CSS", "JavaScript", "Self-taught"],
  },
  {
    period: "2021 — 2023",
    title: "Bachelor's degree in Web Development",
    body: "Formal validation of the craft, and the point where self-taught instinct met structured computer science: data structures, databases, architecture.",
    tags: ["Computer science", "Databases", "Architecture"],
  },
  {
    period: "2023 — 2025",
    title: "Missions",
    body: "I built sites for free for people around me, then for businesses across Italy, Portugal, Spain and France. Storefronts, booking platforms and patient journeys, delivered end to end in whichever language the client works in.",
    tags: ["Freelance", "Four countries", "Delivery"],
  },
  {
    period: "2025 — now",
    title: "Shipping products",
    body: "Now settled in Canada, with products of my own in production: an e-commerce brand, a B2B real-estate SaaS, a content agency platform. What I want next is to put that European delivery experience to work here, on a team.",
    tags: ["Montréal", "Product", "Open to work"],
  },
];

/* ── Personal work ────────────────────────────────────────────────
   Built for myself, on my own time, with nobody to sign off the
   scope. This is where the risk goes: the things a client brief
   would never fund, and the reason the client work is any good. ─── */
export const personalWork: PersonalProject[] = [
  {
    name: "Ruby",
    tagline: "A voice assistant I own end to end",
    body: "A personal AI assistant built brick by brick in Python: speech in through Whisper, a reasoning loop that can call its own tools, a persistent memory in SQLite, and a voice back out. It runs on my machine, not somebody's cloud, and every layer is one I can open.",
    why: "Not to rebuild Siri, but to understand an agent from the inside: what it should remember, when it should act on its own, and where autonomy stops being useful.",
    status: "Paused until the hardware catches up",
    year: "2026",
    stack: [
      "Python",
      "Claude API",
      "Ollama",
      "Whisper",
      "SQLite",
      "PyQt6",
      "Tool calling",
    ],
  },
  {
    name: "Immobilius",
    tagline: "Commercial leads, months before the search",
    body: "A B2B SaaS that watches funding rounds, headcount growth and executive hires, scores the signal with a written reason attached, and drops the qualified lead onto a clustered map. Signal engine, scoring, billing and digests, all mine.",
    why: "Brokers hear about a lease search once five other brokers already have. The intent is visible months earlier if something is actually watching for it.",
    status: "In production",
    year: "2025 — 2026",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Anthropic API",
      "Leaflet",
      "Stripe",
    ],
  },
  {
    name: "TAGALLERY",
    tagline: "A marketplace for one-of-one antiques",
    body: "A mobile marketplace built with Expo and React Native, where every item exists exactly once. That single constraint forces the hard parts: timed cart reservations so two buyers cannot claim the same piece, live auctions with server-side bidding, and push notifications that arrive the moment either one moves.",
    why: "Antique dealers sell unique stock through DMs and screenshots. A marketplace where inventory is one deep needs rules a standard cart has never had to enforce.",
    status: "In build: backend live, store release next",
    year: "2026 — now",
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "Supabase",
      "Edge Functions",
      "Stripe",
      "Zustand",
    ],
  },
];

export const stack: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Three.js",
      "React Native",
      "Liquid",
    ],
  },
  {
    label: "Backend & data",
    items: [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Stripe",
      "REST APIs",
      "Python",
      "Django",
    ],
  },
  {
    label: "Platforms & tooling",
    items: [
      "Git",
      "Vercel",
      "Shopify",
      "Brevo",
      "Turbopack",
      "ESLint",
      "Expo",
      "Claude API",
    ],
  },
  {
    label: "Craft",
    items: ["Design systems", "Accessibility", "SEO", "Performance", "Figma"],
  },
];

export const process: ProcessStep[] = [
  {
    title: "Discover",
    body: "Who is it for, what must it do, and what would make it fail. Scope before pixels.",
  },
  {
    title: "Design",
    body: "Flows first, then interface. Every screen exists to move someone one step forward.",
  },
  {
    title: "Build",
    body: "Typed, tested and readable. Written so the next person, often future me, can move fast in it.",
  },
  {
    title: "Ship",
    body: "Deployed, measured, iterated. A product that is not in production is a prototype.",
  },
];

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Years writing code" },
  { value: 13, suffix: "", label: "Projects shipped" },
  { value: 2200, suffix: "+", label: "Source files authored" },
];

export const marqueeItems = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "Stripe",
  "Shopify",
  "Three.js",
  "Node.js",
  "Django",
  "React Native",
  "Python",
  "Vercel",
];
