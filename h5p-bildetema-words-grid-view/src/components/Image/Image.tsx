import React from "react";
import styles from "./Image.module.scss";

export type srcSet = {
  src: string;
  width: number;
};

export type ImageProps = {
  src: string;
  srcSets?: srcSet[];
  width: string;
  height: string;
};

export const Image: React.FC<ImageProps> = ({
  src,
  srcSets,
  width,
  height,
}) => {
  return (
    <img
      className={styles.img}
      src={src}
      alt=""
      srcSet={srcSets?.map(image => `${image.src} ${image.width}w`).join(",")}
      width={width}
      height={height}
    />
  );
};
