import * as React from "react";
import { DisplayView } from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import styles from "./DisplayViewButtons.module.scss";

export type DisplayViewButtonsProps = {
  displayView: DisplayView;
  setDisplayView: (topicImage: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DisplayViewButtons: React.FC<DisplayViewButtonsProps> = ({
  displayView,
  setDisplayView,
}) => {
  const handleClick = (): void => {
    if (displayView === DisplayView.TopicImage) {
      setDisplayView(false);
    } else {
      setDisplayView(true);
    }
  };

  const topicImageLabel = "Topic image"; //useL10n("bigTopics");
  const gridLabel = "Grid"; //useL10n("compactTopics");

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={`${styles.buttonBig} ${displayView === DisplayView.TopicImage ? styles.active : ""
          }`}
        onClick={handleClick}
        tabIndex={displayView === DisplayView.TopicImage ? -1 : 0}
      >
        <span>{topicImageLabel}</span>
      </button>
      <button
        type="button"
        className={`${styles.buttonCompact} ${displayView === DisplayView.Grid ? styles.active : ""
          }`}
        onClick={handleClick}
        tabIndex={displayView === DisplayView.Grid ? -1 : 0}
      >
        <span>{gridLabel}</span>
      </button>
    </div>
  );
};
