// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";
// `vitest` is included in the root package
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vitest/config";
import { getBuildConfig, wrapIIFE } from "../common/utils/vite-config.utils";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wrapIIFE()],
  build: getBuildConfig(),
  test: {
    environment: "happy-dom",
  },
});
