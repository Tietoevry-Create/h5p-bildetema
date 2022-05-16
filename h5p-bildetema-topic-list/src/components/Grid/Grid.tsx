import * as React from "react";
import styles from "./Grid.module.scss";

export type GridItem = {
  title: string;
};

export type GridProps = {
  items: GridItem[];
};

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map(item => {
        return (
          <button key={item.title} className={styles.gridItem} type="button">
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default Grid;
