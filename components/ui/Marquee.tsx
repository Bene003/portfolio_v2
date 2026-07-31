import { cn } from "@/lib/utils";

/** Pure-CSS infinite ticker: the list is rendered twice and translated -50%.
 *  No JS, no layout thrash, pauses under prefers-reduced-motion. */
export default function Marquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  const row = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li
          key={`${key}-${item}`}
          className="flex items-center gap-6 px-6 font-mono text-[0.75rem] tracking-[0.16em] text-muted uppercase sm:gap-8 sm:px-8"
        >
          {item}
          <span aria-hidden className="size-1 rotate-45 bg-accent/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden
      className={cn("edge-fade relative w-full overflow-hidden", className)}
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
