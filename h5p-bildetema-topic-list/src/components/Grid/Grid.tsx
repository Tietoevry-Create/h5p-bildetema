import * as React from "react";
import { GridItem } from "../../types/GridItem";
import GridElement from "../GridElement/GridElement";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: GridItem[];
};

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map(item => {
        return <GridElement item={item} />;
      })}
    </div>
  );
};

export default Grid;
