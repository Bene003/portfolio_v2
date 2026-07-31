"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** False during SSR and the first client render — use it to gate anything
 *  that reads from the browser, so hydration never mismatches. */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
