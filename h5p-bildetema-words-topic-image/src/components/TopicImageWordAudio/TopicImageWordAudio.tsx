import * as React from "react";
import { useEffect, useState } from "react";
import { Word as WordType } from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import styles from "./TopicImageWordAudio.module.scss";

type TopicImageWordAudioProps = {
  word: WordType;
  currentWordId: string | undefined;
  hoveredWord: (word: string) => void;
  unSelectWord: (word: string) => void;
};

export const TopicImageWordAudio: React.FC<TopicImageWordAudioProps> = ({
  word,
  currentWordId,
  hoveredWord,
  unSelectWord,
}) => {
  const { label } = word;
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(word.audio));
  }, [word, word.audio]);

  const handleAudioEnded = React.useCallback(() => {
    setPlaying(false);
    unSelectWord("");

    // Do not want or need to trigger unSelectWord each time a word is selected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    audio?.addEventListener("ended", handleAudioEnded);

    return () => {
      audio?.removeEventListener("ended", handleAudioEnded);
    };
  }, [audio, handleAudioEnded]);

  useEffect(() => {
    if (currentWordId === word.id && !playing) {
      audio?.play();
      setPlaying(playing);
    }
  }, [audio, currentWordId, playing, word.id]);

  const toggle = (): void => {
    if (playing) {
      audio?.pause();
    } else {
      audio?.play();
    }

    setPlaying(!playing);
  };

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");

  return (
    <div
      className={`${styles.wordAudio} ${
        word.id === currentWordId ? styles.selected : ""
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => hoveredWord(word.id)}
        onMouseLeave={() => hoveredWord("")}
        onFocus={() => hoveredWord(word.id)}
        onBlur={() => hoveredWord("")}
      >
        <span className={styles.word_label}>
          {label}
          &nbsp;
        </span>
        <span className={styles.audioIconSpan}>
          <svg
            className={playing ? styles.audioIconActive : styles.audioIcon}
            viewBox="0 0 25 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.8999 8.5C18.2329 10.278 18.2329 13.722 16.8999 15.5" />
            <path d="M19.8999 5C23.8879 8.808 23.9119 15.217 19.8999 19" />
            <path d="M2.8999 14.959V9.04001C2.8999 8.46601 3.3479 8.00001 3.8999 8.00001H7.4859C7.61824 7.99954 7.7491 7.97228 7.87061 7.91986C7.99212 7.86744 8.10176 7.79095 8.1929 7.69501L11.1929 4.30701C11.8229 3.65101 12.8999 4.11601 12.8999 5.04301V18.957C12.8999 19.891 11.8099 20.352 11.1839 19.683L8.1939 16.314C8.10249 16.2153 7.99175 16.1365 7.86857 16.0825C7.74539 16.0285 7.61241 16.0004 7.4779 16H3.8999C3.3479 16 2.8999 15.534 2.8999 14.959Z" />
          </svg>
        </span>
        <span className={styles.visuallyHidden}>
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
