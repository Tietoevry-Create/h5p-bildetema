/* eslint-disable react/no-danger */
import React from "react";
import { OverlayType } from "../../types/OverlayType";
import { TopicImageTypes } from "../../types/TopicImageTypes";
import styles from "./TopicImageSVG.module.scss";

export type TopicImageSVGProps = {
  image: string;
  aspectRatio: number;
  overlays: OverlayType[];
  topicImageType: TopicImageTypes;
  selectWord: (word: string) => void;
};

export const TopicImageSVG: React.FC<TopicImageSVGProps> = ({
  image,
  aspectRatio,
  overlays,
  topicImageType,
  selectWord,
}) => {
  const overlayFields = overlays.map(overlay => (
    <g
      key={overlay.wordId}
      className={styles.overlay}
      onClick={() => selectWord(overlay.wordId)}
      dangerouslySetInnerHTML={{ __html: overlay.outline }}
    />
  ));

  return (
    <div className={styles.imageContainer}>
      {topicImageType === "vectorImageWithHotspots" && (
        <div dangerouslySetInnerHTML={{ __html: image }} />
      )}
      {topicImageType === "nonVectorImageWithHotspots" && (
        <img style={{ width: "100%", height: "100%" }} src={image} alt="" />
      )}
      <svg
        className={styles.overlays}
        preserveAspectRatio="none"
        viewBox={`0 0 100 ${100 / aspectRatio}`}
      >
        {overlayFields}
      </svg>
    </div>
  );
};