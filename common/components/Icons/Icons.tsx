import * as React from "react";
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
