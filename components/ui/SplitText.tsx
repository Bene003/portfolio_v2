"use client";

import { m } from "motion/react";

import { maskedRise, staggerParent, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Word-by-word rise from behind a mask. Each word keeps its own box so the
 *  text still wraps and selects normally. */
export default function SplitText({
  text,
  className,
  wordClassName,
  stagger = 0.07,
  delay = 0,
  animateOnView = false,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  animateOnView?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const MotionTag = m[Tag];

  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      {...(animateOnView
        ? { whileInView: "show", viewport: viewportOnce }
        : { animate: "show" })}
      variants={staggerParent(stagger, delay)}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
        >
          <m.span
            variants={maskedRise}
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </m.span>
        </span>
      ))}
    </MotionTag>
  );
}
