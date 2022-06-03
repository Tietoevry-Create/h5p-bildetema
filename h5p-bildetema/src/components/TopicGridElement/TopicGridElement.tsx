import * as React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleClick = (): void => {
    // temp - stop navigation when the words are displayed instead of topics
    if (item) return;
    navigate(`${encodeURIComponent(title.toLowerCase().split(" ").join("-"))}`);
  };
  return (
    <button className={styles.gridElement} type="button" onClick={handleClick}>
      <span>{`${index + 1}. ${title}`}</span>
    </button>
  );
};
