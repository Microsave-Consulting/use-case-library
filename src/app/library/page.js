// src/app/library/page.js
import { readFileSync } from "fs";
import path from "path";
import { Suspense } from "react";
import UseCaseLibrary from "@/components/UseCaseLibrary";

export const metadata = {
  title: "Digital ID Use Case Library",
  description:
    "Browse a comprehensive library of digital identity use cases across banking, healthcare, agriculture, government, and education. A global research platform for digital ID innovation.",
  keywords: [
    "Digital identity in banking",
    "eKYC digital identity",
    "Identity verification fintech",
    "Digital ID in agriculture",
    "Digital ID in climate",
    "Digital ID in healthcare systems",
    "Patient identity management digital",
    "Digital identity for government services",
    "E-governance identity systems",
    "Digital ID for welfare schemes",
    "Identity in social protection programs",
    "Digital identity in education systems",
    "Digital identity case study platform",
    "Digital ID knowledge repository",
    "Identity innovation library",
    "Digital identity research platform",
  ],
  openGraph: {
    title:
      "Digital ID Use Case Library | Digital ID Use Cases & Innovation Platform",
    description:
      "Browse a comprehensive library of digital identity use cases across banking, healthcare, agriculture, government, and education. A global research platform for digital ID innovation.",
    url: "https://www.digitalidinnovations.com/library",
  },
  twitter: {
    title:
      "Digital ID Use Case Library | Digital ID Use Cases & Innovation Platform",
    description:
      "Browse a comprehensive library of digital identity use cases across banking, healthcare, agriculture, government, and education. A global research platform for digital ID innovation.",
  },
  alternates: {
    canonical: "https://www.digitalidinnovations.com/library",
  },
};

// Function to load use case data, filter configuration, and static filter options
// Returns an object with useCases array, filterConfig object, and staticOptions object
function getData() {
  const useCases = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/use_cases.json"),
      "utf-8",
    ),
  );
  const filterConfig = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/filter_config.json"),
      "utf-8",
    ),
  );
  const staticOptions = JSON.parse(
    readFileSync(
      path.join(process.cwd(), "public/data/filter_options.json"),
      "utf-8",
    ),
  );
  return { useCases, filterConfig, staticOptions };
}

// Main library page component that renders the use case library
// Loads data and passes it to the client-side UseCaseLibrary component with Suspense boundary
export default function LibraryPage() {
  const { useCases, filterConfig, staticOptions } = getData();

  return (
    <Suspense fallback={<div>Loading library...</div>}>
      <UseCaseLibrary
        initialData={useCases}
        filterConfig={filterConfig}
        staticOptions={staticOptions}
      />
    </Suspense>
  );
}
