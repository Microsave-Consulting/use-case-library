// src/app/page.js
import { readFileSync } from "fs";
import path from "path";
import MapPageClient from "@/components/MapPageClient";

export const metadata = {
  title: "Digital ID Use Cases & Innovation Platform",
  description:
    "Explore real-world digital identity use cases across countries and sectors. Discover how digital ID powers public services, finance, healthcare, and innovation through regional, continental and national hackathons.",
  keywords: [
    "Digital ID use cases",
    "Digital identity systems",
    "Digital identity innovation",
    "Digital ID applications",
    "Digital identity platform",
    "Digital public infrastructure digital identity",
    "Identity systems across countries",
    "Digital identity solutions",
    "Real-world digital identity use cases",
    "Examples of digital ID in different countries",
    "How digital identity systems are used globally",
    "Digital ID applications in banking, healthcare, and government",
    "Use cases of Aadhaar-like systems",
    "Digital identity for public service delivery",
    "Digital ID in developing countries",
    "Digital ID in the global south",
    "Digital identity implementation case studies",
  ],
  openGraph: {
    title: "Digital ID Use Cases & Innovation Platform",
    description:
      "Explore real-world digital identity use cases across countries and sectors. Discover how digital ID powers public services, finance, healthcare, and innovation through regional, continental and national hackathons.",
    url: "https://yoursite.com",
  },
  twitter: {
    title: "Digital ID Use Cases & Innovation Platform",
    description:
      "Explore real-world digital identity use cases across countries and sectors. Discover how digital ID powers public services, finance, healthcare, and innovation through regional, continental and national hackathons.",
  },
  alternates: {
    canonical: "https://yoursite.com",
  },
};

function getData() {
  const useCases = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/use_cases.json"),
      "utf-8",
    ),
  );
  const hackathons = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/hackathons_2.json"),
      "utf-8",
    ),
  );
  return { useCases, hackathons };
}

export default function HomePage() {
  const { useCases, hackathons } = getData();
  return (
    <MapPageClient initialUseCases={useCases} initialHackathons={hackathons} />
  );
}
