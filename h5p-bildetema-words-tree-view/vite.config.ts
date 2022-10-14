// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vitest/config";
import { getBuildConfig, wrapIIFE } from "../common/utils/vite-config.utils";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error import("vitest/config").defineConfig["plugins"] is not typed correctly
  plugins: [react(), wrapIIFE()],
  build: getBuildConfig(),
  test: {
    environment: "happy-dom",
  },
});
