export type ProjectSlug = "elyra" | "immobilius" | "capitalhype";

export interface ProjectSection {
  title: string;
  body: string[];
  image?: { src: string; alt: string };
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  tagline: string;
  summary: string;
  role: string;
  year: string;
  type: string;
  status: string;
  liveUrl: string | null;
  cover: { src: string; alt: string };
  stack: string[];
  /** Short punchy facts rendered as a meta grid on the home page. */
  highlights: string[];
  /** Long-form case study content. */
  problem: string[];
  build: ProjectSection[];
  technical: { title: string; body: string }[];
  outcome: string[];
  accent: string;
}

export interface Service {
  title: string;
  icon: "pen" | "code" | "server";
  body: string;
  tags: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  body: string;
  tags: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}
