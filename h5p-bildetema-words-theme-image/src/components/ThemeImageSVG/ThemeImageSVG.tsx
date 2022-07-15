/* eslint-disable react/no-danger */
import React from "react";
import { Word } from "../../../../common/types/types";
import { OverlayType } from "../../types/OverlayType";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";
import styles from "./ThemeImageSVG.module.scss";

export type ThemeImageSVGProps = {
  words: Word[];
  image: string;
  overlays: OverlayType[];
  themeImageType: ThemeImageTypes;
  selectWord: (word: string) => void;
};

export const ThemeImageSVG: React.FC<ThemeImageSVGProps> = ({
  image,
  words,
  overlays,
  themeImageType,
  selectWord,
}) => {
  console.info("ThemeImageSVG", image, words, overlays, themeImageType);
  const overlayFields = overlays.map((overlay, index) => {
    return (
      <g
        className={styles.overlay}
        onClick={() => selectWord(overlay.wordId)}
        dangerouslySetInnerHTML={{ __html: overlay.outline }}
      />
    );
  });
  return (
    <div className={styles.imageContainer}>
      {themeImageType === "vectorImageWithHotspots" &&
        <div dangerouslySetInnerHTML={{ __html: image }} />
      }
      {themeImageType === "nonVectorImageWithHotspots" &&
        <img src={image} alt="" />
      }
      <svg className={styles.overlays}>{overlayFields}</svg>
    </div>
  );
};
