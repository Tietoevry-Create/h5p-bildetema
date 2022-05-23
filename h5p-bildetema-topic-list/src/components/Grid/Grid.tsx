import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import GridElement from "../GridElement/GridElement";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Topic[];
};

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
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
  );
};

export default Grid;
