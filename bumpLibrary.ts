import fs from "fs";
import query from "cli-interact";
import type { H5PLibrary } from "h5p-types";
import h5pBildetemaWordsGridView from "./h5p-bildetema-words-grid-view/library.json";
import h5pBildetemaWordsTopicImage from "./h5p-bildetema-words-topic-image/library.json";
import h5pBildetema from "./h5p-bildetema/library.json";
import h5pEditorBildetemaWordsTopicImage from "./h5p-editor-bildetema-words-topic-image/library.json";

type PathAndLibrary = {
  path: string;
  lib: H5PLibrary;
};

const libs = [
  {
    path: "./h5p-bildetema/library.json",
    lib: h5pBildetema as H5PLibrary,
  },
  {
    path: "./h5p-bildetema-words-grid-view/library.json",
    lib: h5pBildetemaWordsGridView as H5PLibrary,
  },
  {
    path: "./h5p-bildetema-words-topic-image/library.json",
    lib: h5pBildetemaWordsTopicImage as H5PLibrary,
  },
  {
    path: "./h5p-editor-bildetema-words-topic-image/library.json",
    lib: h5pEditorBildetemaWordsTopicImage as H5PLibrary,
  },
] satisfies Array<PathAndLibrary>;

libs.forEach(el => {
  const { path, lib } = el;

  const currPatchVersion = lib.patchVersion;
  const bumpedPatchVersion = currPatchVersion + 1;

  const bumpPatch = query.getYesNo(
    `Bump patchVersion for "${lib.title}" from ${currPatchVersion} -> ${bumpedPatchVersion}`,
  );
  if (!bumpPatch) return;

  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.info(err);
      return;
    }

    const dataArray = data.split("\n");

    const libraryFileWithBumpedPatchVersion = dataArray
      .map(line => {
        if (!line.includes("patchVersion")) return line;
        return line.replace(`${currPatchVersion}`, `${bumpedPatchVersion}`);
      })
      .join("\n");

    fs.writeFile(path, libraryFileWithBumpedPatchVersion, err => {
      if (err) console.info(err);
    });
  });
});
