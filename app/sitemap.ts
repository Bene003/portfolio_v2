import type { MetadataRoute } from "next";

import { caseStudies } from "@/lib/content/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
