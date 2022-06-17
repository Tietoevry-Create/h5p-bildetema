/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

export type IconProps = {
  iconColor?: string;
};

export type IconSizeProps = {
  width?: number;
  height?: number;
};

export const BreadcrumbsArrowIcon: React.FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg width="10" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 17 .067 15.567l6.6-6.6-6.6-6.6L1.5.933l8.034 8.034L1.5 17Z"
      fill="currentcolor"
    />
  </svg>
);
