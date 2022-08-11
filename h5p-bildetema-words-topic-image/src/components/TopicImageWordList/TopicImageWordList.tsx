import React from "react";
import { Word } from "../../../../common/types/types";
import styles from "./TopicImageWordList.module.scss";

export type TopicImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
  hoveredWord: (word: string) => void;
};

export const TopicImageWordList: React.FC<TopicImageWordListProps> = ({
  words,
  currentWordId,
  hoveredWord,
}) => {
  return (
    <div className={styles.topicImageWordList}>
      {words?.map((word: Word) => (
        <div className="topic-image-word-list-item" key={word.id}>
          <div
            className={`${styles.label} ${
              word.id === currentWordId ? styles.selected : ""
            }`}
            onMouseEnter={() => hoveredWord(word.id)}
            onMouseLeave={() => hoveredWord("")}
          >
            {word.label}
          </div>
        </div>
      ))}
    </div>
  );
};
