"use client";

import { useEffect } from "react";

/** Locks body scroll while `locked`, compensating for the scrollbar width so
 *  the page does not shift sideways when it disappears. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [locked]);
}
