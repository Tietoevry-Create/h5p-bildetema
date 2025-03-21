import { SpeakerIcon, SpeakerPlayingIcon } from "common/components/Icons/Icons";
import { useAudioRefContext } from "common/hooks/useAudioContext";
import { AudioFile } from "common/types/AudioFile";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { useL10n } from "../../hooks/useL10n";
import { useSiteLanguageString } from "../../hooks/useSiteLanguage";
import styles from "./TopicGridElementAudio.module.scss";

type TopicGridElementAudioProps = {
  audioFiles?: AudioFile[];
};

export const TopicGridElementAudio: FC<TopicGridElementAudioProps> = ({
  audioFiles,
}) => {
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const lang = useSiteLanguageString();
  const { contextAudioRef, setContextAudioRef } = useAudioRefContext();

  const toggleAudio = (event: MouseEvent): void => {
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
      if (audioRef.current) {
        setContextAudioRef(audioRef as React.RefObject<HTMLAudioElement>);
      }
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
  const stopAudioLabel = useL10n("stopAudio");

  return (
    <div
      className={`${styles.wordAudio} ${playing ? styles.wordAudio_active : ""
        }`}
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
      <button type="button" onClick={toggleAudio}>
        <span className={styles.audioIconSpan} aria-hidden="true">
          {playing ? (
            <SpeakerPlayingIcon className={styles.audioIcon} />
          ) : (
            <SpeakerIcon className={styles.audioIcon} />
          )}
        </span>
        <span className={styles.visuallyHidden} lang={lang}>
          {playing ? stopAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
