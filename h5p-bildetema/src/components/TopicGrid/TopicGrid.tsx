import { AudioRefContext } from "common/context/AudioContext";
import {
  Language,
  NewWord,
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
  newWords: NewWord[]
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
  newWords
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

  const wordsIsTopics = newWords.some(w => w.id.charAt(0) === "T")

  if (wordsIsTopics) {
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
