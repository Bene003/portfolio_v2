import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        {/* copper bloom */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -140,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,106,43,0.42) 0%, rgba(255,106,43,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#FF6A2B",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8A8681",
            }}
          >
            <span>{site.location}</span>
            <span>·</span>
            <span>{site.role}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#8A8681",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Designing and shipping complete products — e-commerce, B2B SaaS and
            real-time interfaces.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1F1F28",
            paddingTop: 28,
            fontSize: 24,
            color: "#8A8681",
          }}
        >
          <div style={{ display: "flex" }}>eben.live</div>
          <div style={{ display: "flex", color: "#FFA24C" }}>
            Available for new projects
          </div>
        </div>
      </div>
    ),
    size,
  );
}
