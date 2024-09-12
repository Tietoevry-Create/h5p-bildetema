import { FC } from "react";

export type IconTransformProps = {
  transform?: string;
  transformOrigin?: string;
};

export const ArrowIcon: FC<IconTransformProps> = ({
  transform,
  transformOrigin,
}) => (
  <svg
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 9.49974L0 1.49974L1.43333 0.0664062L8 6.66641L14.5667 0.0997391L16 1.53307L8 9.49974Z"
      fill="currentColor"
      transform={transform}
      transform-origin={transformOrigin}
    />
  </svg>
);
