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
    <path d="M12 21.5q-1.95 0-3.688-.75-1.737-.75-3.025-2.038Q4 17.425 3.25 15.688 2.5 13.95 2.5 12q0-1.975.75-3.7t2.037-3.013Q6.575 4 8.312 3.25 10.05 2.5 12 2.5q1.975 0 3.7.75t3.012 2.037Q20 6.575 20.75 8.3q.75 1.725.75 3.7 0 1.95-.75 3.688-.75 1.737-2.038 3.024Q17.425 20 15.7 20.75q-1.725.75-3.7.75Zm0-1.525q.775-1 1.288-2.037.512-1.038.862-2.263h-4.3q.35 1.25.863 2.287Q11.225 19 12 19.975Zm-1.925-.275q-.575-.825-1.037-1.875-.463-1.05-.713-2.15h-3.4q.8 1.55 2.125 2.613 1.325 1.062 3.025 1.412Zm3.85 0q1.7-.35 3.025-1.412 1.325-1.063 2.125-2.613h-3.4q-.3 1.1-.75 2.162-.45 1.063-1 1.863ZM4.3 14.175h3.725q-.1-.55-.15-1.088-.05-.537-.05-1.087 0-.55.05-1.088.05-.537.15-1.087H4.3q-.15.5-.225 1.05Q4 11.425 4 12t.075 1.125q.075.55.225 1.05Zm5.225 0h4.95q.1-.55.15-1.075.05-.525.05-1.1 0-.575-.05-1.1-.05-.525-.15-1.075h-4.95q-.1.55-.15 1.075-.05.525-.05 1.1 0 .575.05 1.1.05.525.15 1.075Zm6.45 0H19.7q.15-.5.225-1.05Q20 12.575 20 12t-.075-1.125q-.075-.55-.225-1.05h-3.725q.1.55.15 1.087.05.538.05 1.088t-.05 1.087q-.05.538-.15 1.088Zm-.3-5.85h3.4q-.8-1.575-2.112-2.613-1.313-1.037-3.038-1.437.575.875 1.025 1.912.45 1.038.725 2.138Zm-5.825 0h4.3q-.35-1.25-.887-2.313Q12.725 4.95 12 4.025q-.725.925-1.262 1.987-.538 1.063-.888 2.313Zm-4.925 0h3.4q.275-1.1.725-2.138.45-1.037 1.025-1.912-1.75.4-3.05 1.437-1.3 1.038-2.1 2.613Z" />
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
