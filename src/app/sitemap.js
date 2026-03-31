// src/app/sitemap.js
import { readFileSync } from "fs";
import path from "path";
import { SITE_URL } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function sitemap() {
  const data = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/use_cases.json"),
      "utf-8",
    ),
  );

  const now = new Date();

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/library`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hackathon`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const useCaseRoutes = data.map((uc) => {
    const id = uc.ID ?? uc.Id;
    const rawDate = uc.Modified ?? null;
    const lastModified =
      rawDate && !isNaN(new Date(rawDate)) ? new Date(rawDate) : now;

    return {
      url: `${SITE_URL}/use-cases/${id}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...useCaseRoutes];
}
