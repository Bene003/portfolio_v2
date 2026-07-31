import type {
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
    body: "I am not a pixel perfectionist — I am a user flow perfectionist. Clean, focused interfaces where every element earns its place, from colour and spacing to layout logic.",
    tags: ["Design systems", "Prototyping", "Motion", "Accessibility"],
  },
  {
    title: "Frontend Development",
    icon: "code",
    body: "I do not just build what looks good — I build what feels right. Structured CSS, deliberate interaction, and animation that carries meaning instead of decorating a page.",
    tags: ["React / Next.js", "TypeScript", "Tailwind", "WebGL"],
  },
  {
    title: "Backend Development",
    icon: "server",
    body: "I like backends that simply work — fast, secure, built to last. Auth, payments, data models and admin logic: the foundation that lets a product scale with confidence.",
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
    period: "2022 — 2024",
    title: "First Missions",
    body: "I built sites for free for people around me, then worked with companies including Tomorro, Favikon and Goodvest. In parallel I shipped a learning platform for students.",
    tags: ["Freelance", "Client work", "Learning platform"],
  },
  {
    period: "2024",
    title: "Bachelor's degree in Web Development",
    body: "Formal validation of the craft — and the point where self-taught instinct met structured computer science: data structures, databases, architecture.",
    tags: ["Computer science", "Databases", "Architecture"],
  },
  {
    period: "2025 — now",
    title: "Shipping products",
    body: "Three products in production: an e-commerce brand, a B2B real-estate SaaS and a content agency platform. Design, code and infrastructure, end to end.",
    tags: ["Next.js", "PostgreSQL", "Product"],
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
    ],
  },
  {
    label: "Tooling",
    items: ["Git", "Vercel", "Turbopack", "ESLint", "Expo", "Claude API"],
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
    body: "Typed, tested and readable. Written so the next person — often future me — can move fast in it.",
  },
  {
    title: "Ship",
    body: "Deployed, measured, iterated. A product that is not in production is a prototype.",
  },
];

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Years writing code" },
  { value: 3, suffix: "", label: "Products in production" },
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
  "Three.js",
  "Node.js",
  "React Native",
  "Python",
  "Vercel",
];
