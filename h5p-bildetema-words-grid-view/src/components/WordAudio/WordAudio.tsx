import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { Word as WordType } from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import styles from "./WordAudio.module.scss";
import { useAudioRefContext } from "../../../../common/hooks/useAudioContext";

type WordAudioProps = {
  word: WordType;
  textVisible: boolean;
  showArticles: boolean;
};

export const WordAudio: React.FC<WordAudioProps> = ({
  word,
  textVisible,
  showArticles,
}) => {
  const { label, article } = word;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { contextAudioRef, setContextAudioRef } = useAudioRefContext();

  const text = article && showArticles ? `${article} ${label}` : label;
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
      audioElement.currentTime = 0;
    } else {
      if (contextAudioRef?.current) {
        contextAudioRef.current.pause();
        contextAudioRef.current.currentTime = 0;
      }
      setContextAudioRef(audioRef);
      audioElement.play();
    }

    setPlaying(!playing);
  };
  useEffect(() => {
    // Reload sources whenever the language changes
    audioRef.current?.load();
    setPlaying(false);
  }, [word]);

  useEffect(() => {
    setPlaying(audioRef.current?.paused === false);
  }, [audioRef.current?.paused]);

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div
      className={`${styles.wordAudio} ${
        textVisible ? "" : styles.wordAudioHideForPrint
      }`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {word.audioFiles?.map(file => (
          <source key={file.mimeType} src={file.url} type={file.mimeType} />
        ))}
      </audio>
      <button type="button" onClick={toggleAudio}>
        {textVisible && (
          <h2 className={styles.word_label}>
            {text}
            &nbsp;
          </h2>
        )}
        <span className={styles.audioIconSpan}>
          <SpeakerIcon
            className={playing ? styles.audioIconActive : styles.audioIcon}
          />
        </span>
        <span
          className={styles.visuallyHidden}
          lang={document.documentElement.lang}
        >
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
