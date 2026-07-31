import { NextRequest } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;

const attempts = new Map<string, { count: number; expiresAt: number }>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);

  if (!current || current.expiresAt <= now) {
    attempts.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return Response.json({ message: "Invalid request." }, { status: 415 });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return Response.json(
      { message: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field. Return success so they do not retry.
  if (clean(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160).toLowerCase();
  const subject = clean(payload.subject, 120);
  const message = clean(payload.message, 5000);

  if (
    name.length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    subject.length < 3 ||
    message.length < 20
  ) {
    return Response.json(
      { message: "Please complete every field with valid information." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Contact form: BREVO_API_KEY is not configured.");
    return Response.json(
      { message: "Email delivery is not configured yet. Please email me directly." },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const destination = process.env.CONTACT_TO_EMAIL ?? "kweteeben@gmail.com";
  const senderEmail = process.env.BREVO_FROM_EMAIL ?? "kweteeben@gmail.com";
  const senderName = process.env.BREVO_FROM_NAME ?? "Eben Kwete Portfolio";

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: destination }],
      replyTo: { email, name },
      subject: `[Portfolio] ${subject}`,
      textContent: `New portfolio enquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      htmlContent: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#18181b">
          <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#ff6a2b">New portfolio enquiry</p>
          <h1 style="font-size:26px;margin:12px 0 24px">${safeSubject}</h1>
          <table style="width:100%;margin-bottom:24px;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#71717a">Name</td><td style="padding:8px 0">${safeName}</td></tr>
            <tr><td style="padding:8px 0;color:#71717a">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          </table>
          <div style="padding:20px;border-radius:12px;background:#f4f4f5;line-height:1.65">${safeMessage}</div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const providerError = await response.text();
    console.error("Contact form: Brevo rejected the email.", providerError);
    return Response.json(
      { message: "The message could not be delivered. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
