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
  hoveredWord: string;
  selectHoveredSVG: (word: string) => void;
};

export const TopicImageSVG: React.FC<TopicImageSVGProps> = ({
  image,
  aspectRatio,
  overlays,
  topicImageType,
  selectWord,
  hoveredWord,
  selectHoveredSVG,
}) => {
  const overlayFields = overlays
    .slice(0)
    .reverse()
    .map(overlay => {
      const active = `${overlay.color}_active`;
      return (
        <g
          key={overlay.wordId}
          className={`${styles.overlay} ${styles[overlay.color]} ${
            hoveredWord === overlay.wordId ? styles[active] : ""
          }
        `}
          onClick={() => selectWord(overlay.wordId)}
          onMouseEnter={() => selectHoveredSVG(overlay.wordId)}
          onMouseLeave={() => selectHoveredSVG("")}
          onFocus={() => selectHoveredSVG(overlay.wordId)}
          onBlur={() => selectHoveredSVG("")}
          dangerouslySetInnerHTML={{ __html: overlay.outline }}
        />
      );
    });

  const isVertical = aspectRatio < 1;

  return (
    <div className={styles.imageContainer}>
      {topicImageType === "vectorImageWithHotspots" && (
        <div dangerouslySetInnerHTML={{ __html: image }} />
      )}
      {topicImageType === "nonVectorImageWithHotspots" && (
        <img
          className={isVertical ? styles.imageVertical : styles.imageHorizontal}
          src={image}
          alt=""
        />
      )}
      <svg
        className={`${styles.overlays} ${
          isVertical ? styles.overlaysVertical : ""
        }`}
        preserveAspectRatio="xMinYMin"
        viewBox={`0 0 100 ${100 / aspectRatio}`}
      >
        {overlayFields}
      </svg>
    </div>
  );
};
