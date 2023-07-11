/* eslint-disable import/no-extraneous-dependencies */

import react from "@vitejs/plugin-react";
import unpluginJsonDts from "unplugin-json-dts/vite";
import { defineConfig } from "vitest/config";
import { define, getBuildConfig } from "../common/utils/vite-config.utils";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unpluginJsonDts()],
  build: getBuildConfig("H5P.Bildetema"),
  define,
  test: {
    environment: "happy-dom",
  },
});
