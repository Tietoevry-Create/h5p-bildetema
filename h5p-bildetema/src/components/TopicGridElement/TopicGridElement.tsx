import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import styles from "./TopicGridElement.module.scss";

type TopicGridElementProps = {
  item?: Topic | Word;
  index: number;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TopicGridElement: React.FC<TopicGridElementProps> = ({
  item,
  title,
  index,
}) => {
  return (
    <button className={styles.gridElement} type="button">
      <span>{`${index + 1}. ${title} ${item}`}</span>
    </button>
  );
};
