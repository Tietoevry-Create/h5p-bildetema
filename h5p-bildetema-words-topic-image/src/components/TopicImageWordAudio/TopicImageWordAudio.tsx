import { SpeakerIcon, SpeakerPlayingIcon } from "common/components/Icons/Icons";
import { useAudioRefContext } from "common/hooks/useAudioContext";
import { Word as WordType } from "common/types/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { extractWordLabel } from "common/utils/word.utils";
import { useL10n } from "../../hooks/useL10n";
import styles from "./TopicImageWordAudio.module.scss";

type TopicImageWordAudioProps = {
  word: WordType;
  currentWordId: string | undefined;
  selectHoveredWord: (word: string) => void;
  unSelectWord: (word: string) => void;
  hoveredSVG: string | undefined;
  showWrittenWords: boolean;
  showArticles: boolean;
};

export const TopicImageWordAudio: FC<TopicImageWordAudioProps> = ({
  word,
  currentWordId,
  selectHoveredWord,
  unSelectWord,
  hoveredSVG,
  showWrittenWords,
  showArticles,
}) => {
  const text = extractWordLabel(word, showArticles);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { contextAudioRef, setContextAudioRef } = useAudioRefContext();

  const handleAudioEnded = useCallback(() => {
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
      setPlaying(true);
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

  const showAsSelected = word.id === currentWordId || word.id === hoveredSVG;

  return (
    <div
      className={`${styles.wordAudio} ${
        playing ? styles.wordAudio_active : ""
      } ${showAsSelected ? styles.selected : ""}`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnded}>
        {word.audioFiles?.map((file, index) => (
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
        onClick={toggle}
        onMouseEnter={() => selectHoveredWord(word.id)}
        onMouseLeave={() => selectHoveredWord("")}
        onFocus={() => selectHoveredWord(word.id)}
        onBlur={() => selectHoveredWord("")}
      >
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
        {showWrittenWords && (
          <span className={styles.word_label}>
            {text}
            &nbsp;
          </span>
        )}
      </button>
    </div>
  );
};
