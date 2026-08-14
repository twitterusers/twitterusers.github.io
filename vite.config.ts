import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This repo is published as a GitHub Pages project site, served at
// https://junipersolstice.github.io/xyz/, so the base must match the
// repo name for built assets and the runtime JSON fetch to resolve.
export default defineConfig({
  base: "/xyz/",
  plugins: [react()],
});
