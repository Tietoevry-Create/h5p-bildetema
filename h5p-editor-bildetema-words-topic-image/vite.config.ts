/* eslint-disable import/no-extraneous-dependencies */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { define, getBuildConfig } from "../common/utils/vite-config.utils";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: getBuildConfig("H5P.BildetemaWordsTopicImage"),
  define,
  test: {
    environment: "happy-dom",
  },
});
