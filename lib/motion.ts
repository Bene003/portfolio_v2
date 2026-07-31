import type { Transition, Variants } from "motion/react";

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.22, 0.61, 0.36, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 20,
  mass: 0.6,
};

/** Standard scroll-in reveal. Pair with `whileInView` + `viewportOnce`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE_SOFT } },
};

/** Tighter reveal for small repeated elements (tags, chips) where a full
 *  28px rise would look like the list is falling into place. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_EXPO },
  },
};

export const staggerParent = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** A single masked word/line sliding up from below its own box. */
export const maskedRise: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
