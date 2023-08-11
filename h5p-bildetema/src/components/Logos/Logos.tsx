import { FC } from "react";

export type LogoProps = {
  logoColor?: string;
  role?: string;
  ariaLabel?: string;
};

export type LogoSizeProps = {
  width?: number;
  height?: number;
};

export const OsloMetLogo: FC<LogoProps & LogoSizeProps> = ({
  logoColor,
  width,
  height,
  role,
  ariaLabel,
}) => (
  <svg
    id="a"
    width={width || "80"}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 364.62 215.86"
    role={role}
    aria-label={ariaLabel}
  >
    <path
      d="M11.15,199.15c-14.71-14.71-14.99-36.66-.07-51.59,14.71-14.71,36.73-14.49,51.44,.21,14.71,14.71,14.92,36.74,.22,51.44-15,15-36.88,14.64-51.59-.07Zm39.46-39.46c-8.54-8.54-20.81-8.89-28.55-1.15-8.04,8.04-7.53,20.16,1,28.7,8.54,8.54,20.66,9.04,28.7,1.01,7.82-7.82,7.39-20.02-1.15-28.56Z"
      fill={logoColor || "#fff"}
    />
    <path
      d="M112.85,149.11c-11.91,11.91-26.19,11.41-36.45,1.15l11.12-11.12c4.81,4.81,10.62,5.31,16-.07,3.23-3.23,4.45-7.6,1.22-10.83-3.44-3.44-8.89-1.87-16.64,1.58-9.47,3.87-21.09,8.18-29.42-.15-9.54-9.54-7.46-22.24,1.87-31.57,10.98-10.98,24.4-10.19,32.86-1.72l-10.4,10.4c-3.66-3.08-8.47-3.45-12.77,.86-3.16,3.16-3.73,7.03-1,9.76,2.65,2.65,6.31,1.58,13.92-1.58,13.06-5.17,24.25-8.18,33.36,.93,9.54,9.54,6.74,21.95-3.66,32.36Z"
      fill={logoColor || "#fff"}
    />
    <path
      d="M147.63,62.51c-14.71-14.71-14.99-36.66-.07-51.58,14.71-14.71,36.73-14.49,51.44,.21,14.71,14.71,14.92,36.74,.22,51.44-15,15-36.88,14.63-51.59-.07Zm39.46-39.46c-8.54-8.54-20.81-8.89-28.55-1.15-8.04,8.04-7.53,20.16,1,28.7,8.54,8.54,20.66,9.04,28.7,1.01,7.82-7.82,7.39-20.02-1.15-28.56Z"
      fill={logoColor || "#fff"}
    />
    <path
      d="M156.85,81.37l10.95,10.95-28.5,28.5-49.89-49.89,11.12-11.12,38.94,38.94,17.38-17.38Z"
      fill={logoColor || "#fff"}
    />
    <path
      d="M354.3,188.23l-11.12-11.12-38.74,38.74-11.34-11.34,38.74-38.74-11.12-11.12,10.32-10.32,33.57,33.57-10.32,10.32Z"
      fill={logoColor || "#fff"}
    />
    <path
      d="M284.7,175.56l-10.33,10.33-29.22-29.22,49.11-49.11,29.19,29.19-10.33,10.33-18.15-18.15-8.99,8.99,16.46,16.46-9.76,9.76-16.46-16.46-9.7,9.7,18.17,18.17Z"
      fill={logoColor || "#fff"}
    />
    <path
      d="M236.11,147.63l-10.98-10.98,27.01-27.17-36.45,17.75-10.13-10.13,17.72-36.79-27.18,27.31-10.98-10.98,49.11-49.11,14.63,14.63-22.43,44.33,44.07-22.68,14.71,14.71-49.11,49.11Z"
      fill={logoColor || "#fff"}
    />
  </svg>
);
