import type { Image } from "h5p-types";
import * as React from "react";

export type AppProps = {
  image: Image | undefined;
};

export const App: React.FC<AppProps> = ({ image }) => {
  return image ? (
    <img
      src={image.path}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  ) : null;
};
