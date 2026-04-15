// src/app/use-cases/[id]/page.jsx
// Dynamic route component for individual use case detail pages
// Generates static pages for each use case with SEO metadata

import { readFileSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import UseCaseDetailClient from "@/components/UseCaseDetailClient";
import { SITE_URL } from "@/lib/siteConfig";

// Function to load all use case data from JSON file
function getData() {
  return JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/use_cases.json"),
      "utf-8",
    ),
  );
}

// Generates static parameters for all use case pages during build time
// Returns array of objects with id parameter for each use case
export async function generateStaticParams() {
  return getData().map((uc) => ({ id: String(uc.ID ?? uc.Id) }));
}

// Generates dynamic metadata for each use case page based on the use case data
// Returns SEO metadata including title, description, keywords, and social media tags
export async function generateMetadata({ params }) {
  const { id } = await params;
  const uc = getData().find((item) => String(item.ID ?? item.Id) === id);

  if (!uc) return { title: "Use Case Not Found" };

  const description = uc.Remarks?.trim()
    ? uc.Remarks.slice(0, 160)
    : (uc.Title?.slice(0, 160) ?? "");

  return {
    title: uc.Title,
    description,
    keywords: Array.isArray(uc.KeyTerms) ? uc.KeyTerms : (uc.KeyTerms ?? []),
    alternates: {
      canonical: `${SITE_URL}/use-cases/${id}`,
    },
    openGraph: {
      title: uc.Title,
      description,
      url: `${SITE_URL}/use-cases/${id}`,
      type: "article",
    },
    twitter: {
      title: uc.Title,
      description,
    },
  };
}

// Main component for individual use case pages
// Finds the use case by ID and renders the detail view, or shows 404 if not found
export default async function UseCasePage({ params }) {
  const { id } = await params;
  const uc = getData().find((item) => String(item.ID ?? item.Id) === id);
  if (!uc) notFound();
  return <UseCaseDetailClient useCase={uc} />;
}
