
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const githubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  vite: {
    base: githubPages ? "/lilac-shape-math/" : "/",
  },

  ...(githubPages
    ? {
        nitro: {
          preset: "github_pages",
        },
      }
    : {}),

  tanstackStart: {
    ...(githubPages
      ? {
          pages: [{ path: "/" }],
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: false,
            crawlLinks: false,
            failOnError: true,
          },
        }
      : {}),
  },
});
