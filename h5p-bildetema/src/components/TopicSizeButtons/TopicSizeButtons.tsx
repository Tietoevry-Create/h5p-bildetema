import * as React from "react";
import { TopicGridSizes } from "../../../../common/types/types";
import { BigTopicsIcon, CompactTopicsIcon } from "../Icons/Icons";
import { useL10n } from "../../hooks/useL10n";
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
  const handleClick = (): void => {
    if (topicsSize === TopicGridSizes.Big) {
      setTopicsSize(TopicGridSizes.Compact);
    } else {
      setTopicsSize(TopicGridSizes.Big);
    }
  };

  const bigTopicsLabel = useL10n("bigTopics");
  const compactTopicsLabel = useL10n("compactTopics");

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={`${styles.buttonBig} ${
          topicsSize === TopicGridSizes.Big ? styles.active : ""
        }`}
        onClick={handleClick}
        tabIndex={topicsSize === TopicGridSizes.Big ? -1 : 0}
      >
        <BigTopicsIcon />
        <span className={styles.visuallyHidden}>{bigTopicsLabel}</span>
      </button>
      <button
        type="button"
        className={`${styles.buttonCompact} ${
          topicsSize === TopicGridSizes.Compact ? styles.active : ""
        }`}
        onClick={handleClick}
        tabIndex={topicsSize === TopicGridSizes.Compact ? -1 : 0}
      >
        <CompactTopicsIcon />
        <span className={styles.visuallyHidden}>{compactTopicsLabel}</span>
      </button>
    </div>
  );
};
