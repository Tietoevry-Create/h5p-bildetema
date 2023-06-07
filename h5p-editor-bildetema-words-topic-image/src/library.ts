import type { Library } from "h5p-types";

export const library: Library = {
  title: "Bildetema Words Topic Image Editor",
  machineName: "H5PEditor.BildetemaWordsTopicImage",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 61,
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
