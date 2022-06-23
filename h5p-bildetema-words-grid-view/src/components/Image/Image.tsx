import React from "react";
import styles from "./Image.module.scss";

export type ImageProps = {
  src: string;
  srcSet?: string;
  width?: string;
  height?: string;
};

export const Image: React.FC<ImageProps> = ({ src, srcSet, width, height }) => {
  return (
    <img
      className={styles.img}
      src={src}
      alt=""
      srcSet={srcSet}
      width={width}
      height={height}
    />
  );
};
