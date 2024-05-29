import { AudioRefContext } from "common/context/AudioContext";
import { Word as WordType } from "common/types/types";
import { FC, RefObject, useMemo, useState } from "react";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
  showWrittenWords: boolean;
  showArticles: boolean;
  onOpenDialog: (id: string) => void;
};

export const TopicWordsGrid: FC<TopicWordsGridProps> = ({
  words,
  showWrittenWords,
  showArticles,
  onOpenDialog,
}) => {
  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );
  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
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
            onOpenDialog={onOpenDialog}
          />
        ))}
      </AudioRefContext.Provider>
    </ul>
  );
};
