import * as React from "react";
import { Topic, Word } from "../../../../common/types/types";
import { OverlayType } from "../../types/OverlayType";
import { TopicImageTypes } from "../../types/TopicImageTypes";
import { TopicImageSVG } from "../TopicImageSVG/TopicImageSVG";
import { TopicImageWordList } from "../TopicImageWordList/TopicImageWordList";
import styles from "./TopicImageContainer.module.scss";

export type TopicImageContainerProps = {
  topic: Topic;
  topicImage: string;
  aspectRatio: number;
  topicOverlays: OverlayType[];
  topicImageType: TopicImageTypes;
  words: Word[];
};

export const TopicImageContainer: React.FC<TopicImageContainerProps> = ({
  topic,
  topicImage,
  aspectRatio,
  topicOverlays,
  topicImageType,
  words,
}) => {
  const [currentWord, setCurrentWord] = React.useState("");

  const selectWord = (word: string): void => {
    setCurrentWord(word);
  };

  if (
    topicImageType === "vectorImageWithHotspots" ||
    topicImageType === "nonVectorImageWithHotspots"
  ) {
    return (
      <div className={styles.wrapper}>
        <TopicImageSVG
          image={topicImage}
          aspectRatio={aspectRatio}
          overlays={topicOverlays}
          selectWord={selectWord}
          topicImageType={topicImageType}
        />
        <TopicImageWordList words={words} currentWordId={currentWord} />
      </div>
    );
  }
  return <div />;
};
