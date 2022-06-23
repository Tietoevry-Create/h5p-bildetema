import * as React from "react";
import { Topic, TopicGridSizes, Word } from "../../../../common/types/types";
import { TopicGridElement, Words } from "..";
import styles from "./TopicGrid.module.scss";

type TopicGridProps = {
  items?: Topic[];
  words?: Word[];
  topicsSize: TopicGridSizes;
  setIsWordView: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  items,
  words,
  topicsSize,
  setIsWordView,
}) => {
  if (items) {
    setIsWordView(false);
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
              images={item.images}
              topicSize={topicsSize}
            />
          );
        })}
      </div>
    );
  }

  if (words) {
    setIsWordView(true);
    return <Words words={words} />;
  }

  return <h1>No items</h1>;
};
