import React from 'react'
import type { Image as ImageType } from "h5p-types";
import styles from "./Image.module.scss"

export type ImageProps = {
  image: ImageType | undefined
}

export const Image: React.FC<ImageProps> = ({ image }) => {
  return image ? (
    <img className={styles.image}
      src={image.path}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  ) : null;
}
