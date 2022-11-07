import React from "react";
import { AudioRefContext } from "../../../../common/context/AudioContext";
import { Word } from "../../../../common/types/types";
import { TopicImageWordAudio } from "../TopicImageWordAudio/TopicImageWordAudio";
import styles from "./TopicImageWordList.module.scss";

export type TopicImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
  selectHoveredWord: (word: string) => void;
  selectWord: (word: string) => void;
  hoveredSVG: string | undefined;
};

export const TopicImageWordList: React.FC<TopicImageWordListProps> = ({
  words,
  currentWordId,
  selectHoveredWord,
  selectWord,
  hoveredSVG,
}) => {
  const [contextAudioRef, setAudioRef] = React.useState(
    {} as React.RefObject<HTMLAudioElement>,
  );
  const audioContextValue = React.useMemo(() => {
    const setContextAudioRef = (
      ref: React.RefObject<HTMLAudioElement>,
    ): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);
  return (
    <AudioRefContext.Provider value={audioContextValue}>
      <div className={styles.topicImageWordList}>
        {words?.map((word: Word) => (
          <div className="topic-image-word-list-item" key={word.id}>
            <TopicImageWordAudio
              word={word}
              currentWordId={currentWordId}
              selectHoveredWord={selectHoveredWord}
              unSelectWord={selectWord}
              hoveredSVG={hoveredSVG}
            />
          </div>
        ))}
      </div>
    </AudioRefContext.Provider>
  );
};
