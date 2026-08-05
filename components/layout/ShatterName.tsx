"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { playEasterEgg } from "@/lib/easter";
import { site } from "@/lib/site";

const LETTERS = [...site.name];
const SHATTER_DURATION = 1050;

export default function ShatterName() {
  const [shattered, setShattered] = useState<Set<number>>(() => new Set());
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    [],
  );

  function shatter(index: number) {
    if (shattered.has(index) || LETTERS[index] === " ") return;

    setShattered((current) => new Set(current).add(index));
    const timer = setTimeout(() => {
      setShattered((current) => {
        const next = new Set(current);
        next.delete(index);
        return next;
      });
      timers.current.delete(index);
    }, SHATTER_DURATION);
    timers.current.set(index, timer);
  }

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      title="Click a letter to break it"
      className="shatter-name font-display text-lg font-semibold tracking-tight sm:text-xl"
    >
      {LETTERS.map((letter, index) => {
        if (letter === " ") {
          return <span key={index} className="inline-block w-[0.28em]" />;
        }

        const accent = index > site.name.indexOf(" ");
        return (
          <span
            key={`${letter}-${index}`}
            onClick={() => {
              // The click is not swallowed: the letter breaks and the link
              // still navigates home, so the easter egg never costs anyone
              // the only way back from a case study.
              shatter(index);
              // Fire hides its egg here: the letter breaks, and in that world
              // the break catches. Every other world drops this silently.
              playEasterEgg("logo");
            }}
            className={`shatter-letter ${accent ? "text-accent-text" : "text-fg"} ${
              shattered.has(index) ? "is-shattered" : ""
            }`}
          >
            <span className="shatter-letter__glyph">{letter}</span>
            {[1, 2, 3, 4].map((piece) => (
              <span
                key={piece}
                aria-hidden
                className={`shatter-letter__piece shatter-letter__piece--${piece}`}
              >
                {letter}
              </span>
            ))}
          </span>
        );
      })}
    </Link>
  );
}
