import * as React from "react";
import { Word as WordType } from "../../../../common/types/types";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
};

export const TopicWordsGrid: React.FC<TopicWordsGridProps> = ({ words }) => {
  return (
    <div className={styles.topicgrid}>
      {words.map(item => {
        return (
          <Word
            key={item.id}
            word={item}
            textVisible
            clickHandler={() => {
              ("");
            }}
          />
        );
      })}
    </div>
  );
};
