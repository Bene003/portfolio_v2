import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

import AmbientBackground from "@/components/layout/AmbientBackground";
import CursorHalo from "@/components/layout/CursorHalo";
import MotionProvider from "@/components/layout/MotionProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SkipLink from "@/components/layout/SkipLink";
import { SITE_URL, site } from "@/lib/site";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  keywords: [
    "web developer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Montréal",
    "portfolio",
    "Eben Kwete",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_CA",
    url: SITE_URL,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07070A",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  sameAs: [site.socials.github, site.socials.linkedin],
  knowsAbout: [
    "Web development",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "E-commerce",
    "UI/UX design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          <SkipLink />
          <AmbientBackground />
          <ScrollProgress />
          <CursorHalo />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
