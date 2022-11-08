import { useContext } from "react";
import { AudioRefContext } from "../context/AudioContext";

export const useAudioRefContext = () => useContext(AudioRefContext);
