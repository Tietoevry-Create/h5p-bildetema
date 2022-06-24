
import * as React from "react";
import { Word as WordType } from "../../../../common/types/types";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
  showWrittenWords: boolean
};

export const TopicWordsGrid: React.FC<TopicWordsGridProps> = ({ words, showWrittenWords }) => {
  console.log(showWrittenWords)
  console.log(words)

  return (
    <div className={styles.topicgrid}>
      {words.map(item => {
        return <Word key={item.id} word={item} textVisible={showWrittenWords} />;
      })}
    </div>
  );
};