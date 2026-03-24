// src/app/library/page.js
import { readFileSync } from "fs";
import path from "path";
import { Suspense } from "react";
import UseCaseLibrary from "@/components/UseCaseLibrary";

export const metadata = {
  title: "Use Case Library",
  description:
    "Browse and filter hundreds of real-world Digital ID use cases from around the globe.",
};

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
