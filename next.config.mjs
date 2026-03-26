/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "gh-pages";
const repoName = "use-case-library";

const nextConfig = {
  images: {
    unoptimized: isGitHubPages,
  },
  ...(isGitHubPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
};

export default nextConfig;
