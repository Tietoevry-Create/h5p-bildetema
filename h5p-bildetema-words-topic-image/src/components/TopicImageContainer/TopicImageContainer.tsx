import * as React from "react";
import { Word } from "../../../../common/types/types";
import { OverlayType } from "../../types/OverlayType";
import { TopicImageTypes } from "../../types/TopicImageTypes";
import { TopicImageSVG } from "../TopicImageSVG/TopicImageSVG";
import { TopicImageWordList } from "../TopicImageWordList/TopicImageWordList";
import styles from "./TopicImageContainer.module.scss";

export type TopicImageContainerProps = {
  topicImage: string;
  aspectRatio: number;
  topicOverlays: OverlayType[];
  topicImageType: TopicImageTypes;
  words: Word[];
};

export const TopicImageContainer: React.FC<TopicImageContainerProps> = ({
  topicImage,
  aspectRatio,
  topicOverlays,
  topicImageType,
  words,
}) => {
  const [currentWordId, setCurrentWordId] = React.useState("");
  const [hoveredWord, setHoveredWord] = React.useState("");

  const selectWord = (word: string): void => {
    setCurrentWordId(word);
  };

  const selectHoveredWord = (word: string): void => {
    setHoveredWord(word);
  };

  if (
    topicImageType === "vectorImageWithHotspots" ||
    topicImageType === "nonVectorImageWithHotspots"
  ) {
    return (
      <div className={styles.wrapper}>
        <TopicImageWordList
          words={words}
          currentWordId={currentWordId}
          hoveredWord={selectHoveredWord}
          selectWord={selectWord}
        />
        <TopicImageSVG
          image={topicImage}
          aspectRatio={aspectRatio}
          overlays={topicOverlays}
          selectWord={selectWord}
          topicImageType={topicImageType}
          hoveredWord={hoveredWord}
        />
      </div>
    );
  }
  return <div />;
};
