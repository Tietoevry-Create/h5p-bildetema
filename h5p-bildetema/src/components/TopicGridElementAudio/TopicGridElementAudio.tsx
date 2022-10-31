import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { AudioFile } from "../../../../common/types/AudioFile";
import { useL10n } from "../../hooks/useL10n";
import styles from "./TopicGridElementAudio.module.scss";

type TopicGridElementAudioProps = {
  audioFiles?: AudioFile[];
  audioRefFromParent: any;
  setAudioRef: any;
};

export const TopicGridElementAudio: React.FC<TopicGridElementAudioProps> = ({
  audioFiles,
  audioRefFromParent,
  setAudioRef,
}) => {
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

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
      if (audioRefFromParent) {
        audioRefFromParent?.current?.pause();
      }
      setAudioRef(audioRef);
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
