import * as React from "react";
import { Word as WordType } from "../../../../common/types/types";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  items: WordType[];
};

export const TopicWordsGrid: React.FC<TopicWordsGridProps> = ({ items }) => {
  return (
    <div className={styles.topicgrid}>
      {items.map(item => {
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
