"use client";

import { m } from "motion/react";

import { fadeUp, popIn, staggerParent, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Scroll-in wrapper. `as="li"` etc. keeps the markup semantic. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/** Parent that staggers any `<RevealItem>` children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerParent(stagger, delay)}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div variants={fadeUp} className={cn(className)}>
      {children}
    </m.div>
  );
}

/** A list whose items pop in one by one. Declared as its own `whileInView`
 *  trigger so it works standalone as well as nested inside a `RevealGroup`. */
export function RevealChips({
  children,
  className,
  stagger = 0.045,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <m.ul
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerParent(stagger)}
      className={className}
    >
      {children}
    </m.ul>
  );
}

export function RevealChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.li variants={popIn} className={cn(className)}>
      {children}
    </m.li>
  );
}
