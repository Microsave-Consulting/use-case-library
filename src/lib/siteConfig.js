// // src/lib/siteConfig.js

// const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "gh-pages";
// // This repo IS the user/org Pages site (microsave-consulting.github.io),
// // so it's served at the root — no subpath prefix needed.
// const repoName = "";

// export const BASE_PATH = isGitHubPages && repoName ? `/${repoName}` : "";

// export const SITE_URL = isGitHubPages
//   ? `https://microsave-consulting.github.io`
//   : process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalidinnovations.com";
// //                                        ☝️ replace localhost with real domain

// src/lib/siteConfig.js

// Configuration constants for site deployment and URLs
// BASE_PATH: Subpath for subdirectory deployments (empty for root domain)
// SITE_URL: Main domain URL used for canonical links and metadata

export const BASE_PATH = "";
export const SITE_URL = "https://www.digitalidinnovations.com";
