import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches FormaFácil at the GitHub Pages repository base", () => {
    const router = createRouter({
      routeTree,
      basepath: "/lilac-shape-math/",
      history: createMemoryHistory({ initialEntries: ["/lilac-shape-math/"] }),
      context: { queryClient: new QueryClient() },
    });

    const location = router.parseLocation();
    expect(location.pathname).toBe("/");
    expect(router.matchRoutes(location.pathname).at(-1)?.routeId).toBe("/");
    expect(router.buildLocation({ to: "/" }).publicHref).toBe("/lilac-shape-math/");
  });

  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
