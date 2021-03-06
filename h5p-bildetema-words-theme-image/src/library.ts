import type { Library } from "h5p-types";

export const library: Library = {
  title: "H5P Bildetema Topic Image View",
  machineName: "H5P.BildetemaTopicImageView",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 0,
  runnable: 0,
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
