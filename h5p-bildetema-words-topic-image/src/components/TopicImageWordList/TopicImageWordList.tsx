import { AudioRefContext } from "common/context/AudioContext";
import { Word } from "common/types/types";
import { FC, RefObject, useMemo, useState } from "react";
import { TopicImageWordAudio } from "../TopicImageWordAudio/TopicImageWordAudio";
import styles from "./TopicImageWordList.module.scss";

export type TopicImageWordListProps = {
  words: Word[];
  currentWordId: string | undefined;
  selectHoveredWord: (word: string) => void;
  selectWord: (word: string) => void;
  hoveredSVG: string | undefined;
  showWrittenWords: boolean;
  showArticles: boolean;
};

export const TopicImageWordList: FC<TopicImageWordListProps> = ({
  words,
  currentWordId,
  selectHoveredWord,
  selectWord,
  hoveredSVG,
  showWrittenWords,
  showArticles,
}) => {
  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);
  return (
    <AudioRefContext.Provider value={audioContextValue}>
      <div
        className={`${styles.topicImageWordList} ${
          showWrittenWords ? "" : styles.hideFromPrint
        }`}
      >
        {words?.map((word: Word) => (
          <div className="topic-image-word-list-item" key={word.id}>
            <TopicImageWordAudio
              word={word}
              currentWordId={currentWordId}
              selectHoveredWord={selectHoveredWord}
              unSelectWord={selectWord}
              hoveredSVG={hoveredSVG}
              showWrittenWords={showWrittenWords}
              showArticles={showArticles}
            />
          </div>
        ))}
      </div>
    </AudioRefContext.Provider>
  );
};
