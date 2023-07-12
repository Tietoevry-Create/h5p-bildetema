import { UserConfig } from "vite";

export declare const defineConfig: (
  name: string,
  testEnvironment: "happy-dom" | "jsdom",
) => UserConfig;
