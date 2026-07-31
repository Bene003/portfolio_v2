import Marquee from "@/components/ui/Marquee";
import { marqueeItems } from "@/lib/content";

export default function StackMarquee() {
  return (
    <div className="border-y border-line/70 bg-surface/30 py-5">
      <Marquee items={marqueeItems} />
    </div>
  );
}
