import { defineConfig as defineViteConfig } from "vite";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

const githubPages = process.env.GITHUB_PAGES === "true";

export default defineViteConfig(async (env) => {
  const config = await defineLovableConfig({
    vite: {
      base: githubPages ? "/lilac-shape-math/" : "/",
    },
    tanstackStart: {
      server: {
        entry: "server",
      },
      ...(githubPages
        ? {
            prerender: {
              enabled: true,
              autoStaticPathsDiscovery: false,
              crawlLinks: false,
              failOnError: true,
            },
          }
        : {}),
    },
    // The wrapper installs its own Nitro plugin. Disable it here so we can
    // attach exactly one Nitro instance with the GitHub Pages static preset.
    // @ts-expect-error Nitro is supported by the wrapper at runtime.
    nitro: false,
  })(env);

  if (githubPages && env.command === "build") {
    config.plugins = [
      ...(config.plugins ?? []),
      nitro({ preset: "github_pages" }),
    ];
  }

  return config;
});
