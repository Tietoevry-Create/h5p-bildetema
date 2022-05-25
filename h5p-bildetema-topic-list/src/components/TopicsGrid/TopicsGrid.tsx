import * as React from "react";
import { Outlet } from "react-router-dom";
import { Topic } from "../../../../common/types/types";
import { GridElement } from "..";
import styles from "./TopicsGrid.module.scss";

type TopicsGridProps = {
  items: Topic[];
  topic?: string;
};

export const TopicsGrid: React.FC<TopicsGridProps> = ({ items, topic }) => {
  return (
    <>
      {topic ? <h1>Current topic {topic}</h1> : <h1>Choose a topic</h1>}
      <div className={styles.grid}>
        {items.map(item => {
          return (
            <GridElement
              key={item.id}
              item={item}
              title={item.label}
              index={items.indexOf(item)}
            />
          );
        })}
      </div>
      <Outlet />
    </>
  );
};
