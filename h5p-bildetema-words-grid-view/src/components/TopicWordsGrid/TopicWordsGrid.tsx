import { FC, RefObject, useMemo, useState } from "react";

import ChooseCollectionsDialog from "common/components/ChooseCollectionsDialog/ChooseCollectionsDialog";
import CustomSuccessToastMessage from "common/components/ToastMessages/CustomSuccessToastMessage";
import { AudioRefContext } from "common/context/AudioContext";
import { useDialogContext } from "common/hooks/useDialogContext";
import { Word as WordType } from "common/types/types";
import { useMediaQuery } from "react-responsive";

import { useMyCollections } from "common/hooks/useMyCollections";

import { SnackbarProvider } from "notistack";

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
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);

  const { handleOpenDialog } = useDialogContext();
  const { wordIdsInCollections } = useMyCollections();
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: isMobile ? "center" : "right",
        vertical: "top",
      }}
      Components={{
        success: CustomSuccessToastMessage,
      }}
    >
      <ChooseCollectionsDialog />
      <ul
        // biome-ignore lint/a11y/noRedundantRoles: The role is necessary because Safari will change the aria role if the `display` CSS property is changed
        role="list"
        className={styles.topicgrid}
      >
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
    </SnackbarProvider>
  );
};
