import { BuildOptions, PluginOption } from "vite";

export const wrapIIFE = (): PluginOption => ({
  name: "wrap-iife",
  generateBundle(options, bundle) {
    const chunks = Object.values(bundle);

    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      const isOutputChunk =  "code" in chunk;
      if (isOutputChunk) {
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
      esModule: false,
      format: "iife",
    },
  },

  target: "es6",
});
