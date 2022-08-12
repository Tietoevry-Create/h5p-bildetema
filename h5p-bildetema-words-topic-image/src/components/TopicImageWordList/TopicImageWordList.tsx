import React from "react";
import { Word } from "../../../../common/types/types";
import { TopicImageWordAudio } from "../TopicImageWordAudio/TopicImageWordAudio";
import styles from "./TopicImageWordList.module.scss";

export type TopicImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
  hoveredWord: (word: string) => void;
  selectWord: (word: string) => void;
};

export const TopicImageWordList: React.FC<TopicImageWordListProps> = ({
  words,
  currentWordId,
  hoveredWord,
  selectWord,
}) => {
  return (
    <div className={styles.topicImageWordList}>
      {words?.map((word: Word) => (
        <div className="topic-image-word-list-item" key={word.id}>
          <TopicImageWordAudio
            word={word}
            currentWordId={currentWordId}
            hoveredWord={hoveredWord}
            unSelectWord={selectWord}
          />
        </div>
      ))}
    </div>
  );
};
