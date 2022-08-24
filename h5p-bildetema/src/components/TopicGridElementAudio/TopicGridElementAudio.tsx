import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { audioContainerURL } from "../../../../common/constants/urls";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { getAudioURLs } from "../../../../common/utils/audio/audio.utils";
import { useL10n } from "../../hooks/useL10n";
import styles from "./TopicGridElementAudio.module.scss";

type TopicGridElementAudioProps = {
  topicId: string;
  languageCode: LanguageCode;
};

export const TopicGridElementAudio: React.FC<TopicGridElementAudioProps> = ({
  topicId,
  languageCode,
}) => {
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const audioFiles = useMemo(
    () => getAudioURLs(audioContainerURL, languageCode, topicId),
    [languageCode, topicId],
  );

  const toggleAudio = (event: React.MouseEvent): void => {
    event.preventDefault();

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

  const handleAudioEnded = (): void => {
    setPlaying(false);
  };

  useEffect(() => {
    // Reload sources whenever the language changes
    audioRef.current?.load();
  }, [languageCode]);

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div className={styles.wordAudio}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {audioFiles.map(file => (
          <source src={file.url} type={file.mimeType} />
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
