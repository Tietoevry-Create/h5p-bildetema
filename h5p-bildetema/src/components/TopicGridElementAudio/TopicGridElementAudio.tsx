import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  SpeakerIcon,
  SpeakerPlayingIcon,
} from "../../../../common/components/Icons/Icons";
import { AudioFile } from "../../../../common/types/AudioFile";
import { useL10n } from "../../hooks/useL10n";
import styles from "./TopicGridElementAudio.module.scss";
import { useAudioRefContext } from "../../../../common/hooks/useAudioContext";
import { useSiteLanguage } from "../../hooks/useSiteLanguage";

type TopicGridElementAudioProps = {
  audioFiles?: AudioFile[];
  audioPlaying: (state: boolean) => void;
};

export const TopicGridElementAudio: React.FC<TopicGridElementAudioProps> = ({
  audioFiles,
  audioPlaying,
}) => {
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const lang = useSiteLanguage();
  const { contextAudioRef, setContextAudioRef } = useAudioRefContext();

  const toggleAudio = (event: React.MouseEvent): void => {
    event.preventDefault();

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
    audioPlaying(!playing);
  };

  const handleAudioEnded = (): void => {
    setPlaying(false);
    audioPlaying(false);
  };

  useEffect(() => {
    // Reload sources whenever we get new audiofiles
    audioRef.current?.load();
    handleAudioEnded();
  }, [audioFiles]);

  useEffect(() => {
    setPlaying(audioRef.current?.paused === false);
    audioPlaying(audioRef.current?.paused === false);
  }, [audioRef.current?.paused]);

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div
      className={`${styles.wordAudio} ${
        playing ? styles.wordAudio_active : ""
      }`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {audioFiles?.map(file => (
          <source key={file.mimeType} src={file.url} type={file.mimeType} />
        ))}
      </audio>
      <button type="button" onClick={toggleAudio}>
        <span className={styles.audioIconSpan} aria-hidden="true">
          {playing ? (
            <SpeakerPlayingIcon className={styles.audioIcon} />
          ) : (
            <SpeakerIcon className={styles.audioIcon} />
          )}
        </span>
        <span className={styles.visuallyHidden} lang={lang}>
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
