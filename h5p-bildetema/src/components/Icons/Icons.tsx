/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

export type IconProps = {
  iconColor?: string;
};

export type IconSizeProps = {
  width?: number;
  height?: number;
};

export type IconTransformProps = {
  transform?: string;
  transformOrigin?: string;
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

export const BigTopicsIcon: React.FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "middle", marginLeft: "-4px" }}
  >
    <path
      d="M12.8888 6.66699H7.70355C7.1308 6.66699 6.6665 7.13129 6.6665 7.70404V12.8893C6.6665 13.462 7.1308 13.9263 7.70355 13.9263H12.8888C13.4615 13.9263 13.9258 13.462 13.9258 12.8893V7.70404C13.9258 7.13129 13.4615 6.66699 12.8888 6.66699Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.8888 18.0742H7.70355C7.1308 18.0742 6.6665 18.5385 6.6665 19.1113V24.2965C6.6665 24.8692 7.1308 25.3335 7.70355 25.3335H12.8888C13.4615 25.3335 13.9258 24.8692 13.9258 24.2965V19.1113C13.9258 18.5385 13.4615 18.0742 12.8888 18.0742Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.2962 6.66699H19.111C18.5383 6.66699 18.074 7.13129 18.074 7.70404V12.8893C18.074 13.462 18.5383 13.9263 19.111 13.9263H24.2962C24.869 13.9263 25.3333 13.462 25.3333 12.8893V7.70404C25.3333 7.13129 24.869 6.66699 24.2962 6.66699Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.2962 18.0742H19.111C18.5383 18.0742 18.074 18.5385 18.074 19.1113V24.2965C18.074 24.8692 18.5383 25.3335 19.111 25.3335H24.2962C24.869 25.3335 25.3333 24.8692 25.3333 24.2965V19.1113C25.3333 18.5385 24.869 18.0742 24.2962 18.0742Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CompactTopicsIcon: React.FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "middle", marginLeft: "-4px" }}
  >
    <path
      d="M5.33325 8H7.99992V10.6667H5.33325V8ZM5.33325 14.6667H7.99992V17.3333H5.33325V14.6667ZM5.33325 21.3333H7.99992V24H5.33325V21.3333ZM26.6666 10.6667V8H10.6973V10.6667H25.0666H26.6666ZM10.6666 14.6667H26.6666V17.3333H10.6666V14.6667ZM10.6666 21.3333H26.6666V24H10.6666V21.3333Z"
      fill="currentColor"
    />
  </svg>
);

export const LanguageMenuArrowIcon: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform={transform}
    transform-origin={transformOrigin}
  >
    <path
      d="M8 9.49974L0 1.49974L1.43333 0.0664062L8 6.66641L14.5667 0.0997391L16 1.53307L8 9.49974Z"
      fill="white"
    />
  </svg>
);
