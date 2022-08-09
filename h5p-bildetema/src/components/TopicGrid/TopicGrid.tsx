import * as React from "react";
import {
  Language,
  Topic,
  TopicGridSizes,
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
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
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
      </div>
    );
  }

  if (words) {
    return <Words words={words} topic={topic?{topicId: topic?.id, subTopicId: subTopic?.id}:undefined} showWrittenWords={showWrittenWords} />;
  }

  return <h1>No topics</h1>;
};
