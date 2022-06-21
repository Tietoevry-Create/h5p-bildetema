import type { OutputAsset, OutputChunk } from "rollup";
import { BuildOptions, PluginOption } from "vite";

const isOutputChunk = (
  chunkOrAsset: OutputChunk | OutputAsset,
): chunkOrAsset is OutputChunk => {
  return "code" in chunkOrAsset;
};

export const wrapIIFE = (): PluginOption => ({
  name: "wrap-iife",
  generateBundle(options, bundle) {
    const chunks = Object.values(bundle);

    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      if (isOutputChunk(chunk)) {
        // eslint-disable-next-line no-param-reassign
        chunk.code = `(function(){${chunk.code}})()`;
      }
    }
  },
});

export const getBuildConfig = (): BuildOptions => ({
  minify: "esbuild",

  rollupOptions: {
    input: "src/index.tsx",
    output: {
      file: "dist/bundle.js",
      dir: undefined,
      inlineDynamicImports: true,
      manualChunks: undefined,
      assetFileNames: assetInfo => {
        if (assetInfo.name === "index.css") {
          return "main.css";
        }

        return assetInfo.name ?? "";
      },
      esModule: false,
      format: "iife",
    },
  },

  target: "es6",
});
