import { AudioRefContext } from "common/context/AudioContext";
import {
  Language,
  Topic,
  TopicGridSizes,
  TopicIds,
  Word,
} from "common/types/types";
import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParameters } from "../../enums/SearchParameters";
import { TopicGridElement } from "../TopicGridElement/TopicGridElement";
import { Words } from "../Words/Words";
import styles from "./TopicGrid.module.scss";

export type TopicGridProps = {
  topics?: Topic[];
  words?: Word[];
  topicsSize: TopicGridSizes;
  setIsWordView: Dispatch<SetStateAction<boolean>>;
  showWrittenWords: boolean;
  currentLanguage: Language;
  currentTopic?: TopicIds;
  toggleShowTopicImageView: (value: boolean) => void;
  showArticles: boolean;
};

export const TopicGrid: FC<TopicGridProps> = ({
  topics,
  words,
  topicsSize,
  setIsWordView,
  showWrittenWords,
  currentLanguage,
  currentTopic,
  toggleShowTopicImageView,
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

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsWordView(!!words);
    if (!words) {
      searchParams.delete(SearchParameters.showTopicImageView);
      setSearchParams(searchParams);
    }
  }, [words, setIsWordView, setSearchParams, searchParams]);

  if (topics) {
    return (
      // eslint-disable-next-line jsx-a11y/no-redundant-roles
      <ul
        role="list"
        className={`${
          topicsSize === TopicGridSizes.Big
            ? styles.gridBig
            : styles.gridCompact
        }`}
      >
        <AudioRefContext.Provider value={audioContextValue}>
          {topics?.map(topic => {
            return (
              <TopicGridElement
                key={topic.id}
                title={
                  topic.labelTranslations.get(currentLanguage.code)?.label ||
                  topic.id
                }
                images={topic.images}
                topicSize={topicsSize}
                languageCode={currentLanguage.code}
                topic={topic}
              />
            );
          })}
        </AudioRefContext.Provider>
      </ul>
    );
  }

  if (words) {
    return (
      <Words
        words={words}
        topic={currentTopic}
        showWrittenWords={showWrittenWords}
        currentLanguage={currentLanguage.code}
        toggleShowTopicImageView={toggleShowTopicImageView}
        showArticles={showArticles}
      />
    );
  }

  return <h1>No topics</h1>;
};
