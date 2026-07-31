import { cn } from "@/lib/utils";

/** Chrome-like frame around a project screenshot. Decorative — the URL is
 *  hidden from assistive tech since the real link sits in the content column. */
export default function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass overflow-hidden p-0 shadow-lift",
        className,
      )}
    >
      <div
        aria-hidden
        className="flex items-center gap-3 border-b border-line/70 bg-surface-2/50 px-4 py-3"
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
        </span>
        <span className="truncate rounded-pill bg-bg/60 px-3 py-1 font-mono text-[0.6875rem] text-muted">
          {url}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
