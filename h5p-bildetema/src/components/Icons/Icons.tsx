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

export const HomeIcon: React.FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    width="24px"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

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

export const BreadcrumbsArrowLeftIcon: React.FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg width="10" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 17 .067 15.567l6.6-6.6-6.6-6.6L1.5.933l8.034 8.034L1.5 17Z"
      fill="currentcolor"
      transform="rotate(180)"
      // eslint-disable-next-line react/no-unknown-property
      transform-origin="center center"
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
  >
    <path
      d="M8 9.49974L0 1.49974L1.43333 0.0664062L8 6.66641L14.5667 0.0997391L16 1.53307L8 9.49974Z"
      fill="currentColor"
      transform={transform}
      // eslint-disable-next-line react/no-unknown-property
      transform-origin={transformOrigin}
    />
  </svg>
);

export const StarFilledIcon: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="28px"
    viewBox="0 0 28 28"
    width="28px"
    fill="currentColor"
  >
    <g transform="scale(1.2)">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </g>
  </svg>
);

export const StarOutlineIcon: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="28px"
    viewBox="0 0 28 28"
    width="28px"
    fill="currentColor"
  >
    <g transform="scale(1.2)">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
    </g>
  </svg>
);

export const PrintIcon: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
  </svg>
);

export const LanguageIcon: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    fill="currentColor"
  >
    <path
      d="m23.75 44 9.05-24h4.1l9.3 24h-4.35l-2.05-6.3h-9.6L27.85 44Zm7.55-9.8h7.1l-3.5-9.7h-.1ZM8 38l-2.75-2.75 10.2-10.2q-1.9-2.2-3.375-4.425Q10.6 18.4 9.5 16h4.35q.85 1.65 1.875 3.125t2.325 3.025q2.25-2.35 3.75-4.875T24.35 12H2V8h14V4h4v4h14v4h-5.65q-1.1 3.45-2.925 6.775Q23.6 22.1 20.95 25.1l4.9 4.95-1.5 4.05L18 28Z"
      style={{ transform: "scale(0.5)" }}
    />
  </svg>
);

export const BackIcon: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    fill="currentColor"
  >
    <path d="M19 19v-4q0-1.25-.875-2.125T16 12H6.8l3.6 3.6L9 17l-6-6 6-6 1.4 1.4L6.8 10H16q2.075 0 3.538 1.462Q21 12.925 21 15v4Z" />
  </svg>
);

export const LanguageIcon2: React.FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    fill="currentColor"
  >
    <path
      d="M24 44q-4.2 0-7.85-1.575Q12.5 40.85 9.8 38.15q-2.7-2.7-4.25-6.375Q4 28.1 4 23.9t1.55-7.825Q7.1 12.45 9.8 9.75t6.35-4.225Q19.8 4 24 4q4.2 0 7.85 1.525Q35.5 7.05 38.2 9.75q2.7 2.7 4.25 6.325Q44 19.7 44 23.9t-1.55 7.875Q40.9 35.45 38.2 38.15t-6.35 4.275Q28.2 44 24 44Zm0-2.9q1.75-1.8 2.925-4.125Q28.1 34.65 28.85 31.45H19.2q.7 3 1.875 5.4Q22.25 39.25 24 41.1Zm-4.25-.6q-1.25-1.9-2.15-4.1-.9-2.2-1.5-4.95H8.6Q10.5 35 13 37.025q2.5 2.025 6.75 3.475Zm8.55-.05q3.6-1.15 6.475-3.45 2.875-2.3 4.625-5.55h-7.45q-.65 2.7-1.525 4.9-.875 2.2-2.125 4.1Zm-20.7-12h7.95q-.15-1.35-.175-2.425-.025-1.075-.025-2.125 0-1.25.05-2.225.05-.975.2-2.175h-8q-.35 1.2-.475 2.15T7 23.9q0 1.3.125 2.325.125 1.025.475 2.225Zm11.05 0H29.4q.2-1.55.25-2.525.05-.975.05-2.025 0-1-.05-1.925T29.4 19.5H18.65q-.2 1.55-.25 2.475-.05.925-.05 1.925 0 1.05.05 2.025.05.975.25 2.525Zm13.75 0h8q.35-1.2.475-2.225Q41 25.2 41 23.9q0-1.3-.125-2.25T40.4 19.5h-7.95q.15 1.75.2 2.675.05.925.05 1.725 0 1.1-.075 2.075-.075.975-.225 2.475Zm-.5-11.95h7.5q-1.65-3.45-4.525-5.75Q32 8.45 28.25 7.5q1.25 1.85 2.125 4t1.525 5Zm-12.7 0h9.7q-.55-2.65-1.85-5.125T24 7q-1.6 1.35-2.7 3.55-1.1 2.2-2.1 5.95Zm-10.6 0h7.55q.55-2.7 1.4-4.825.85-2.125 2.15-4.125-3.75.95-6.55 3.2T8.6 16.5Z"
      style={{ transform: "scale(0.5)" }}
    />
  </svg>
);
