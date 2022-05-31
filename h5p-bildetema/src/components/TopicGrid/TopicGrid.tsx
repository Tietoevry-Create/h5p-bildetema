import * as React from "react";
import { Topic } from "../../../../common/types/types";
import { TopicGridElement } from "..";
import styles from "./TopicGrid.module.scss";

type TopicGridProps = {
  items: Topic[];
};

export const TopicGrid: React.FC<TopicGridProps> = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map(item => {
        return (
          <TopicGridElement
            key={item.id}
            item={item}
            title={item.label}
            index={items.indexOf(item)}
          />
        );
      })}
    </div>
  );
};
