import * as React from "react";
import { Link } from "react-router-dom";
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
    <Link
      className={`${styles.gridElement} ${item ? styles.disabled : ""}`}
      to={`${encodeURIComponent(title.toLowerCase().split(" ").join("-"))}`}
    >
      <span>{`${index + 1}. ${title}`}</span>
    </Link>
  );
};
