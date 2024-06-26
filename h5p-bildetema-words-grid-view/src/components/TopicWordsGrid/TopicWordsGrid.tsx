/* eslint-disable jsx-a11y/no-redundant-roles */
import { AudioRefContext } from "common/context/AudioContext";
import { Word as WordType } from "common/types/types";
import { useDialogContext } from "common/hooks/useDialogContext";
import { useChooseCollectionDialog } from "common/hooks/useChooseCollectionDialog";
import ChooseCollectionDialog from "common/components/ChooseCollectionDialog/ChooseCollectionDialog";
import { useMyCollections } from "common/hooks/useMyCollections";

import { FC, RefObject, useMemo, useState } from "react";
import { Word } from "../Word/Word";
import styles from "./TopicWordsGrid.module.scss";

type TopicWordsGridProps = {
  words: WordType[];
  showWrittenWords: boolean;
  showArticles: boolean;
};

export const TopicWordsGrid: FC<TopicWordsGridProps> = ({
  words,
  showWrittenWords,
  showArticles,
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

  const { isOpen, selectedId, handleCloseDialog, handleOpenDialog } =
    useDialogContext();
  const {
    options,
    selectedCollection,
    handleAddToCollection,
    handleSelectCollection,
  } = useChooseCollectionDialog();

  const { wordIdsInCollections } = useMyCollections();

  return (
    <>
      <ChooseCollectionDialog
        open={isOpen}
        options={options}
        selectedCollection={selectedCollection}
        selectedWordId={selectedId}
        onSelectCollection={handleSelectCollection}
        onClose={handleCloseDialog}
        onAddBookmark={() =>
          handleAddToCollection(selectedId, handleCloseDialog)
        }
      />
      <ul role="list" className={styles.topicgrid}>
        <AudioRefContext.Provider value={audioContextValue}>
          {words.map(word => (
            <Word
              key={word.id}
              word={word}
              textVisible={showWrittenWords}
              showArticles={showArticles}
              isInCollection={wordIdsInCollections.has(word.id)}
              onOpenDialog={handleOpenDialog}
            />
          ))}
        </AudioRefContext.Provider>
      </ul>
    </>
  );
};
