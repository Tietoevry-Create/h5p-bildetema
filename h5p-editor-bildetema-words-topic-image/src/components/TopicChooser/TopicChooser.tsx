import * as React from "react";
import { Topic } from "../../../../common/types/types";
import { t } from "../../h5p/H5P.util";
import styles from "./TopicChooser.module.scss";

type TopicChooserProps = {
  items?: Topic[];
  setCurrentTopic: (topic: Topic) => void;
  setCurrentSubTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  topic?: Topic;
  subTopic?: Topic;
};

export const TopicChooser: React.FC<TopicChooserProps> = ({
  items,
  setCurrentTopic,
  setCurrentSubTopic,
  topic,
  subTopic,
}) => {
  const onTopicSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    if (setCurrentTopic) {
      const selectedTopic = items?.find(item => item.id === event.target.value);
      if (selectedTopic) {
        setCurrentTopic(selectedTopic);
        setCurrentSubTopic(undefined);
      }
    }
  };

  const onSubTopicSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    if (setCurrentSubTopic) {
      const selectedSubTopic = topic?.subTopics.find(
        s => s.id === event.target.value,
      );
      if (selectedSubTopic) {
        setCurrentSubTopic(selectedSubTopic);
      }
    }
  };

  const topicChooserLabel = t("topicChooserLabel");
  const topicChooserDescription = t("topicChooserDescription");
  const chooseTopicLabel = t("chooseTopicLabel");
  const chooseSubTopicLabel = t("chooseSubTopicLabel");

  if (items) {
    return (
      <div className={styles.topicChooser}>
        <span className={styles.topicChooserLabel}>{topicChooserLabel}</span>
        <span className={styles.topicChooserDescription}>
          {topicChooserDescription}
        </span>
        <div className={styles.selectGroup}>
          <select
            className={styles.gridCompact}
            onChange={onTopicSelected}
            value={topic?.id ?? "default"}
            data-test-id="topic-select"
          >
            <option value="default" disabled>
              {chooseTopicLabel}
            </option>
            {items?.map(item => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          {topic && topic.subTopics && topic.subTopics.length > 0 && (
            <select
              className={styles.gridCompact}
              onChange={onSubTopicSelected}
              value={subTopic?.id ?? "default"}
              data-test-id="subtopic-select"
            >
              <option value="default" disabled>
                {chooseSubTopicLabel}
              </option>
              {topic.subTopics.map(item => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  }

  return <h1>No items</h1>;
};
