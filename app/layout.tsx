import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

import AmbientBackground from "@/components/layout/AmbientBackground";
import CursorHalo from "@/components/layout/CursorHalo";
import MotionProvider from "@/components/layout/MotionProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SkipLink from "@/components/layout/SkipLink";
import ThemeShockwave from "@/components/theme/ThemeShockwave";
import WorldEffects from "@/components/theme/WorldEffects";
import WorldPulse from "@/components/theme/WorldPulse";
import WorldUnlock from "@/components/theme/WorldUnlock";
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
};

const themeBootScript = `(function(){var t="fire",v=null;try{v=localStorage.getItem("portfolio-theme");if(v==="dark"||v==="copper")v="fire";if(v==="light"||v==="earth")v="storm";if(v==="fire"||v==="storm"||v==="ice"||v==="flora"||v==="terra"||v==="water"||v==="nova"){t=v;localStorage.setItem("portfolio-theme",t)}}catch(e){}var c={fire:"#07070a",storm:"#050914",ice:"#04111f",flora:"#06130c",terra:"#160d08",water:"#020b1d",nova:"#0a0616"};var r=document.documentElement,n=navigator,k=n.connection||{},q=window.matchMedia&&window.matchMedia("(pointer: coarse)").matches,l=!!k.saveData||(n.deviceMemory&&n.deviceMemory<=4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4)||q;r.dataset.theme=t;r.dataset.effects=l?"lite":"full";r.style.colorScheme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c[t])})()`;

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
      data-theme="fire"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#07070a" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          <SkipLink />
          <ThemeShockwave />
          <WorldPulse />
          <AmbientBackground />
          <WorldEffects />
          <WorldUnlock />
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
