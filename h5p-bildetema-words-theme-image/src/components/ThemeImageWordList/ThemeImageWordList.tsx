import React from "react";
import { Word } from "../../../../common/types/types";
import styles from "./ThemeImageWordList.module.scss";

export type ThemeImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
};

export const ThemeImageWordList: React.FC<ThemeImageWordListProps> = ({
  words,
  currentWordId,
}) => {
  return (
    <div className={styles.themeImageWordList}>
      {words.map((word: Word) => (
        <div className="theme-image-word-list-item" key={word.id}>
          <div className={word.id === currentWordId ? styles.selected : ""}>
            {word.label}
          </div>
        </div>
      ))}
    </div>
  );
};
