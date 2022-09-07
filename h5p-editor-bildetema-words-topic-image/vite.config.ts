import react from "@vitejs/plugin-react";
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
