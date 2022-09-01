import { BuildOptions } from "vite";

export const getBuildConfig = (): BuildOptions => ({
  minify: "esbuild",

  rollupOptions: {
    input: "src/index.tsx",
    output: {
      file: "dist/bundle.js",
      dir: undefined,
      esModule: false,
      format: "iife",
    },
  },

  target: "es6",
});
