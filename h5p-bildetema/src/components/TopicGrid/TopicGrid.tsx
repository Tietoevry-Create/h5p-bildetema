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
  items?: Topic[];
  words?: Word[];
  topicsSize: TopicGridSizes;
  setIsWordView: React.Dispatch<React.SetStateAction<boolean>>;
  showWrittenWords: boolean;
  currentLanguage: Language;
  setCurrentTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  setCurrentSubTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  topic?: Topic;
  subTopic?: Topic;
};

export const TopicGrid: React.FC<TopicGridProps> = ({
  items,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
  setCurrentTopic,
  topic,
  setCurrentSubTopic,
  subTopic,
}) => {
  React.useEffect(() => {
    setCurrentTopic(topic);
    setCurrentSubTopic(subTopic);
    setIsWordView(!!words);
  }, [
    topic,
    subTopic,
    setCurrentTopic,
    setCurrentSubTopic,
    words,
    setIsWordView,
  ]);

  if (items) {
    return (
      <div
        className={`${
          topicsSize === TopicGridSizes.Big
            ? styles.gridBig
            : styles.gridCompact
        }`}
      >
        {items?.map(item => {
          return (
            <TopicGridElement
              key={item.id}
              title={
                item.labelTranslations.get(currentLanguage.code)?.label ||
                item.id
              }
              index={items.indexOf(item)}
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

  return <h1>No items</h1>;
};
