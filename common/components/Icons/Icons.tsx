/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";

export type SpeakerIconProps = {
  className?: string;
};
export const SpeakerIcon: FC<SpeakerIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M16.4,8.5c1.3,1.8,1.3,5.2,0,7" />
      <path
        d="M2.4,15V9c0-0.6,0.4-1,1-1H7c0.1,0,0.3,0,0.4-0.1c0.1-0.1,0.2-0.1,0.3-0.2l3-3.4c0.6-0.7,1.7-0.2,1.7,0.7V19
			c0,0.9-1.1,1.4-1.7,0.7l-3-3.4c-0.1-0.1-0.2-0.2-0.3-0.2C7.2,16,7.1,16,7,16H3.4C2.8,16,2.4,15.5,2.4,15z"
      />
    </g>
  </svg>
);

export const SpeakerPlayingIcon: FC<SpeakerIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M16.4,8.5c1.3,1.8,1.3,5.2,0,7" />
      <path d="M19.4,5c4,3.8,4,10.2,0,14" />
      <path
        d="M2.4,15V9c0-0.6,0.4-1,1-1H7c0.1,0,0.3,0,0.4-0.1c0.1-0.1,0.2-0.1,0.3-0.2l3-3.4c0.6-0.7,1.7-0.2,1.7,0.7V19
			c0,0.9-1.1,1.4-1.7,0.7l-3-3.4c-0.1-0.1-0.2-0.2-0.3-0.2C7.2,16,7.1,16,7,16H3.4C2.8,16,2.4,15.5,2.4,15z"
      />
    </g>
  </svg>
);

export type IconProps = {
  iconColor?: string;
  size?: number;
  alternativeText?: string;
};

export type IconSizeProps = {
  width?: number;
  height?: number;
};

export type IconTransformProps = {
  transform?: string;
  transformOrigin?: string;
};

// export type IconType

export const HomeIcon: FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const BreadcrumbsArrowIcon: FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg
    width="10"
    height="17"
    fill="none"
    viewBox="0 0 10 17"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 17 .067 15.567l6.6-6.6-6.6-6.6L1.5.933l8.034 8.034L1.5 17Z"
      fill="currentcolor"
    />
  </svg>
);

export const LeftRightArrow: FC<IconProps & IconSizeProps> = ({
  iconColor = "currentColor",
  width = 16,
  height = 16,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={iconColor}
    viewBox="0 0 16 16"
  >
    <path d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
  </svg>
);

export const BreadcrumbsArrowLeftIcon: FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
}) => (
  <svg
    width="10"
    height="17"
    viewBox="0 0 10 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 17 .067 15.567l6.6-6.6-6.6-6.6L1.5.933l8.034 8.034L1.5 17Z"
      fill="currentcolor"
      transform="rotate(180)"
      // eslint-disable-next-line react/no-unknown-property
      transform-origin="center center"
    />
  </svg>
);

export const BigTopicsIcon: FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
  alternativeText = "Big Topics Icon",
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={alternativeText}
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

export const CompactTopicsIcon: FC<IconProps & IconSizeProps> = ({
  iconColor,
  width,
  height,
  alternativeText = "Compact Topics Icon",
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={alternativeText}
  >
    <path
      d="M5.33325 8H7.99992V10.6667H5.33325V8ZM5.33325 14.6667H7.99992V17.3333H5.33325V14.6667ZM5.33325 21.3333H7.99992V24H5.33325V21.3333ZM26.6666 10.6667V8H10.6973V10.6667H25.0666H26.6666ZM10.6666 14.6667H26.6666V17.3333H10.6666V14.6667ZM10.6666 21.3333H26.6666V24H10.6666V21.3333Z"
      fill="currentColor"
    />
  </svg>
);

export const LanguageMenuArrowIcon: FC<
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

export const StarFilledIcon: FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const StarOutlineIcon: FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
  </svg>
);

