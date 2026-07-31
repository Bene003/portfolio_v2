export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-pill bg-accent px-5 py-3 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
    >
      Skip to content
    </a>
  );
}
