// This mirrors the image sizes set in https://github.com/Tietoevry-Create/bildetema-backend/blob/main/scripts/src/scale-images.ts

import { ImageUrl } from "../../types/types";

// Permalink: https://github.com/Tietoevry-Create/bildetema-backend/blob/9c86a1256c4746357b9ae1cabd7feb8882495282/scripts/src/scale-images.ts#L10-L15
export const sizes = {
  small: 200,
  medium: 350,
  large: 600,
  xlarge: 1000,
} as const;

type sizes = typeof sizes;
export const gridImageSizes = [`${sizes.medium}px`] as const;

export const getImageSrc = (
  imgName: string,
  backedUrl: string,
  size: "small" | "medium" | "large" | "xlarge" = "medium",
  // width: number,
  // height: number,
): string => {
  return `${backedUrl}images/${size}/${imgName}`;
};

export const getImageSrcSet = (
  imgName: string,
  backedUrl: string,
): { src: string; width: number }[] => {
  const srcSet = Object.entries(sizes).map(([size, width]) => {
    return {
      src: `${getImageSrc(imgName, backedUrl, size as keyof sizes)}`,
      width,
    };
  });

  return srcSet;
};

export const getImageUrl = (
  imgName: string,
  backedUrl: string,
  includeSrcSets: boolean = true,
): ImageUrl => {
  const src = getImageSrc(imgName, backedUrl);
  const srcSets = includeSrcSets
    ? getImageSrcSet(imgName, backedUrl)
    : undefined;
  return { src, srcSets };
};
