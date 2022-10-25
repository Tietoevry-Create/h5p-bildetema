import * as React from "react";
import { Word as WordType } from "../../../../common/types/types";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
  showWrittenWords: boolean;
};

export const TopicWordsGrid: React.FC<TopicWordsGridProps> = ({
  words,
  showWrittenWords,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul role="list" className={styles.topicgrid}>
      {words.map(word => (
        <Word key={word.id} word={word} textVisible={showWrittenWords} />
      ))}
    </ul>
  );
};
