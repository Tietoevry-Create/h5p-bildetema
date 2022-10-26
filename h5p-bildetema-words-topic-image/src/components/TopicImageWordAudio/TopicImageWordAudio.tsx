import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { Word as WordType } from "../../../../common/types/types";
import { useTranslation } from "../../hooks/useTranslation";
import styles from "./TopicImageWordAudio.module.scss";

type TopicImageWordAudioProps = {
  word: WordType;
  currentWordId: string | undefined;
  selectHoveredWord: (word: string) => void;
  unSelectWord: (word: string) => void;
  hoveredSVG: string | undefined;
};

export const TopicImageWordAudio: React.FC<TopicImageWordAudioProps> = ({
  word,
  currentWordId,
  selectHoveredWord,
  unSelectWord,
  hoveredSVG,
}) => {
  const { t } = useTranslation();
  const { label } = word;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleAudioEnded = React.useCallback(() => {
    setPlaying(false);
    unSelectWord("");

    // Do not want or need to trigger unSelectWord each time a word is selected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    const wordWasClickedInTopicImage = currentWordId === word.id && !playing;
    if (wordWasClickedInTopicImage) {
      // TODO: Fix
      // Effects can't trigger `HTMLAudioElement#play` in Safari.
      // Only direct user triggers (click, touch) can start audio and video
      audioElement.play();
      setPlaying(playing);
    }
  }, [currentWordId, playing, word.id]);

  const toggle = (): void => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    if (playing) {
      audioElement.pause();
      audioElement.currentTime = 0;
    } else {
      audioElement.play();
    }

    setPlaying(!playing);
  };

  useEffect(() => {
    // Reload sources whenever the language changes
    audioRef.current?.load();
    setPlaying(false);
  }, [word]);

  const showAsSelected = word.id === currentWordId || word.id === hoveredSVG;

  return (
    <div
      className={`${styles.wordAudio} ${showAsSelected ? styles.selected : ""}`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {word.audioFiles?.map(file => (
          <source key={file.mimeType} src={file.url} type={file.mimeType} />
        ))}
      </audio>
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => selectHoveredWord(word.id)}
        onMouseLeave={() => selectHoveredWord("")}
        onFocus={() => selectHoveredWord(word.id)}
        onBlur={() => selectHoveredWord("")}
      >
        <span className={styles.word_label}>
          {label}
          &nbsp;
        </span>
        <span className={styles.audioIconSpan}>
          <SpeakerIcon
            className={playing ? styles.audioIconActive : styles.audioIcon}
          />
        </span>
        <span className={styles.visuallyHidden}>
          {playing ? t("pauseAudio") : t("playAudio")}
        </span>
      </button>
    </div>
  );
};
