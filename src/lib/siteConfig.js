const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "gh-pages";
const repoName = "use-case-library";

export const BASE_PATH = isGitHubPages ? `/${repoName}` : "";

export const SITE_URL = isGitHubPages
  ? `https://microsave-consulting.github.io/${repoName}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://digitalidinnovations.com";
//                                        ☝️ replace localhost with real domain
