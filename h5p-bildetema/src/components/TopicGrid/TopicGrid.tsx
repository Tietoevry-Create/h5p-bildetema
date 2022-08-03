import * as React from "react";
import {
  Language,
  Topic,
  TopicGridSizes,
  Word,
} from "../../../../common/types/types";
import { TopicGridElement, Words } from "..";
import styles from "./TopicGrid.module.scss";

type TopicGridProps = {
  topics?: Topic[];
  words?: Word[];
  topicsSize: TopicGridSizes;
  setIsWordView: React.Dispatch<React.SetStateAction<boolean>>;
  showWrittenWords: boolean;
  currentLanguage: Language;
  // setCurrentTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  // setCurrentSubTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  // topic?: Topic;
  // subTopic?: Topic;
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
  // setCurrentTopic,
  // topic,
  // setCurrentSubTopic,
  // subTopic,
}) => {
  React.useEffect(() => {
    // setCurrentTopic(topic);
    // setCurrentSubTopic(subTopic);
    setIsWordView(!!words);
  }, [
    // topic,
    // subTopic,
    // setCurrentTopic,
    // setCurrentSubTopic,
    words,
    setIsWordView,
  ]);

  if (topics) {
    return (
      <div
        className={`${
          topicsSize === TopicGridSizes.Big
            ? styles.gridBig
            : styles.gridCompact
        }`}
      >
        {topics?.map(item => {
          return (
            <TopicGridElement
              key={item.id}
              title={
                item.labelTranslations.get(currentLanguage.code)?.label ||
                item.id
              }
              index={topics.indexOf(item)}
              images={item.images}
              topicSize={topicsSize}
            />
          );
        })}
      </div>
    );
  }

  if (words) {
    return <Words words={words} showWrittenWords={showWrittenWords} />;
  }

  return <h1>No topics</h1>;
};
