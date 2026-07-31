"use client";

import { ArrowUpRight, Download } from "lucide-react";

import { useMontrealTime } from "@/hooks/useMontrealTime";
import CopyEmail from "@/components/ui/CopyEmail";
import Halo from "@/components/ui/Halo";
import { Reveal } from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { site } from "@/lib/site";

import ContactForm from "./ContactForm";

export default function Contact() {
  const time = useMontrealTime();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grain relative overflow-hidden py-section"
    >
      <Halo className="-bottom-56 left-1/2 size-[34rem] -translate-x-1/2 opacity-50 sm:size-[48rem]" />

      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">07</span>
            <span aria-hidden className="h-px w-8 bg-line sm:w-12" />
            <span>Contact</span>
          </p>
        </Reveal>

        <h2 id="contact-title" className="mt-6 max-w-4xl text-h1">
          <SplitText text="Let's build something" animateOnView stagger={0.05} />{" "}
          <SplitText
            text="worth shipping."
            animateOnView
            stagger={0.05}
            delay={0.12}
            wordClassName="text-gradient-copper"
          />
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Freelance projects, product work or a full-time role — if you are
            building something that has to actually ship, I want to hear about
            it.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:gap-12">
          <Reveal delay={0.16}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.22}>
            <div className="lg:pt-3">
              <p className="eyebrow">Prefer email?</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Send a note directly or copy the address. Either way, it lands
                in the same inbox.
              </p>
              <div className="mt-6">
                <CopyEmail />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.28}>
          <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-sm text-muted">
              <span
                aria-hidden
                className="size-2 animate-pulse-soft rounded-full bg-emerald-400/80 motion-reduce:animate-none"
              />
              {site.availabilityLabel}
              <span aria-hidden className="text-line">
                ·
              </span>
              <span className="font-mono text-xs tracking-[0.1em]">
                {time ? `${time} in Montréal` : "\u00A0"}
              </span>
            </p>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { href: site.socials.github, label: "GitHub", external: true },
                {
                  href: site.socials.linkedin,
                  label: "LinkedIn",
                  external: true,
                },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover-fine:text-fg"
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover-fine:-translate-y-0.5 group-hover-fine:translate-x-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resume}
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover-fine:text-fg"
                >
                  <Download aria-hidden className="size-3.5" />
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
