import type { Library } from "h5p-types";

export const library: Library = {
  title: "H5P Bildetema",
  machineName: "H5P.Bildetema",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 0,
  runnable: 1,
  preloadedJs: [
    {
      path: "dist/bundle.js",
    },
  ],
  preloadedCss: [
    {
      path: "dist/main.css",
    },
  ],
};
