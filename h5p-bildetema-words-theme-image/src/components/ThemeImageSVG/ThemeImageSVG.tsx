/* eslint-disable react/no-danger */
import React from "react";
import { Word } from "../../../../common/types/types";
import { OverlayType } from "../../types/OverlayType";
import styles from "./ThemeImageSVG.module.scss";

export type ThemeImageSVGProps = {
  words: Word[];
  image: string;
  overlays: OverlayType[];
  selectWord: (word: string) => void;
};

export const ThemeImageSVG: React.FC<ThemeImageSVGProps> = ({
  image,
  words,
  overlays,
  selectWord,
}) => {
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
      <div dangerouslySetInnerHTML={{ __html: image }} />
      <svg className={styles.overlays}>{overlayFields}</svg>
    </div>
  );
};
