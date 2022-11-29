import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { SpeakerIcon } from "../../../../common/components/Icons/Icons";
import { Word as WordType } from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import styles from "./WordAudio.module.scss";
// import { useAudioRefContext } from "../../../../common/hooks/useAudioContext";

type WordAudioProps = {
  word: WordType;
  textVisible: boolean;
  showArticles: boolean;
};

export const WordAudio: React.FC<WordAudioProps> = ({
  word,
  textVisible,
  showArticles,
}) => {
  const { label, article } = word;
  const [playing, setPlaying] = useState(false);

  // const { contextAudioRef, setContextAudioRef } = useAudioRefContext();

  const text = article && showArticles ? `${article} ${label}` : label;
  const handleAudioEnded = (): void => {
    setPlaying(false);
  };

  const [audio, setAudio] = useState(
    new Howl({
      src: word.audioFiles?.map(file => file.url) || "",
      onend: handleAudioEnded,
    }),
  );

  const toggleAudio = (): void => {
    if (playing) {
      audio.stop();
    } else {
      // if (contextAudioRef?.current) {
      //   contextAudioRef.current.pause();
      //   contextAudioRef.current.currentTime = 0;
      // }
      // setContextAudioRef(audioRef);
      audio.play();
    }

    setPlaying(!playing);
  };
  
  useEffect(() => {
    // Reload sources whenever the language changes
    setAudio(new Howl({
      src: word.audioFiles?.map(file => file.url) || "",
      onend: handleAudioEnded,
    }))
    setPlaying(false);
  }, [word]);

  useEffect(() => {
    setPlaying(audio.playing() === true);
  }, [audio, setPlaying]);

  const playAudioLabel = useL10n("playAudio");
  const pauseAudioLabel = useL10n("pauseAudio");
  // const sound = new Howl({
  //   src: word.audioFiles?.map(file =>file.url)
  // })
  return (
    <div
      className={`${styles.wordAudio} ${
        textVisible ? "" : styles.wordAudioHideForPrint
      }`}
    >
      {/* <button
        type="button"
        onClick={() => console.log(audio.playing())}
      >
        {" "}
        hei
      </button> */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      {/* <audio ref={audioRef} onEnded={handleAudioEnded}>
        {word.audioFiles?.map(file => (
          <source key={file.mimeType} src={file.url} type={file.mimeType} />
        ))}
      </audio> */}
      <button type="button" onClick={toggleAudio}>
        {textVisible && (
          <h2 className={styles.word_label}>
            {text}
            &nbsp;
          </h2>
        )}
        <span className={styles.audioIconSpan}>
          <SpeakerIcon
            className={playing ? styles.audioIconActive : styles.audioIcon}
          />
        </span>
        <span className={styles.visuallyHidden}>
          {playing ? pauseAudioLabel : playAudioLabel}
        </span>
      </button>
    </div>
  );
};
