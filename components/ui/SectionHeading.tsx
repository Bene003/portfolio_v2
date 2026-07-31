import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line sm:w-12" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 id={id} className="text-h2 max-w-3xl">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-lead text-muted prose-width",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
