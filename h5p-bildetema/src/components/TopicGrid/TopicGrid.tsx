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
        {topics?.map((item, index) => {
          return (
            <TopicGridElement
              key={item.id}
              title={
                item.labelTranslations.get(currentLanguage.code)?.label ||
                item.id
              }
              index={index}
              images={item.images}
              topicSize={topicsSize}
              languageCode={currentLanguage.code}
              item={item}
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
