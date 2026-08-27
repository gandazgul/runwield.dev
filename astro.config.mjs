import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://runwield.dev",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
