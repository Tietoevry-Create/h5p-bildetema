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
  scrollToTop: () => void;
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
  currentTopic,
  scrollToTop,
}) => {
  React.useEffect(() => {
    setIsWordView(!!words);
  }, [words, setIsWordView]);

  React.useEffect(() => {
    // TODO: Should not be used when changing topicsSize

    // Scroll to top of container
    if (scrollToTop != null) {
      scrollToTop();
    }
    // Only use scrollToTop when topics have changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

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
