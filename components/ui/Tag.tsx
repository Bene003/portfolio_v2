import { cn } from "@/lib/utils";

export default function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-line/80 bg-surface-2/60 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
