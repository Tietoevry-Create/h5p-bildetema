import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
} from "react";

export type AudioContextType = {
  contextAudioRef: React.RefObject<HTMLAudioElement> | undefined;
  setContextAudioRef: (ref: RefObject<HTMLAudioElement>) => void;
};

export const AudioRefContext = createContext<AudioContextType>({
  contextAudioRef: undefined,
  setContextAudioRef: () => {},
});
