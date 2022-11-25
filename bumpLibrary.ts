import { library as h5pBildetema } from "./h5p-bildetema/src/library";
import { library as h5pBildetemaWordsGridView } from "./h5p-bildetema-words-grid-view/src/library";
import { library as h5pBildetemaWordsTopicImage } from "./h5p-bildetema-words-topic-image/src/library";
import { library as h5pEditorBildetemaWordsTopicImage } from "./h5p-editor-bildetema-words-topic-image/src/library";
import query from "cli-interact";
import type { Library } from "h5p-types";
import fs from "fs";

type pathAndLibrary = {
  path: string;
  lib: Library;
};

const libs: pathAndLibrary[] = [
  { path: "./h5p-bildetema/src/library.ts", lib: h5pBildetema },
  {
    path: "./h5p-bildetema-words-grid-view/src/library.ts",
    lib: h5pBildetemaWordsGridView,
  },
  {
    path: "./h5p-bildetema-words-topic-image/src/library.ts",
    lib: h5pBildetemaWordsTopicImage,
  },
  {
    path: "./h5p-editor-bildetema-words-topic-image/src/library.ts",
    lib: h5pEditorBildetemaWordsTopicImage,
  },
];

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
      console.log(err);
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
      if (err) console.log(err);
    });
  });
});
