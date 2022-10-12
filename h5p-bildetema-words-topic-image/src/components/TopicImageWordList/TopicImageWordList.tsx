import React from "react";
import { Word } from "../../../../common/types/types";
import { TopicImageWordAudio } from "../TopicImageWordAudio/TopicImageWordAudio";
import styles from "./TopicImageWordList.module.scss";

export type TopicImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
  selectHoveredWord: (word: string) => void;
  selectWord: (word: string) => void;
  hoveredSVG: string | undefined;
};

export const TopicImageWordList: React.FC<TopicImageWordListProps> = ({
  words,
  currentWordId,
  selectHoveredWord,
  selectWord,
  hoveredSVG,
}) => {
  return (
    <div className={styles.topicImageWordList}>
      {words?.map((word: Word) => (
        <div className="topic-image-word-list-item" key={word.id}>
          <TopicImageWordAudio
            word={word}
            currentWordId={currentWordId}
            selectHoveredWord={selectHoveredWord}
            unSelectWord={selectWord}
            hoveredSVG={hoveredSVG}
          />
        </div>
      ))}
    </div>
  );
};
