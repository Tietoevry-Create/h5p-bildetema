import * as React from "react";
import { TopicGridSizes } from "../../../../common/types/types";
import styles from "./TopicSizeButtons.module.scss";

export type TopicSizeButtonsProps = {
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TopicSizeButtons: React.FC<TopicSizeButtonsProps> = ({
  topicsSize,
  setTopicsSize,
}) => {
  const handleClick = () => {
    topicsSize === TopicGridSizes.Big
      ? setTopicsSize(TopicGridSizes.Compact)
      : setTopicsSize(TopicGridSizes.Big);
  };

  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.buttonBig} ${
          topicsSize === TopicGridSizes.Big ? styles.active : ""
        }`}
        onClick={handleClick}
        tabIndex={topicsSize === TopicGridSizes.Big ? -1 : 0}
      >
        {/* TODO: Replace with svg */}
        Big
      </button>
      <button
        className={`${styles.buttonCompact} ${
          topicsSize === TopicGridSizes.Compact ? styles.active : ""
        }`}
        onClick={handleClick}
        tabIndex={topicsSize === TopicGridSizes.Compact ? -1 : 0}
      >
        {/* TODO: Replace with svg */}
        Compact
      </button>
    </div>
  );
};
