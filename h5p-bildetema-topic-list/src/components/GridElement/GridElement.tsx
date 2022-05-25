import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Topic, Word } from "../../../../common/types/types";
import styles from "./GridElement.module.scss";

type GridElementProps = {
  item?: Topic | Word;
  index: number;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GridElement: React.FC<GridElementProps> = ({
  item,
  title,
  index,
}) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`${encodeURIComponent(title.toLowerCase().split(" ").join("-"))}`);
  };
  return (
    <button onClick={handleClick} className={styles.gridElement} type="button">
      <span>{`${index + 1}. ${title}`}</span>
    </button>
  );
};
