import * as React from "react";
import { Topic, TopicGridSizes, Word } from "../../../../common/types/types";
import { TopicGridElement, Words } from "..";
import styles from "./TopicGrid.module.scss";

type TopicGridProps = {
  items?: Topic[];
  words?: Word[];
  topicsSize: TopicGridSizes;
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  items,
  words,
  topicsSize,
}) => {
  if (items) {
    return (
      <div
        className={`${
          topicsSize === TopicGridSizes.Big
            ? styles.gridBig
            : styles.gridCompact
        }`}
      >
        {items?.map(item => {
          return (
            <TopicGridElement
              key={item.id}
              title={item.label}
              index={items.indexOf(item)}
              image={item.image}
              topicSize={topicsSize}
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
