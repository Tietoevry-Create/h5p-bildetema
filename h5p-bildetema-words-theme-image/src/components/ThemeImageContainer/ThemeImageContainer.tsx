import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import { OverlayType } from "../../types/OverlayType";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";
import { ThemeImageSVG } from "../ThemeImageSVG/ThemeImageSVG";
import { ThemeImageWordList } from "../ThemeImageWordList/ThemeImageWordList";
import styles from "./ThemeImageContainer.module.scss";

export type ThemeImageContainerProps = {
  topic: Topic|undefined;
  themeImage: string;
  themeOverlays: OverlayType[];
  themeImageType: ThemeImageTypes;
  words: Word[];
};

export const ThemeImageContainer: React.FC<ThemeImageContainerProps> = ({
  topic,
  themeImage,
  themeOverlays,
  themeImageType,
  words,
}) => {
  console.info("ThemeImageContainer", "themeImage", themeImage, "themeOverlays", themeOverlays, "themeImageType", themeImageType, "words", words);
  const [currentWord, setCurrentWord] = React.useState("");

  const selectWord = (word: string): void => {
    setCurrentWord(word);
  };

  if (themeImageType === "vectorImageWithHotspots" || themeImageType === "nonVectorImageWithHotspots") {
    return (
      <div className={styles.wrapper}>
        <ThemeImageSVG
          words={words}
          image={themeImage}
          overlays={themeOverlays}
          selectWord={selectWord}
          themeImageType={themeImageType}
        />
        <ThemeImageWordList words={words} currentWordId={currentWord} />
      </div>
    );
  }
  return <div />;
};
