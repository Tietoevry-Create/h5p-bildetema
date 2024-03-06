import { NewWord } from "common/types/types";
import { ChangeEvent, FC} from "react";
import { toSingleLabel } from "common/utils/word.utils";
import { t } from "../../h5p/H5P.util";
import styles from "./TopicChooser.module.scss";

type TopicChooserProps = {
  setCurrentTopic: (topic: NewWord) => void;
  setCurrentSubTopic: (topic: NewWord | undefined) => void;
  topic?: NewWord;
  subTopic?: NewWord;
  subTopics?: NewWord[];
  topics: NewWord[]
};

export const TopicChooser: FC<TopicChooserProps> = ({
  setCurrentTopic,
  setCurrentSubTopic,
  subTopic,
  topic,
  subTopics,
  topics
}) => {
  const onTopicSelected = (event: ChangeEvent<HTMLSelectElement>): void => {
    if (setCurrentTopic) {
      const selectedTopic = topics?.find(item => item.id === event.target.value);
      if (selectedTopic) {
        setCurrentTopic(selectedTopic);
        setCurrentSubTopic(undefined);
      }
    }
  };

  const onSubTopicSelected = (event: ChangeEvent<HTMLSelectElement>): void => {
    if(setCurrentSubTopic){
      const selectedSubTopic = subTopics?.find(item => item.id === event.target.value);
      if (selectedSubTopic) {
        setCurrentSubTopic(selectedSubTopic);
      }
    }
  };

  const topicChooserLabel = t("topicChooserLabel");
  const topicChooserDescription = t("topicChooserDescription");
  const chooseTopicLabel = t("chooseTopicLabel");
  const chooseSubTopicLabel = t("chooseSubTopicLabel");

  if (topics) {
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
            {topics?.map(item => {
              const labels = item.translations.get("nob")?.labels
              const label = toSingleLabel(labels)
              return (
                <option key={item.id} value={item.id}>
                  {label}
                </option>
              )
            }
            )}
          </select>
          {topics && subTopics && subTopics.length > 0 && (
            <select
              className={styles.gridCompact}
              onChange={onSubTopicSelected}
              value={subTopic?.id ?? "default"}
              data-test-id="subtopic-select"
            >
              <option value="default" disabled>
                {chooseSubTopicLabel}
              </option>
              {subTopics.map(item => {
                const labels = item.translations.get("nob")?.labels
                const label = toSingleLabel(labels)
                return (
                  <option key={item.id} value={item.id}>
                    {label}
                  </option>
                )
              }
              )}
            </select>
          )}
        </div>
      </div>
    );
  }

  return <h1>No items</h1>;
};
