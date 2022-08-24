import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { Word as WordType } from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import styles from "./WordAudio.module.scss";

type WordAudioProps = {
  word: WordType;
  textVisible: boolean;
};

export const WordAudio: React.FC<WordAudioProps> = ({ word, textVisible }) => {
  const { label } = word;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleAudioEnded = (): void => {
    setPlaying(false);
  };

  const toggleAudio = (): void => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    if (playing) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setPlaying(!playing);
  };

  useEffect(() => {
    // Reload sources whenever the language changes
    audioRef.current?.load();
  }, [word]);

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div className={styles.wordAudio}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {word.audioFiles?.map(file => (
          <source src={file.url} type={file.mimeType} />
        ))}
      </audio>
      <button type="button" onClick={toggleAudio}>
        {textVisible && (
          <span className={styles.word_label}>
            {label}
            &nbsp;
          </span>
        )}
        <span className={styles.audioIconSpan}>
          <SpeakerIcon
            className={playing ? styles.audioIconActive : styles.audioIcon}
          />
        </span>
        <span className={styles.visuallyHidden}>
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
