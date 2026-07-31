import Button from "@/components/ui/Button";
import Halo from "@/components/ui/Halo";

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[70svh] place-items-center overflow-hidden py-section">
      <Halo className="top-1/4 left-1/2 size-[26rem] -translate-x-1/2 opacity-40 sm:size-[38rem]" />

      <div className="shell relative z-10 text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-6 text-display">
          <span className="text-gradient-copper">404</span>
        </h1>
        <p className="prose-width mx-auto mt-6 text-lead text-muted">
          This page does not exist — or it shipped somewhere else. Let&apos;s get
          you back to solid ground.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/work" variant="outline">
            See the work
          </Button>
        </div>
      </div>
    </section>
  );
}
