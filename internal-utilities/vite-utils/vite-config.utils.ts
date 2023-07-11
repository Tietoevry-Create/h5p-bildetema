import { BuildOptions } from "vite";
import react from "@vitejs/plugin-react";
import unpluginJsonDts from "unplugin-json-dts/vite";

export const getBuildConfig = (libName: string): BuildOptions => ({
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

export const define = {
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
};

export const defineConfig = (
  name: string,
  testEnvironment: "happy-dom" | "jsdom",
) => ({
  plugins: [react(), unpluginJsonDts()],
  build: getBuildConfig(name),
  define,
  test: {
    environment: testEnvironment,
  },
});
