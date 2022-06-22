import React from "react";
import { Word } from "../../../../common/types/types";
import styles from "./ThemeImageWordList.module.scss";

export type ThemeImageWordListProps = {
  words: Word[];
};

export const ThemeImageWordList: React.FC<ThemeImageWordListProps> = ({
  words,
}) => {
  return (
    <div className={styles.themeImageWordList}>
      {words.map((word: Word) => (
        <div className="theme-image-word-list-item" key={word.id}>
          <div className="theme-image-word-list-item-word">{word.label}</div>
        </div>
      ))}
    </div>
  );
};
