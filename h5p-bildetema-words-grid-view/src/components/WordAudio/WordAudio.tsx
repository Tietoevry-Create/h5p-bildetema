import * as React from "react";
import { useEffect, useState } from "react";
import { Word as WordType } from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import styles from "./WordAudio.module.scss";

type WordAudioProps = {
  word: WordType;
};

export const WordAudio: React.FC<WordAudioProps> = ({ word }) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(word.audio));
  }, [word, word.audio]);

  useEffect(() => {
    audio?.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio?.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  const toggle = (): void => {
    if (playing) {
      audio?.pause();
    } else {
      audio?.play();
    }

    setPlaying(!playing);
  };

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div className={styles.wordAudio}>
      <button type="button" onClick={toggle}>
        🔊
        <span className={styles.visuallyHidden}>
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
