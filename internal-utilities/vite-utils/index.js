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
        const isCssFile = assetInfo.names?.every(name => name.endsWith(".css"));
        if (isCssFile) {
          return "main.css";
        }

        return assetInfo.names?.[0] ?? "";
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
