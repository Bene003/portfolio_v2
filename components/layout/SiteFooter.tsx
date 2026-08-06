import Link from "next/link";

import SecretSpot from "@/components/easter/SecretSpot";
import { nav, site } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="shell flex flex-col gap-10 py-12 pb-[max(3rem,env(safe-area-inset-bottom))] lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <Link href="/" className="font-display text-xl font-semibold">
            <SecretSpot spot="wordmark">
              {site.name.split(" ")[0]}
              <span className="text-accent-text">
                {site.name.split(" ")[1]}
              </span>
            </SecretSpot>
          </Link>
          {/* Four inert lines of this footer each hide one world's egg. They
              are wrapped rather than made into buttons so the footer still
              reads as a footer, see `components/easter/SecretSpot.tsx`. The
              wordmark is the exception: it stays a link, and the egg rides
              along without swallowing the click. */}
          <p className="text-sm text-muted">
            <SecretSpot spot="identity">
              {site.role} · {site.location}
            </SecretSpot>
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="eyebrow">
            <SecretSpot spot="navigate">Navigate</SecretSpot>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover-fine:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="eyebrow">
            <SecretSpot spot="elsewhere">Elsewhere</SecretSpot>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover-fine:text-fg"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover-fine:text-fg"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted transition-colors hover-fine:text-fg"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell border-t border-line/60 py-6 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
        <p>
          <SecretSpot spot="copyright">
            © {year} {site.name}
          </SecretSpot>
        </p>
      </div>
    </footer>
  );
}
