import { Word } from "common/types/types";
import { FC, useState } from "react";
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
  showWrittenWords: boolean;
  showArticles: boolean;
};

export const TopicImageContainer: FC<TopicImageContainerProps> = ({
  topicImage,
  aspectRatio,
  topicOverlays,
  topicImageType,
  words,
  showWrittenWords,
  showArticles,
}) => {
  const [currentWordId, setCurrentWordId] = useState("");
  const [hoveredWord, setHoveredWord] = useState("");
  const [hoveredSVG, setHoveredSVG] = useState("");

  const selectWord = (word: string): void => {
    setCurrentWordId(word);
  };

  const selectHoveredWord = (word: string): void => {
    setHoveredWord(word);
  };

  const selectHoveredSVG = (word: string): void => {
    setHoveredSVG(word);
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
          selectHoveredWord={selectHoveredWord}
          selectWord={selectWord}
          hoveredSVG={hoveredSVG}
          showWrittenWords={showWrittenWords}
          showArticles={showArticles}
        />
        <TopicImageSVG
          image={topicImage}
          aspectRatio={aspectRatio}
          overlays={topicOverlays}
          selectWord={selectWord}
          topicImageType={topicImageType}
          hoveredWord={hoveredWord}
          selectHoveredSVG={selectHoveredSVG}
        />
      </div>
    );
  }
  return <div />;
};
