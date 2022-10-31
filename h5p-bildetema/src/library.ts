import type { Library } from "h5p-types";

export const library: Library = {
  title: "H5P Bildetema",
  machineName: "H5P.Bildetema",
  majorVersion: 1,
  minorVersion: 0,
  patchVersion: 118,
  runnable: 1,
  preloadedJs: [
    {
      path: "dist/bundle.js",
    },
  ],
  preloadedDependencies: [
    {
      machineName: "H5P.BildetemaWordsGridView",
      majorVersion: 1,
      minorVersion: 0,
    },
    {
      machineName: "H5P.BildetemaTopicImageView",
      majorVersion: 1,
      minorVersion: 0,
    },
  ],
};
