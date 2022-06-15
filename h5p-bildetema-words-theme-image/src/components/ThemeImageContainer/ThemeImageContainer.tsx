import * as React from "react";
import { Word } from "../../../../common/types/types";
import styles from "./ThemeImageContainer.module.scss";

type ThemeImageContainerProps = {
  words: Word[];
};

export const ThemeImageContainer: React.FC<ThemeImageContainerProps> = ({
  words,
}) => {
  const [currentWord, setCurrentWord] = React.useState("");

  const handleClick = (word: string): void => {
    setCurrentWord(word);
  };

  return (
    <div className={styles.wrapper}>
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
