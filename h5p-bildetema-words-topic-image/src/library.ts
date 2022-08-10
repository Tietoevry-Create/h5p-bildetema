import type { Library } from "h5p-types";

export const library: Library = {
  title: "H5P Bildetema Topic Image View",
  machineName: "H5P.BildetemaTopicImageView",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 5,
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
  editorDependencies: [
    {
      machineName: "H5PEditor.BildetemaWordsTopicImage",
      majorVersion: 1,
      minorVersion: 0,
    },
  ],
};
