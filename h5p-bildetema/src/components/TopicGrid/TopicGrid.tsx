import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import { TopicGridElement, Words } from "..";
import styles from "./TopicGrid.module.scss";

type TopicGridProps = {
  items?: Topic[];
  words?: Word[];
};

export const TopicGrid: React.FC<TopicGridProps> = ({ items, words }) => {
  if (items) {
    return (
      <div className={styles.grid}>
        {items?.map(item => {
          return (
            <TopicGridElement
              key={item.id}
              title={item.label}
              index={items.indexOf(item)}
              image={item.image}
            />
          );
        })}
      </div>
    );
  }

  if (words) {
    return <Words words={words} />;
  }

  return <h1>No items</h1>;
};
