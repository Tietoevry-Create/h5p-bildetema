import * as React from "react";
import { Word as WordType } from "../../../../common/types/types";
import { Word } from "..";
import styles from "./WordsGrid.module.scss";

type WordsGridProps = {
  topic: string;
  items: WordType[];
};

export const WordsGrid: React.FC<WordsGridProps> = ({ items, topic }) => {
  return (
    <>
      <h1>Current topic - {topic}</h1>
      <div className={styles.grid}>
        {items.map(word => {
          return (
            <Word
              key={word.id}
              clickHandler={(): void => {
                throw new Error("Function not implemented.");
              }}
              word={word}
              textVisible
            />
          );
        })}
      </div>
    </>
  );
};
