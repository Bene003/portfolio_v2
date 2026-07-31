"use client";

import { useEffect, useState } from "react";

import { site } from "@/lib/site";

const formatter = new Intl.DateTimeFormat("en-CA", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: site.timezone,
});

/** Live local time in Montréal. Null until mounted, so SSR and the client
 *  never disagree. */
export function useMontrealTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
