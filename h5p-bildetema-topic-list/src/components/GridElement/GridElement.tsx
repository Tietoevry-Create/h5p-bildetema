import * as React from "react";
import { Topic, Word } from "../../../../types";
import styles from "./GridElement.module.scss";

export type GridElementProps = {
  item?: Topic | Word;
  title: string;
};

const GridElement: React.FC<GridElementProps> = ({ item, title }) => {
  return (
    <button className={styles.gridElement} type="button">
      <span>{title}</span>
    </button>
  );
};

export default GridElement;
