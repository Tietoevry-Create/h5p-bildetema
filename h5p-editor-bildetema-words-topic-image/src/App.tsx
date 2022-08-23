import type { Image } from "h5p-types";
import * as React from "react";
import { LanguageCode } from "../../common/types/LanguageCode";
import { Word } from "../../common/types/types";
import { Editor } from "./components/editor/Editor";
import { t } from "./h5p/H5P.util";
import { Hotspot } from "./types/Hotspot";

export type AppProps = {
  image: Image | undefined;
  words: Map<LanguageCode, Word[]> | undefined;
  initialHotspots: Array<Hotspot>;
};

export const App: React.FC<AppProps> = ({ image, words, initialHotspots }) => {
  const noImagePlaceholder = t("noImagePlaceholder");

  return image ? (
    <Editor
      image={image}
      words={words?.get("nob") ?? []}
      initialHotspots={initialHotspots}
    />
  ) : (
    <p>{noImagePlaceholder}</p>
  );
};
