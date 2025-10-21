/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslint(),
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          return `export default ${JSON.stringify(code)};`;
        }
      },
    },
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
    host: "0.0.0.0",
  },
  preview: {
    allowedHosts: ["rem.idarkq.com"],
    port: 3001,
  },
});
