import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import styles from "./GridElement.module.scss";

export type GridElementProps = {
  item?: Topic | Word;
  index: number;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GridElement: React.FC<GridElementProps> = ({ item, title, index }) => {
  return (
    <button className={styles.gridElement} type="button">
      <span>{`${index + 1}. ${title}`}</span>
    </button>
  );
};

export default GridElement;
