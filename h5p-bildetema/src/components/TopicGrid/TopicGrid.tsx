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
import { FC, JSX, RefObject, useMemo, useState } from "react";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { newWordsIsTopics, newWordsToWords } from "common/utils/data.utils";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { TopicGridElement } from "../TopicGridElement/TopicGridElement";
import { Words } from "../Words/Words";
import styles from "./TopicGrid.module.scss";
import { useL10n } from "../../hooks/useL10n";

export type TopicGridProps = {
  topicsSize: TopicGridSizes;
  showWrittenWords: boolean;
  currentLanguage: Language;
  toggleShowTopicImageView: (value: boolean) => void;
  showArticles: boolean;
  newWords: NewWord[];
  currentTopics: CurrentTopics;
  isFrontPage?: boolean;
};

export const TopicGrid: FC<TopicGridProps> = ({
  topicsSize,
  showWrittenWords,
  currentLanguage,
  toggleShowTopicImageView,
  showArticles,
  newWords,
  currentTopics,
  isFrontPage,
}) => {
  const allTopicsAccessibleLabel = useL10n("allTopicsAccessibleLabel");
  const topicsAccessibleLabel = useL10n("topicsAccessibleLabel");
  const subtopicAccessibleLabel = useL10n("subtopicAccessibleLabel");

  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );

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

  const subTopicLabel = useMemo(() => {
    if (currentTopics && currentTopics.topic) {
      const topicLabelOnSiteLanguage = currentTopics?.topic?.translations.get(
        currentLanguage.code,
      )?.labels[0].label;
      if (topicLabelOnSiteLanguage) {
        const subTranslation = replacePlaceholders(subtopicAccessibleLabel, {
          topic: topicLabelOnSiteLanguage,
        }).join("");
        return `${topicsAccessibleLabel} ${subTranslation}`;
      }
    }
    return topicsAccessibleLabel;
  }, [
    currentTopics,
    currentLanguage,
    subtopicAccessibleLabel,
    topicsAccessibleLabel,
  ]);

  const renderTopics = (): JSX.Element => (
    <ul
      role="list"
      className={
        topicsSize === TopicGridSizes.Big ? styles.gridBig : styles.gridCompact
      }
      aria-label={isFrontPage ? allTopicsAccessibleLabel : subTopicLabel}
    >
      <AudioRefContext.Provider value={audioContextValue}>
        {newWords?.map(topic => (
          <TopicGridElement
            key={topic.id}
            topic={topic}
            topicSize={topicsSize}
            languageCode={currentLanguage.code}
          />
        ))}
      </AudioRefContext.Provider>
    </ul>
  );

  const renderWords = (): JSX.Element => (
    <Words
      words={words}
      topic={topicIds}
      showWrittenWords={showWrittenWords}
      currentLanguage={currentLanguage.code}
      toggleShowTopicImageView={toggleShowTopicImageView}
      showArticles={showArticles}
    />
  );

  return (
    <div>
      {wordsIsTopics ? (
        renderTopics()
      ) : words ? (
        renderWords()
      ) : (
        <h1>No topics</h1>
      )}
    </div>
  );
};
