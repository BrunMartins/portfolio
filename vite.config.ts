import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Preload the fonts the first screen uses, so a hard reload doesn't flash the
// fallback font while the stylesheet is still being read. Build only: the
// file names carry content hashes that only exist in the bundle.
const PRELOAD_FONTS = [
  /montserrat-latin-700-normal-.*\.woff2$/,
  /montserrat-latin-600-normal-.*\.woff2$/,
  /open-sans-latin-400-normal-.*\.woff2$/,
  /open-sans-latin-600-normal-.*\.woff2$/,
];

function preloadFonts(): Plugin {
  let base = "/";
  return {
    name: "preload-fonts",
    apply: "build",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml(_html, ctx) {
      const files = Object.keys(ctx.bundle ?? {});
      return PRELOAD_FONTS.flatMap((pattern) => files.filter((f) => pattern.test(f))).map((file) => ({
        tag: "link",
        attrs: { rel: "preload", href: base + file, as: "font", type: "font/woff2", crossorigin: "" },
        injectTo: "head-prepend" as const,
      }));
    },
  };
}

// BASE_PATH is set by the deploy workflow: "/portfolio/" on the default
// GitHub Pages address, "/" once a custom domain is configured.
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
