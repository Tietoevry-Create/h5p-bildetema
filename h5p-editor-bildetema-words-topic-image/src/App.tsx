// import { LanguageCode } from "common/types/LanguageCode";
import { Word } from "common/types/types";
import type { H5PImage } from "h5p-types";
import { FC } from "react";
import { Editor } from "./components/editor/Editor";
import { t } from "./h5p/H5P.util";
import { Hotspot } from "./types/Hotspot";

export type AppProps = {
  image: H5PImage | undefined;
  words: Array<Word> | undefined;
  initialHotspots: Array<Hotspot>;
};

export const App: FC<AppProps> = ({ image, words = [], initialHotspots }) => {
  const noImagePlaceholder = t("noImagePlaceholder");
  return image ? (
    <Editor image={image} words={words} initialHotspots={initialHotspots} />
  ) : (
    <p>{noImagePlaceholder}</p>
  );
};
