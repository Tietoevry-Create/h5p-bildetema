import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { AudioFile } from "../../../../common/types/AudioFile";
import { useL10n } from "../../hooks/useL10n";
import styles from "./TopicGridElementAudio.module.scss";
import { useAudioRefContext } from "../../../../common/hooks/useAudioContext";

type TopicGridElementAudioProps = {
  audioFiles?: AudioFile[];
};

export const TopicGridElementAudio: React.FC<TopicGridElementAudioProps> = ({
  audioFiles,
}) => {
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

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
  };

  const handleAudioEnded = (): void => {
    setPlaying(false);
  };

  useEffect(() => {
    // Reload sources whenever we get new audiofiles
    audioRef.current?.load();
    handleAudioEnded();
  }, [audioFiles]);

  useEffect(() => {
    setPlaying(audioRef.current?.paused === false);
  }, [audioRef.current?.paused]);

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div className={styles.wordAudio}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {audioFiles?.map(file => (
          <source key={file.mimeType} src={file.url} type={file.mimeType} />
        ))}
      </audio>
      <button type="button" onClick={toggleAudio}>
        <SpeakerIcon
          className={playing ? styles.audioIconActive : styles.audioIcon}
        />
        <span className={styles.visuallyHidden}>
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