export const CheckIcon: FC<IconProps & IconSizeProps & IconTransformProps> = ({
  iconColor,
  width,
  height,
  transform,
  transformOrigin,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
  </svg>
);

export const PrintIcon: FC<IconProps & IconSizeProps & IconTransformProps> = ({
  iconColor,
  width,
  height,
  transform,
  transformOrigin,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
  </svg>
);

export const LanguageIcon: FC<
  IconProps & IconSizeProps & IconTransformProps
> = ({ iconColor, width, height, transform, transformOrigin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 21.5q-1.95 0-3.688-.75-1.737-.75-3.025-2.038Q4 17.425 3.25 15.688 2.5 13.95 2.5 12q0-1.975.75-3.7t2.037-3.013Q6.575 4 8.312 3.25 10.05 2.5 12 2.5q1.975 0 3.7.75t3.012 2.037Q20 6.575 20.75 8.3q.75 1.725.75 3.7 0 1.95-.75 3.688-.75 1.737-2.038 3.024Q17.425 20 15.7 20.75q-1.725.75-3.7.75Zm0-1.525q.775-1 1.288-2.037.512-1.038.862-2.263h-4.3q.35 1.25.863 2.287Q11.225 19 12 19.975Zm-1.925-.275q-.575-.825-1.037-1.875-.463-1.05-.713-2.15h-3.4q.8 1.55 2.125 2.613 1.325 1.062 3.025 1.412Zm3.85 0q1.7-.35 3.025-1.412 1.325-1.063 2.125-2.613h-3.4q-.3 1.1-.75 2.162-.45 1.063-1 1.863ZM4.3 14.175h3.725q-.1-.55-.15-1.088-.05-.537-.05-1.087 0-.55.05-1.088.05-.537.15-1.087H4.3q-.15.5-.225 1.05Q4 11.425 4 12t.075 1.125q.075.55.225 1.05Zm5.225 0h4.95q.1-.55.15-1.075.05-.525.05-1.1 0-.575-.05-1.1-.05-.525-.15-1.075h-4.95q-.1.55-.15 1.075-.05.525-.05 1.1 0 .575.05 1.1.05.525.15 1.075Zm6.45 0H19.7q.15-.5.225-1.05Q20 12.575 20 12t-.075-1.125q-.075-.55-.225-1.05h-3.725q.1.55.15 1.087.05.538.05 1.088t-.05 1.087q-.05.538-.15 1.088Zm-.3-5.85h3.4q-.8-1.575-2.112-2.613-1.313-1.037-3.038-1.437.575.875 1.025 1.912.45 1.038.725 2.138Zm-5.825 0h4.3q-.35-1.25-.887-2.313Q12.725 4.95 12 4.025q-.725.925-1.262 1.987-.538 1.063-.888 2.313Zm-4.925 0h3.4q.275-1.1.725-2.138.45-1.037 1.025-1.912-1.75.4-3.05 1.437-1.3 1.038-2.1 2.613Z" />
  </svg>
);

export const SearchIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </svg>
);

export const BackIcon: FC<IconProps & IconSizeProps & IconTransformProps> = ({
  iconColor,
  width,
  height,
  transform,
  transformOrigin,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 19v-4q0-1.25-.875-2.125T16 12H6.8l3.6 3.6L9 17l-6-6 6-6 1.4 1.4L6.8 10H16q2.075 0 3.538 1.462Q21 12.925 21 15v4Z" />
  </svg>
);

export const CheckedIcon: FC = () => (
  <svg width="14" height="11" viewBox="0 0 14 11" aria-hidden="true">
    <path
      d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
      fill="#fff"
    />
  </svg>
);

export const UncheckedIcon: FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path
      d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12"
      fill="#fff"
    />
  </svg>
);
export const Filter: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z" />
  </svg>
);

export const Close: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
  </svg>
);

export const DeleteIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
  </svg>
);

export const EditIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
  </svg>
);

export const MoreVertIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    display="block"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
  </svg>
);

export const AddIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
  </svg>
);

export const BookmarkIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="m480-240-168 72q-40 17-76-6.5T200-241v-519q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v519q0 43-36 66.5t-76 6.5l-168-72Zm0-88 200 86v-518H280v518l200-86Zm0-432H280h400-200Z" />
  </svg>
);

export const BookmarkFilledIcon: FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M11.9985 18.0002L16.1985 19.8002C16.8652 20.0836 17.4985 20.0294 18.0985 19.6377C18.6985 19.2461 18.9985 18.6919 18.9985 17.9752V5.00024C18.9985 4.45024 18.8027 3.97941 18.411 3.58774C18.0194 3.19608 17.5485 3.00024 16.9985 3.00024H6.99854C6.44853 3.00024 5.9777 3.19608 5.58603 3.58774C5.19437 3.97941 4.99854 4.45024 4.99854 5.00024V17.9752C4.99854 18.6919 5.29853 19.2461 5.89853 19.6377C6.49854 20.0294 7.13187 20.0836 7.79854 19.8002L11.9985 18.0002Z" />
  </svg>
);

export const ArrowRight: FC<{ className: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
    />
  </svg>
);

export const MoreHorizIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    display="block"
  >
    <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
  </svg>
);

export const ShareIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
  >
    <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
  </svg>
);

export const SuccessIcon: FC<IconProps> = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={`${size}px`}
    viewBox="0 -960 960 960"
    width={`${size}px`}
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
  </svg>
);

export const LinkIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
);

export const DownloadIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="img"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
  </svg>
);
