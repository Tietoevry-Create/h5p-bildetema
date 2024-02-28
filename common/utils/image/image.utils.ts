// This mirrors the image sizes set in https://github.com/Tietoevry-Create/bildetema-backend/blob/main/scripts/src/scale-images.ts
// Permalink: https://github.com/Tietoevry-Create/bildetema-backend/blob/9c86a1256c4746357b9ae1cabd7feb8882495282/scripts/src/scale-images.ts#L10-L15
export const sizes = {
  small: 200,
  medium: 350,
  large: 600,
  xlarge: 1000,
} as const;

type sizes = typeof sizes
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
