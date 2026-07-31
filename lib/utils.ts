import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "1" -> "01" — used for the mono section/project indices. */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}
