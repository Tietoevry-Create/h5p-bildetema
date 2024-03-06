import { AudioRefContext } from "common/context/AudioContext";
import {
  Language,
  NewWord,
  TopicGridSizes,
  TopicIds,
  Word,
} from "common/types/types";
import {
  FC,
  RefObject,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { getImageUrl } from "common/utils/image/image.utils";
import { getAudioFiles } from "common/utils/audio/audio.utils";
import { TopicGridElement } from "../TopicGridElement/TopicGridElement";
import { Words } from "../Words/Words";
import styles from "./TopicGrid.module.scss";
import { useCurrentLanguage } from "../../hooks/useCurrentLanguage";
import { newWordsIsTopics } from "common/utils/data.utils";

export type TopicGridProps = {
  // topics?: Topic[];
  // words?: Word[];
  topicsSize: TopicGridSizes;
  // setIsWordView: Dispatch<SetStateAction<boolean>>;
  showWrittenWords: boolean;
  currentLanguage: Language;
  // currentTopic?: TopicIds;
  toggleShowTopicImageView: (value: boolean) => void;
  showArticles: boolean;
  newWords: NewWord[]
};

export const TopicGrid: FC<TopicGridProps> = ({
  // topics,
  // words: test,
  topicsSize,
  // setIsWordView,
  showWrittenWords,
  currentLanguage,
  // currentTopic,
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

  const backendUrl = useBackendUrlContext()
  // const [searchParams, setSearchParams] = useSearchParams();
  const words = useMemo(() => {
    return newWords.map(w => {
      const labels = w.translations.get(currentLanguage.code)?.labels || [];
      const images = w.images.map(i => getImageUrl(i, backendUrl))
      const audioFiles = getAudioFiles(w.id, backendUrl, currentLanguage.code);
      const word: Word = {
        id: w.id,
        labels,
        images,
        audioFiles
      }
      return word
    })
  },[backendUrl, currentLanguage.code, newWords])

  // useEffect(() => {
  //   setIsWordView(!!words);
  //   if (!words) {
  //     searchParams.delete(SearchParameters.showTopicImageView);
  //     setSearchParams(searchParams);
  //   }
  // }, [words, setIsWordView, setSearchParams, searchParams]);
  
  const wordsIsTopics = newWordsIsTopics(newWords)

  const topicIds: TopicIds = {subTopicId: newWords.at(0)?.subTopicId, topicId: newWords.at(0)?.topicId}

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
        topic={topicIds}
        showWrittenWords={showWrittenWords}
        currentLanguage={currentLanguage.code}
        toggleShowTopicImageView={toggleShowTopicImageView}
        showArticles={showArticles}
      />
    );
  }

  return <h1>No topics</h1>;
};
