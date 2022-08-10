import * as React from "react";
import { Topic } from "../../../../common/types/types";
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
      const selectedSubTopic = topic?.subTopics.get(event.target.value);
      if (selectedSubTopic) {
        setCurrentSubTopic(selectedSubTopic);
      }
    }
  };

  // TODO: Translate
  const chooseTopicLabel = "Please choose topic";
  // TODO: Translate
  const chooseSubTopicLabel = "Please choose sub topic";

  if (items) {
    return (
      <div className={styles.topicChooser}>
        <select
          className={styles.gridCompact}
          onChange={onTopicSelected}
          value={topic?.id ?? "default"}
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
        {topic && topic.subTopics && topic.subTopics.size > 0 && (
          <select
            className={styles.gridCompact}
            onChange={onSubTopicSelected}
            value={subTopic?.id ?? "default"}
          >
            <option value="default" disabled>
              {chooseSubTopicLabel}
            </option>
            {Array.from(topic.subTopics?.values()).map(item => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }

  return <h1>No items</h1>;
};
