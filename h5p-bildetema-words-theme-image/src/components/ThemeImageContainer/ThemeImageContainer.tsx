import * as React from "react";
import { Word } from "../../../../common/types/types";
import { OverlayType } from "../../types/OverlayType";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";
import { ThemeImageSVG } from "../ThemeImageSVG/ThemeImageSVG";
import { ThemeImageWordList } from "../ThemeImageWordList/ThemeImageWordList";
import styles from "./ThemeImageContainer.module.scss";

export type ThemeImageContainerProps = {
  theme: Word;
  themeImage: string;
  themeOverlays: OverlayType[];
  themeImageType: ThemeImageTypes;
  words: Word[];
};

export const ThemeImageContainer: React.FC<ThemeImageContainerProps> = ({
  theme,
  themeImage,
  themeOverlays,
  themeImageType,
  words,
}) => {
  const [currentWord, setCurrentWord] = React.useState("");

  const selectWord = (word: string): void => {
    setCurrentWord(word);
  };

  if (themeImageType === "vectorImageWithHotspots") {
    return (
      <div className={styles.wrapper}>
        <ThemeImageSVG
          words={words}
          image={themeImage}
          overlays={themeOverlays}
          selectWord={selectWord}
        />
        <ThemeImageWordList words={words} currentWordId={currentWord} />
      </div>
    );
  }
  return <div />;
};
