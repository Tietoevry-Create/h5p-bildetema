/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-nested-ternary */
import { AudioRefContext } from "common/context/AudioContext";
import {
  CurrentTopics,
  Language,
  NewWord,
  TopicGridSizes,
  TopicIds,
} from "common/types/types";
import { FC, RefObject, useMemo, useState } from "react";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { newWordsIsTopics, newWordsToWords } from "common/utils/data.utils";
import { TopicGridElement } from "../TopicGridElement/TopicGridElement";
import { Words } from "../Words/Words";
import styles from "./TopicGrid.module.scss";
import ChooseCollectionDialog from "../SearchPage/ChooseCollectionDialog/ChooseCollectionDialog";
import { useChooseCollectionDialog } from "../../hooks/useChooseCollectionDialog";

export type TopicGridProps = {
  topicsSize: TopicGridSizes;
  showWrittenWords: boolean;
  currentLanguage: Language;
  toggleShowTopicImageView: (value: boolean) => void;
  showArticles: boolean;
  newWords: NewWord[];
  currentTopics: CurrentTopics;
};

export const TopicGrid: FC<TopicGridProps> = ({
  topicsSize,
  showWrittenWords,
  currentLanguage,
  toggleShowTopicImageView,
  showArticles,
  newWords,
  currentTopics,
}) => {
  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );

  const {
    isOpen,
    options,
    selectedCollection,
    selectedWordId,
    handleOpenDialog,
    handleCloseDialog,
    handleAddBookmark,
    handleSelectCollection,
  } = useChooseCollectionDialog();

  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);

  const backendUrl = useBackendUrlContext();
  const words = useMemo(() => {
    return newWordsToWords(newWords, currentLanguage.code, backendUrl);
  }, [backendUrl, currentLanguage.code, newWords]);

  const wordsIsTopics = newWordsIsTopics(newWords);

  const topicIds: TopicIds = {
    subTopicId: currentTopics?.subTopic?.id,
    topicId: currentTopics?.topic?.id,
  };

  return (
    <>
      <ChooseCollectionDialog
        open={isOpen}
        options={options}
        selectedCollection={selectedCollection}
        selectedWordId={selectedWordId}
        onSelectCollection={handleSelectCollection}
        onClose={handleCloseDialog}
        onAddBookmark={handleAddBookmark}
      />
      {wordsIsTopics ? (
        <ul
          role="list"
          className={`${
            topicsSize === TopicGridSizes.Big
              ? styles.gridBig
              : styles.gridCompact
          }`}
        >
          <AudioRefContext.Provider value={audioContextValue}>
            {newWords?.map(topic => {
              return (
                <TopicGridElement
                  key={topic.id}
                  topic={topic}
                  topicSize={topicsSize}
                  languageCode={currentLanguage.code}
                />
              );
            })}
          </AudioRefContext.Provider>
        </ul>
      ) : words ? (
        <Words
          words={words}
          topic={topicIds}
          showWrittenWords={showWrittenWords}
          currentLanguage={currentLanguage.code}
          toggleShowTopicImageView={toggleShowTopicImageView}
          showArticles={showArticles}
          onOpenDialog={handleOpenDialog}
        />
      ) : (
        <h1>No topics</h1>
      )}
    </>
  );
};
