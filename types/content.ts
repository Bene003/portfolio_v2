export interface ProjectSection {
  title: string;
  body: string[];
  image?: { src: string; alt: string };
}

/** Case studies earn a page of their own; everything else is listed but not
 *  written up. Keeping both in one array — rather than two — means the work
 *  page, the sitemap and the command palette all stay a single source. */
export type ProjectTier = "case-study" | "listed";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  /** The industry, not the technology. What varies across the portfolio. */
  sector: string;
  role: string;
  year: string;
  type: string;
  status: string;
  liveUrl: string | null;
  /** Absent until a real screenshot exists — a placeholder is drawn instead,
   *  because a fake screenshot is worse than an honest empty frame. */
  cover?: { src: string; alt: string };
  stack: string[];
  tier: ProjectTier;
  /** Pulled onto the home page. Chosen for sector spread, not recency. */
  featured?: boolean;
  /** What the engagement covered. Listed projects only. */
  scope?: string[];
  /** Short punchy facts rendered as a meta grid. Case studies only. */
  highlights?: string[];
  /** Long-form case study content. */
  problem?: string[];
  build?: ProjectSection[];
  technical?: { title: string; body: string }[];
  outcome?: string[];
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

/** Something built for myself rather than for a client. Deliberately not a
 *  `Project`: there is no engagement and no delivery to point at — the honest
 *  unit here is what it does, why it exists and how far it has actually got. */
export interface PersonalProject {
  name: string;
  tagline: string;
  body: string;
  /** Where it really stands. Never "Live" unless it is. */
  status: string;
  year: string;
  stack: string[];
  /** The itch it was built to scratch, not the feature list. */
  why: string;
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
