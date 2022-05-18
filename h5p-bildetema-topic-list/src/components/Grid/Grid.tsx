import * as React from "react";
import { Topic, Word } from "../../../../types";
import GridElement from "../GridElement/GridElement";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Topic[] | Word[];
};

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map(item => {
        return <GridElement key={item.title} item={item} title={item.tema1} />;
      })}
    </div>
  );
};

export default Grid;
