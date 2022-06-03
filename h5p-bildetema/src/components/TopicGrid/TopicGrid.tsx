import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import { TopicGridElement } from "..";
import styles from "./TopicGrid.module.scss";

type TopicGridProps = {
  items?: Topic[];
  topic?: string;
  words?: Word[];
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  items,
  topic,
  words,
}) => {
  return (
    <>
      {topic ? <h1>Current topic - {topic}</h1> : <h1>Choose a topic</h1>}
      <div className={styles.grid}>
        {items?.map(item => {
          return (
            <TopicGridElement
              key={item.id}
              title={item.label}
              index={items.indexOf(item)}
            />
          );
        })}
        {words?.map(word => {
          return (
            <TopicGridElement
              key={word.id}
              item={word}
              title={word.label}
              index={words.indexOf(word)}
            />
          );
        })}
      </div>
    </>
  );
};
