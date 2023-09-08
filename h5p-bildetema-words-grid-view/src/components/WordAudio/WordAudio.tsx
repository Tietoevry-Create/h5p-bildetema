import { SpeakerIcon, SpeakerPlayingIcon } from "common/components/Icons/Icons";
import { useAudioRefContext } from "common/hooks/useAudioContext";
import { Word as WordType } from "common/types/types";
import { FC, useEffect, useRef, useState } from "react";
import { extractWordLabel } from "common/utils/word.utils";
import { useL10n } from "../../hooks/useL10n";
import styles from "./WordAudio.module.scss";

type WordAudioProps = {
  word: WordType;
  textVisible: boolean;
  showArticles: boolean;
};

export const WordAudio: FC<WordAudioProps> = ({
  word,
  textVisible,
  showArticles,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { contextAudioRef, setContextAudioRef } = useAudioRefContext();

  const text = extractWordLabel(word, showArticles);

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

  const lang = useL10n("htmlLanguageCode");
  const playAudioLabel = useL10n("playAudio");
  const stopAudioLabel = useL10n("stopAudio");

  return (
    <div
      className={`${styles.wordAudio} ${
        textVisible ? "" : styles.wordAudioHideForPrint
      } ${playing ? styles.wordAudio_active : ""}`}
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
