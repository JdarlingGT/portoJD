import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { imagetools } from 'vite-imagetools';
import htmlConfig from 'vite-plugin-html-config';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    htmlConfig({
      title: "Jacob Darling — Creative Strategist & Systems Architect",
      metas: [
        { name: "description", content: "Portfolio of Jacob Darling — blending marketing, automation, and storytelling." },
        { property: "og:title", content: "Jacob Darling Portfolio" },
        { property: "og:image", content: "/assets/personal logo and bio pics/jd logo .png" },
        { property: "og:type", content: "website" },
        { name: "theme-color", content: "#0F0F0F" }
      ]
    }),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
