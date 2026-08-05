"use client";

import { playEasterEgg, type EggSpot } from "@/lib/easter";

/** Marks a spot that hides one world's reaction.
 *
 *  Deliberately not a button: the reward is meant to be stumbled upon, and
 *  announcing it as a control would both spoil it and promise an action the
 *  page does not actually perform. Whatever it wraps keeps its own semantics —
 *  a heading stays a heading, a caption stays a caption.
 *
 *  A spot only answers in the world that hides its egg here; everywhere else
 *  the click is dropped by `playEasterEgg`, and the crosshair cursor (set in
 *  `globals.css`, per world) is the only tell that this is the live one. */
export default function SecretSpot({
  spot,
  className,
  children,
}: {
  spot: EggSpot;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      data-spot={spot}
      onClick={() => playEasterEgg(spot)}
      className={`secret-spot ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
