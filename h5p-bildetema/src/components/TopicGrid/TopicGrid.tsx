import * as React from "react";
import {
  Language,
  Topic,
  TopicGridSizes,
  TopicIds,
  Word,
} from "../../../../common/types/types";
import { TopicGridElement } from "../TopicGridElement/TopicGridElement";
import { Words } from "../Words/Words";
import styles from "./TopicGrid.module.scss";

export type TopicGridProps = {
  topics?: Topic[];
  words?: Word[];
  topicsSize: TopicGridSizes;
  setIsWordView: React.Dispatch<React.SetStateAction<boolean>>;
  showWrittenWords: boolean;
  currentLanguage: Language;
  currentTopic?: TopicIds;
  showTopicImageView: boolean;
  toggleShowTopicImageView: (value: boolean) => void;
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
  currentTopic,
  showTopicImageView,
  toggleShowTopicImageView,
}) => {
  React.useEffect(() => {
    setIsWordView(!!words);
  }, [words, setIsWordView]);

  if (topics) {
    return (
      <div
        className={`${
          topicsSize === TopicGridSizes.Big
            ? styles.gridBig
            : styles.gridCompact
        }`}
      >
        {topics?.map(topic => {
          return (
            <TopicGridElement
              key={topic.id}
              title={
                topic.labelTranslations.get(currentLanguage.code)?.label ||
                topic.id
              }
              images={topic.images}
              topicSize={topicsSize}
              languageCode={currentLanguage.code}
              topic={topic}
            />
          );
        })}
      </div>
    );
  }

  if (words) {
    return (
      <Words
        words={words}
        topic={currentTopic}
        showWrittenWords={showWrittenWords}
        currentLanguage={currentLanguage.code}
        showTopicImageView={showTopicImageView}
        toggleShowTopicImageView={toggleShowTopicImageView}
      />
    );
  }

  return <h1>No topics</h1>;
};
