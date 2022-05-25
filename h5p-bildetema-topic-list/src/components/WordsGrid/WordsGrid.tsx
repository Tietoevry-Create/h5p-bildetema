import * as React from "react";
import { Outlet } from "react-router-dom";
import { Word } from "../../../../common/types/types";
import { GridElement } from "..";
import styles from "./WordsGrid.module.scss";

type WordsGridProps = {
  topic: string;
  items: Word[];
};

export const WordsGrid: React.FC<WordsGridProps> = ({ items, topic }) => {
  return (
    <>
      <h1>Current topic - {topic}</h1>
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
