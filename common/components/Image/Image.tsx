import { FC, useMemo } from "react";
import styles from "./Image.module.scss";
import { useBackendUrlContext } from "../../hooks/useBackendUrlContext";
import { getImageUrl } from "../../utils/image/image.utils";

export type srcSet = {
  src: string;
  width: number;
};

export type ImageProps = {
  src: string;
  width: string;
  height: string;
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
  const backendUrl = useBackendUrlContext();

  const fallbackImageSrcSets = useMemo(() => {
    const fallbackImage = getImageUrl("fallback.jpg", backendUrl);
    const images = fallbackImage.srcSets as srcSet[];
    return images;
  }, [backendUrl]);

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
      onError={e => {
        (e.target as HTMLImageElement).onerror = null;
        (e.target as HTMLImageElement).srcset =
          fallbackImageSrcSets
            ?.map(image => `${image.src} ${image.width}w`)
            .join(",") || "";
      }}
      alt=""
      srcSet={srcSets?.map(image => `${image.src} ${image.width}w`).join(",")}
      sizes={sizes}
      width={width}
      height={height}
    />
  );
};
