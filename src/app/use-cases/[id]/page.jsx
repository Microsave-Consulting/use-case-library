import { readFileSync } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import UseCaseDetailClient from "@/components/UseCaseDetailClient";
import { SITE_URL } from "@/lib/siteConfig";

function getData() {
  return JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/use_cases.json"),
      "utf-8",
    ),
  );
}

export async function generateStaticParams() {
  return getData().map((uc) => ({ id: String(uc.ID ?? uc.Id) }));
}

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

export default async function UseCasePage({ params }) {
  const { id } = await params;
  const uc = getData().find((item) => String(item.ID ?? item.Id) === id);
  if (!uc) notFound();
  return <UseCaseDetailClient useCase={uc} />;
}
