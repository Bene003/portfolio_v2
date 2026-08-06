export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eben.live";

export const site = {
  name: "Eben Kwete",
  initials: "EK",
  role: "Web Developer",
  title: "Eben Kwete — Web Developer",
  description:
    "Web developer based in Montréal. I design and ship complete products: e-commerce, B2B SaaS and real-time interfaces, built with Next.js, TypeScript and PostgreSQL.",
  location: "Montréal, QC",
  timezone: "America/Toronto",
  email: "kweteeben@gmail.com",
  available: true,
  availabilityLabel: "Available for new projects",
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  resume: "/resume/Eben-Kwete-CV.pdf",
} as const;

export const nav = [
  { label: "Home", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Journey", href: "/#journey" },
  { label: "Lab", href: "/#lab" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Section ids observed for the active-nav indicator, in document order. */
export const sectionIds = [
  "top",
  "work",
  "about",
  "services",
  "journey",
  "lab",
  "contact",
] as const;
