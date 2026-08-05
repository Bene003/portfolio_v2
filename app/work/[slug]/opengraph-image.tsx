import { ImageResponse } from "next/og";

import { caseStudies, getProject } from "@/lib/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export const alt = "Case study";

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#07070A",
          color: "#F5F3F0",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${
              project?.accent ?? "#FF6A2B"
            }55 0%, transparent 68%)`,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8A8681",
          }}
        >
          <span>Case study · {project?.type ?? "Project"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>
            {project?.name ?? "Work"}
          </div>
          <div
            style={{
              fontSize: 40,
              color: project?.accent ?? "#FFA24C",
              display: "flex",
            }}
          >
            {project?.tagline ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #1F1F28",
            paddingTop: 28,
            fontSize: 24,
            color: "#8A8681",
          }}
        >
          <div style={{ display: "flex" }}>Eben Kwete</div>
          <div style={{ display: "flex" }}>{project?.year ?? ""}</div>
        </div>
      </div>
    ),
    size,
  );
}
