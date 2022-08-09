import React from "react";
import { Word } from "../../../../common/types/types";
import styles from "./TopicImageWordList.module.scss";

export type TopicImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
};

export const TopicImageWordList: React.FC<TopicImageWordListProps> = ({
  words,
  currentWordId,
}) => {
  return (
    <div className={styles.topicImageWordList}>
      {words?.map((word: Word) => (
        <div className="topic-image-word-list-item" key={word.id}>
          <div className={word.id === currentWordId ? styles.selected : ""}>
            {word.label}
          </div>
        </div>
      ))}
    </div>
  );
};
