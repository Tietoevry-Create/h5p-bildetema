/* eslint-disable react/no-danger */
import { FC } from "react";
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

export const TopicImageSVG: FC<TopicImageSVGProps> = ({
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

  // Hack to show topic image when running locally in vite dev
  const svgImage =
    typeof process === "undefined"
      ? image
      : `http://localhost:8090/wp-content/uploads/h5p/${image
          .split("//")
          .at(2)}`;

  return (
    <div className={styles.imageContainer}>
      {topicImageType === "vectorImageWithHotspots" && (
        <div dangerouslySetInnerHTML={{ __html: image }} />
      )}
      {topicImageType === "nonVectorImageWithHotspots" && (
        <img
          className={isVertical ? styles.imageVertical : styles.imageHorizontal}
          src={svgImage}
          alt=""
        />
      )}
      <svg
        role="img"
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
