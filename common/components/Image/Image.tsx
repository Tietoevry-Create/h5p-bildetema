import { FC } from "react";
import styles from "./Image.module.scss";

export type srcSet = {
  src: string;
  width: number;
};

export type ImageProps = {
  src: string;
  width: string;
  height?: string;
  srcSets?: srcSet[];
  sizes?: ReadonlyArray<string>;
};

export const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  srcSets,
  sizes: initialSizes,
}) => {
  const sizes = initialSizes?.length
    ? initialSizes.join(",")
    : srcSets
        ?.map(image => `(max-width: ${image.width}px) ${image.width}px`)
        .join(",");

  return (
    <img
      loading="lazy"
      className={styles.img}
      src={src}
      alt=""
      srcSet={srcSets?.map(image => `${image.src} ${image.width}w`).join(",")}
      sizes={sizes}
      width={width}
      height={height}
    />
  );
};
