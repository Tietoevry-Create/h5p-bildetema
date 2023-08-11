import { useContext } from "react";
import { AudioContextType, AudioRefContext } from "../context/AudioContext";

export const useAudioRefContext = (): AudioContextType =>
  useContext(AudioRefContext);
