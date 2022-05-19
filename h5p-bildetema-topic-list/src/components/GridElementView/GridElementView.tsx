import * as React from "react";
import { Topic, Word } from "../../../../types";
import styles from "./GridElementView.module.scss";

export type GridElementViewProps = {
  items?: Topic[] | Word[];
  // index: number;
  // title: string;
};

const GridElementView: React.FC<GridElementViewProps> = ({
  items,
  // title,
  // index,
}) => {
  return (
    <div className={styles.view}>
      {items?.map(item => {
        const currentTranslation = item?.translations.get("no");

        return (
          <>
            <h1>{currentTranslation}</h1>
            <img
              className={styles.image}
              src={item?.bildeA}
              alt={currentTranslation}
            />
          </>
        );
      })}
    </div>
  );
};

export default GridElementView;
