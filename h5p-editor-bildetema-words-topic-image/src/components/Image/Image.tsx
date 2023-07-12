import type { H5PImage } from "h5p-types";
import { FC } from "react";
import styles from "./Image.module.scss";

export type ImageProps = {
  image: H5PImage | undefined;
};

export const Image: FC<ImageProps> = ({ image }) => {
  return image ? (
    <img
      className={styles.image}
      src={image.path}
      alt={image.alt ?? ""}
      width={image.width}
      height={image.height}
    />
  ) : null;
};
