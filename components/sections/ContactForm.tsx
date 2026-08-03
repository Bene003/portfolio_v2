"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass =
  "min-h-12 w-full rounded-xl border border-line bg-bg/50 px-4 text-sm text-fg outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-muted/55 hover-fine:border-fg/15 focus:border-accent-text/55 focus:bg-bg/75 focus:ring-4 focus:ring-accent-text/8";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback("Sending your message…");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "The message could not be sent.");
      }

      form.reset();
      setStatus("success");
      setFeedback("Message received. I’ll get back to you shortly.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass relative overflow-hidden p-5 sm:p-7 lg:p-8"
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-56 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="eyebrow text-fg/60">Your name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </label>

        <label className="grid gap-2">
          <span className="eyebrow text-fg/60">Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="eyebrow text-fg/60">What can I help with?</span>
          <input
            name="subject"
            type="text"
            required
            minLength={3}
            maxLength={120}
            placeholder="A new website, product or collaboration"
            className={inputClass}
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="eyebrow text-fg/60">Tell me about the project</span>
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={5000}
            rows={6}
            placeholder="A little context, your goals, timing and budget…"
            className={`${inputClass} resize-y py-3.5 leading-relaxed`}
          />
        </label>

        {/* Honeypot: humans never see or fill this field. */}
        <label className="absolute -left-[9999px]" aria-hidden="true">
          Company website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className={`flex min-h-5 items-center gap-2 text-sm ${
            status === "success"
              ? "text-emerald-400"
              : status === "error"
                ? "text-red-400"
                : "text-muted"
          }`}
        >
          {status === "success" && <CheckCircle2 className="size-4 shrink-0" aria-hidden />}
          {status === "error" && <AlertCircle className="size-4 shrink-0" aria-hidden />}
          {status === "idle" ? "Usually replies within 1–2 business days." : feedback}
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-pill bg-accent px-7 text-sm font-medium text-on-accent shadow-glow transition-colors duration-300 hover-fine:bg-accent-2 disabled:cursor-wait disabled:opacity-65"
        >
          <span className="absolute inset-y-0 -left-1/2 w-1/3 -translate-x-[120%] skew-x-[-18deg] bg-fg/25 blur-md transition-transform duration-700 group-hover-fine/btn:translate-x-[320%] motion-reduce:hidden" />
          <span className="relative z-10 inline-flex items-center gap-2">
            {status === "sending" ? (
              <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
            ) : (
              <Send className="size-4" aria-hidden />
            )}
            {status === "sending" ? "Sending…" : "Send message"}
          </span>
        </button>
      </div>
    </form>
  );
}
