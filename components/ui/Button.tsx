import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-pill px-6 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-text";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-glow hover-fine:bg-accent-2 active:scale-[0.98]",
  outline:
    "border border-line text-fg hover-fine:border-accent/45 hover-fine:text-accent-text",
  ghost: "px-2 text-muted hover-fine:text-fg",
};

/** Diagonal light sweep — only on primary, only on fine pointers. */
function Shimmer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden motion-safe:block"
    >
      <span className="absolute inset-y-0 -left-1/2 w-1/3 -translate-x-[120%] skew-x-[-18deg] bg-fg/25 blur-md transition-transform duration-700 ease-[var(--ease-expo)] group-hover-fine/btn:translate-x-[320%]" />
    </span>
  );
}

interface ButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  variant?: Variant;
  external?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {variant === "primary" && <Shimmer />}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
