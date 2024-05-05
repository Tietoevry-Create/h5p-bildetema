// @ts-check

import react from "@vitejs/plugin-react";
import unpluginJsonDts from "unplugin-json-dts/vite";

/**
 * @param {string} libName
 * @returns {import("vite").UserConfig["build"]}
 */
const getBuildConfig = libName => ({
  minify: "esbuild",

  lib: {
    entry: "src/index.tsx",
    formats: ["iife"],
    name: libName,
    fileName: () => `bundle.js`,
  },

  rollupOptions: {
    output: {
      assetFileNames: assetInfo => {
        // For some reason, an H5P content type's style file cannot be named `style.css`.
        // Therefore we need to change the name before saving it.
        if (assetInfo.name === "style.css") {
          return `main.css`;
        }

        return assetInfo.name ?? "";
      },
    },
  },

  target: "es6",
});

const define = {
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
};

/**
 * @param {string} name
 * @param {"happy-dom" | "jsdom"} testEnvironment
 */
export const defineConfig = (name, testEnvironment) => ({
  plugins: [react(), unpluginJsonDts()],
  build: getBuildConfig(name),
  define,
  test: {
    environment: testEnvironment,
  },
});
