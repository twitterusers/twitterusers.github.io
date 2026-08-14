import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Absolute base. This repo is meant to be published as a GitHub Pages
// project site, served at the domain root, so "/" resolves correctly
// for the built assets and for the JSON data file fetched at runtime.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
