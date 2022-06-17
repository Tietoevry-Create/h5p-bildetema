import * as React from "react";
import { Word } from "../../../../common/types/types";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";
import styles from "./ThemeImageContainer.module.scss";

type ThemeImageContainerProps = {
  theme: Word;
  themeImageType: ThemeImageTypes;
  words: Word[];
};

export const ThemeImageContainer: React.FC<ThemeImageContainerProps> = ({
  theme,
  themeImageType,
  words,
}) => {
  const [currentWord, setCurrentWord] = React.useState("");

  const handleClick = (word: string): void => {
    setCurrentWord(word);
  };

  return (
    <div className={styles.wrapper}>
      {theme.label} <br />
      {themeImageType} <br />
      {currentWord} <br />
      {words.map(word => {
        return (
          <div key={word.id}>
            <button type="button" onClick={() => handleClick(word.label)}>
              {word.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};
