import { SpeakerIcon, SpeakerPlayingIcon } from "common/components/Icons/Icons";
import { useAudioRefContext } from "common/hooks/useAudioContext";
import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Audio.module.scss";
import { AudioFile } from "../../types/AudioFile";

type AudioProps = {
  lang: string;
  labelLang?: string;
  stopAudioLabel: string;
  playAudioLabel: string;
  audioFiles?: AudioFile[];
  label?: string;
  rtl?: boolean;
  lowerCaseLabel?: boolean;
};

export const Audio: FC<AudioProps> = ({
  label,
  labelLang,
  audioFiles,
  lang,
  stopAudioLabel,
  playAudioLabel,
  rtl,
  lowerCaseLabel = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { contextAudioRef, setContextAudioRef } = useAudioRefContext();
  const descriptionId = uuid();
  const textVisible = !!label;

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
  }, [audioFiles]);

  useEffect(() => {
    setPlaying(audioRef.current?.paused === false);
  }, [audioRef.current?.paused]);

  return (
    <div
      className={`${styles.wordAudio} ${
        textVisible ? "" : styles.wordAudioHideForPrint
      } ${playing ? styles.wordAudio_active : ""}`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {audioFiles?.map((file, index) => (
          <source
            // eslint-disable-next-line react/no-array-index-key
            key={`${file.mimeType}-${index}`}
            src={`${file.url}?v=1`} // Force reload
            type={file.mimeType}
          />
        ))}
      </audio>
      <button
        type="button"
        onClick={toggleAudio}
        className={rtl ? styles.rtl : ""}
        aria-describedby={descriptionId}
        lang={labelLang}
      >
        {textVisible && (
          <h2
            className={`${styles.word_label} ${
              lowerCaseLabel && styles.lowerCaseLabel
            }`}
          >
            {label}
            &nbsp;
          </h2>
        )}
        <span className={styles.audioIconSpan} aria-hidden="true">
          {playing ? (
            <SpeakerPlayingIcon className={styles.audioIcon} />
          ) : (
            <SpeakerIcon className={styles.audioIcon} />
          )}
        </span>
        <span
          id={descriptionId}
          className={styles.visuallyHidden}
          aria-hidden="true"
          lang={lang}
        >
          {playing ? stopAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
