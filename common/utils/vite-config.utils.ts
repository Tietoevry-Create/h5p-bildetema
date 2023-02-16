import { BuildOptions } from "vite";

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
  "process.env.NODE_ENV": JSON.stringify("production"),
};
