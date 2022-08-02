/* eslint-disable react/no-danger */
import React from "react";
import { OverlayType } from "../../types/OverlayType";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";
import styles from "./ThemeImageSVG.module.scss";

export type ThemeImageSVGProps = {
  image: string;
  overlays: OverlayType[];
  themeImageType: ThemeImageTypes;
  selectWord: (word: string) => void;
};

export const ThemeImageSVG: React.FC<ThemeImageSVGProps> = ({
  image,
  overlays,
  themeImageType,
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
      {themeImageType === "vectorImageWithHotspots" && (
        <div dangerouslySetInnerHTML={{ __html: image }} />
      )}
      {themeImageType === "nonVectorImageWithHotspots" && (
        <img style={{ width: "100%", height: "100%" }} src={image} alt="" />
      )}
      <svg
        className={styles.overlays}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {overlayFields}
      </svg>
    </div>
  );
};
