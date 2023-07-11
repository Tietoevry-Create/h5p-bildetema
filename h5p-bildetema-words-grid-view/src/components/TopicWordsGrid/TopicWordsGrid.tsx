import * as React from "react";
import { Word as WordType } from "common/types/types";
import { AudioRefContext } from "common/context/AudioContext";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
  showWrittenWords: boolean;
  showArticles: boolean;
};

export const TopicWordsGrid: React.FC<TopicWordsGridProps> = ({
  words,
  showWrittenWords,
  showArticles,
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
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul role="list" className={styles.topicgrid}>
      <AudioRefContext.Provider value={audioContextValue}>
        {words.map(word => (
          <Word
            key={word.id}
            word={word}
            textVisible={showWrittenWords}
            showArticles={showArticles}
          />
        ))}
      </AudioRefContext.Provider>
    </ul>
  );
};
