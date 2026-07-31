import { cn } from "@/lib/utils";

/** Purely decorative copper/cool bloom. Always aria-hidden. */
export default function Halo({
  tone = "copper",
  className,
}: {
  tone?: "copper" | "cool";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "halo",
        tone === "copper" ? "halo-copper" : "halo-cool",
        className,
      )}
    />
  );
}
