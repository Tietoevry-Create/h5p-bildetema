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
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
  currentTopic,
}) => {
  React.useEffect(() => {
    setIsWordView(!!words);
  }, [words, setIsWordView]);

  // Use placeholder(s) to make TopicGridElements the same size in Big grid
  const usePlaceholders =
    topicsSize === TopicGridSizes.Big && topics && topics?.length < 4;
  const numberOfPlaceholders = usePlaceholders
    ? 4 - Math.floor(topics?.length)
    : 0;

  if (topics) {
    return (
      <div
        className={`${
          topicsSize === TopicGridSizes.Big
            ? styles.gridBig
            : styles.gridCompact
        }`}
      >
        {topics?.map((topic, index) => {
          return (
            <TopicGridElement
              key={topic.id}
              title={
                topic.labelTranslations.get(currentLanguage.code)?.label ||
                topic.id
              }
              index={index}
              images={topic.images}
              topicSize={topicsSize}
              languageCode={currentLanguage.code}
              topic={topic}
            />
          );
        })}
        {usePlaceholders &&
          [...Array(numberOfPlaceholders)].map((_item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <div key={`placeholder-${index}`} />;
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
      />
    );
  }

  return <h1>No topics</h1>;
};
