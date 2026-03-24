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
  return [
    { url: SITE_URL, priority: 1.0 },
    {
      url: `${SITE_URL}/library`,
      priority: 0.9,
      changeFrequency: "daily",
    },
    ...data.map((uc) => ({
      url: `${SITE_URL}/use-cases/${uc.ID ?? uc.Id}`,
      lastModified: new Date(uc.Modified ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
