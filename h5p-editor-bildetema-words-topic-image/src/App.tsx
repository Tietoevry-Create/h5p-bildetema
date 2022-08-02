import type { Image } from "h5p-types";
import * as React from "react";
import { LanguageCode } from "../../common/types/LanguageCode";
import { Word } from "../../common/types/types";
import { makeLanguageCode } from "../../common/utils/LanguageCode.utils";
import { Editor } from "./components/editor/Editor";

export type AppProps = {
  image: Image | undefined;
  words: Map<LanguageCode, Word[]> | undefined;
};

export const App: React.FC<AppProps> = ({ image, words }) => {
  // TODO: Translate
  const noImagePlaceholder = "Please start with uploading an image ✨";

  return image ? (
    <Editor image={image} words={words?.get(makeLanguageCode("nob")) ?? []} />
  ) : (
    <p>{noImagePlaceholder}</p>
  );
};
