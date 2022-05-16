import * as React from "react";
import { GridItem } from "../../types/GridItem";
import styles from "./GridElement.module.scss";

export type GridElementProps = {
  item: GridItem;
};

const GridElement: React.FC<GridElementProps> = ({ item }) => {
  return (
    <button key={item.title} className={styles.gridElement} type="button">
      <span>{item.title}</span>
    </button>
  );
};

export default GridElement;
