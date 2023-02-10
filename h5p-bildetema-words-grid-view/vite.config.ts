// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vitest/config";
import { getBuildConfig } from "../common/utils/vite-config.utils";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: getBuildConfig("H5P.BildetemaWordsGridView"),
  test: {
    environment: "happy-dom",
  },
});
