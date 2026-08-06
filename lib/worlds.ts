import type { KeySkill } from "@/lib/skills";
import type { Theme } from "@/lib/theme";

export type WorldStory = {
  /** Short badge shown next to the availability line. */
  focus: string;
  /** The hero subtitle. Same person, different angle. */
  line: string;
  /** Three of the ten key skills, picked to match the angle above. */
  skills: readonly [KeySkill, KeySkill, KeySkill];
};

/** Each world tells one facet of the same profile. Travelling between planets
 *  rewrites the hero copy, so the selector reads as a story rather than a
 *  palette. Fire is the default because it is what the server renders. */
export const WORLD_STORY = {
  fire: {
    focus: "Velocity",
    line: "Web developer crafting fast, considered interfaces, from pixel to production. I design it, I build it, I ship it.",
    skills: [
      "Full-Stack Product Development",
      "Entrepreneurial Thinking",
      "Opportunity Identification",
    ],
  },
  storm: {
    focus: "Real-time",
    line: "I build products that stay alive under load: live data, moving parts, decisions that cannot wait for the next sprint.",
    skills: [
      "Strategic Decision Making",
      "Systems Thinking",
      "AI Product Design",
    ],
  },
  ice: {
    focus: "Precision",
    line: "Every millisecond and every pixel is a choice. I obsess over performance budgets, accessibility and the details nobody is meant to notice.",
    skills: [
      "Systems Thinking",
      "Full-Stack Product Development",
      "Product Strategy",
    ],
  },
  flora: {
    focus: "Growth",
    line: "Shipping is the start, not the finish. I grow products after launch: acquisition loops, retention, and the numbers that prove it worked.",
    skills: [
      "Digital Marketing",
      "Business Strategy",
      "Opportunity Identification",
    ],
  },
  terra: {
    focus: "Foundations",
    line: "Solid ground first: clean architecture, data models that hold up, and systems a team can still move fast in two years from now.",
    skills: [
      "Systems Thinking",
      "Business Strategy",
      "Full-Stack Product Development",
    ],
  },
  water: {
    focus: "Experience",
    line: "I care about how it feels. Flows without friction, interfaces that get out of the way, and journeys people finish without thinking about them.",
    skills: ["AI Product Design", "Product Strategy", "Digital Marketing"],
  },
  nova: {
    focus: "Vision",
    line: "All of it at once: strategy, design, code and growth in one head. That is what I bring to a product team.",
    skills: ["Product Vision", "Product Strategy", "Entrepreneurial Thinking"],
  },
} satisfies Record<Theme, WorldStory>;
