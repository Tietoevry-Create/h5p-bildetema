/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import styles from "./WordAudio.module.scss";
import { Word as WordType } from "../../../../common/types/types";

type WordAudioProps = {
  word: WordType;
};

export const WordAudio: React.FC<WordAudioProps> = ({ word }) => {
  const [audio, setAudio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(word.audio));
  }, [word, word.audio]);

  useEffect(() => {
    if (playing) audio.play();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  const play = (): void => setPlaying(true);

  return (
    <div className={styles.wordAudio}>
      <button type="button" onClick={play}>
        🔊
      </button>
    </div>
  );
};
