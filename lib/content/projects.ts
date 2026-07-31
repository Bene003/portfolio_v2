import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "elyra",
    name: "Elyra",
    tagline: "Beauty e-commerce, end to end",
    summary:
      "A full direct-to-consumer storefront for an LED skincare brand — catalogue, checkout, editorial blog and an automated content pipeline. I own the design, the storefront, the admin and the infrastructure.",
    role: "Design & Full-stack",
    year: "2025 — 2026",
    type: "E-commerce",
    status: "Live",
    liveUrl: null,
    cover: {
      src: "/images/work/elyra/cover.webp",
      alt: "Elyra beauty-tech storefront homepage featuring an LED skincare mask",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "Stripe",
      "MDX",
      "Resend",
      "Vercel",
    ],
    highlights: [
      "Multi-currency & geo-aware pricing",
      "Stripe Checkout + webhook fulfilment",
      "MDX editorial blog with scheduled generation",
      "Drag-and-drop admin merchandising",
    ],
    problem: [
      "The brand had a product but no way to sell it. Off-the-shelf platforms locked the storefront into a template, took a cut of every sale, and made the editorial side — the part that actually brings traffic — an afterthought.",
      "The goal was a storefront I fully control: fast, indexable, multi-currency, and cheap to run — with content production that does not depend on someone remembering to write a blog post.",
    ],
    build: [
      {
        title: "Storefront & checkout",
        body: [
          "Product catalogue rendered statically with incremental revalidation, so the pages are as fast as a static site while stock and pricing stay current.",
          "Checkout runs on Stripe Checkout with a webhook that fulfils the order, writes it to Postgres and triggers the transactional email through Resend. Prices and currency resolve from the visitor's region rather than a single hard-coded market.",
        ],
      },
      {
        title: "Editorial engine",
        body: [
          "The blog is MDX, so an article is a file — versioned, diffable, and renderable with real components instead of a WYSIWYG blob.",
          "Scheduled jobs draft and publish content on a cadence, keeping the long-tail SEO surface growing without manual work.",
        ],
      },
      {
        title: "Admin",
        body: [
          "A drag-and-drop merchandising panel for reordering collections and featured products, backed by Supabase row-level security so the admin surface is genuinely locked down rather than hidden behind an unlisted URL.",
        ],
      },
    ],
    technical: [
      {
        title: "Static-first rendering",
        body: "Product and article routes are prerendered and revalidated on demand. Cold traffic never waits on a database round-trip.",
      },
      {
        title: "Webhook-driven fulfilment",
        body: "Order state is derived from Stripe events, never from the browser. A closed tab mid-payment cannot lose an order.",
      },
      {
        title: "Scheduled automation",
        body: "Cron routes handle content generation, product sync and analytics cleanup — the site maintains itself between releases.",
      },
      {
        title: "Row-level security",
        body: "Authorisation lives in Postgres policies, so an API mistake cannot leak another user's data.",
      },
    ],
    outcome: [
      "A storefront the brand owns outright, with no platform fees and no template ceiling — around 400 source files covering the shop, the blog, the admin and the automation.",
    ],
    accent: "#FF6A2B",
  },
  {
    slug: "immobilius",
    name: "Immobilius",
    tagline: "B2B real-estate intelligence",
    summary:
      "A SaaS that tells commercial real-estate teams which companies are about to need space. It watches funding rounds, headcount growth and executive hires, scores the signal, and drops the qualified lead on a map.",
    role: "Product & Full-stack",
    year: "2025 — 2026",
    type: "B2B SaaS",
    status: "Live",
    liveUrl: null,
    cover: {
      src: "/images/work/immobilius/cover.svg",
      alt: "Immobilius lead dashboard",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Leaflet",
      "Anthropic API",
      "Stripe",
      "Vercel",
    ],
    highlights: [
      "Signal engine: funding, hiring, leadership moves",
      "AI lead scoring with explainable reasons",
      "Clustered map of thousands of leads",
      "Subscription billing & daily digests",
    ],
    problem: [
      "Commercial brokers find deals by hearing about them late. By the time a company publicly looks for space, five other brokers already know.",
      "The bet: the intent is visible earlier. A funding round, a spike in job postings, a new COO — these leak months before a lease search. The product had to collect those signals continuously, decide which ones actually matter, and put them somewhere a broker can act on in ten seconds.",
    ],
    build: [
      {
        title: "Signal engine",
        body: [
          "Ingestion routes pull company events on a schedule and normalise them into a single signal table in Postgres — funding rounds, headcount deltas, executive appointments, address changes.",
          "Deduplication happens at write time, so one funding round reported by four sources becomes one signal rather than four leads.",
        ],
      },
      {
        title: "Scoring",
        body: [
          "Each lead gets a score from the combination of its signals, weighted by recency and by how predictive that signal type has been. The model returns a short written reason alongside the number — a score with no explanation is a score nobody trusts.",
        ],
      },
      {
        title: "The map",
        body: [
          "Leads render on a Leaflet map with marker clustering, so a dense downtown does not collapse into an unreadable pile of pins. Filters, the list view and the map stay in sync through a single URL-driven state.",
        ],
      },
    ],
    technical: [
      {
        title: "Idempotent ingestion",
        body: "Every ingestion job can be replayed safely. Re-running yesterday's fetch produces no duplicates.",
      },
      {
        title: "Explainable scoring",
        body: "Every score carries the signals that produced it. Users can audit the reasoning instead of trusting a black box.",
      },
      {
        title: "Clustered geospatial rendering",
        body: "Marker clustering plus viewport-bounded queries keep the map responsive with thousands of leads in play.",
      },
      {
        title: "Cron-backed digests",
        body: "A daily job emails each user only the leads that crossed their threshold since the last run — no dashboard-checking required.",
      },
    ],
    outcome: [
      "The largest thing I have built: roughly 880 source files spanning the ingestion pipeline, the scoring layer, the dashboard, the map and subscription billing.",
    ],
    accent: "#FFA24C",
  },
  {
    slug: "capitalhype",
    name: "CapitalHype",
    tagline: "Content agency site + CV engine",
    summary:
      "A done-for-you content agency for notaries and accountants. A narrative, scroll-driven site with a real-time 3D hero, plus an internal engine that turns a profile into a formatted, downloadable CV.",
    role: "Design & Full-stack",
    year: "2026",
    type: "Marketing site & tool",
    status: "Live",
    liveUrl: null,
    cover: {
      src: "/images/work/capitalhype/cover.webp",
      alt: "CapitalHype Studio landing page for notaries and accounting experts",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Spline",
      "GSAP",
      "Tailwind v4",
    ],
    highlights: [
      "Real-time WebGL hero",
      "GSAP scroll-driven narrative",
      "Profile-to-CV generation",
      "Tiered performance budget",
    ],
    problem: [
      "Notaries and accountants know they should publish. They do not have the time, and the agencies that serve them produce interchangeable filler.",
      "The site had to sell a done-for-you service to a conservative, sceptical audience — which meant it had to look expensive without looking frivolous, and load instantly on a mid-range laptop in an office.",
    ],
    build: [
      {
        title: "3D hero",
        body: [
          "A real-time WebGL scene built with React Three Fiber, gated behind a capability check so it only ever mounts on hardware that can actually run it. Everything else gets a designed CSS fallback, not a blank box.",
        ],
      },
      {
        title: "Scroll narrative",
        body: [
          "GSAP drives a sequence that explains the offer as you scroll: the problem, the process, the deliverable. Each beat is a pinned scene rather than a wall of copy.",
        ],
      },
      {
        title: "CV engine",
        body: [
          "An internal tool that takes a structured profile and produces a formatted CV, handling layout and export so the output is consistent regardless of who fills the form.",
        ],
      },
    ],
    technical: [
      {
        title: "Capability-gated WebGL",
        body: "GPU tier, memory, connection and motion preference are all checked before Three.js is even downloaded.",
      },
      {
        title: "Pinned scroll scenes",
        body: "GSAP ScrollTrigger drives the narrative with a single timeline, keeping scroll behaviour predictable across devices.",
      },
      {
        title: "Deterministic document output",
        body: "CV generation runs off a typed profile schema, so the same input always produces the same document.",
      },
    ],
    outcome: [
      "A marketing site that carries a premium positioning for a traditionally dry sector, plus the internal tooling the service runs on.",
    ],
    accent: "#6E7A94",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
