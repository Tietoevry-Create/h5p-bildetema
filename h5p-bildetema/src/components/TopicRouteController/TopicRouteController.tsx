import { useDBContext } from "common/hooks/useDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { Language, TopicGridSizes, TopicIds } from "common/types/types";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useH5PInstance } from "use-h5p";
import { H5PWrapper } from "../../h5p/H5PWrapper";
import {
  findTopic,
  langIdToLanguage,
  validRoute,
} from "../../utils/router/router.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import { SubHeader } from "../SubHeader/SubHeader";
import { SearchParameters } from "../../enums/SearchParameters";
import { useCurrentLanguage } from "../../hooks/useCurrentLanguage";

export type TopicRouteControllerProps = {
  setTopicIds: Dispatch<SetStateAction<TopicIds>>;
  favLanguages: Language[];
  addFavoriteLanguage: (language: Language, favorite: boolean) => void;
  topicIds: TopicIds;
  rtl: boolean;
  setIsTopicRouteTrue: () => void;
};

export const TopicRouteController: FC<TopicRouteControllerProps> = ({
  setTopicIds,
  addFavoriteLanguage,
  favLanguages,
  topicIds,
  rtl,
  setIsTopicRouteTrue,
}) => {
  const h5pInstance = useH5PInstance<H5PWrapper>();
  const { langId, topicLabel, subTopicId } = useParams();
  const [currentTopicId, setCurrentTopicId] = useState<string>();
  const [currentSubTopicId, setCurrentSubTopicId] = useState<string>();
  const { topics: topicsFromDB, languages: languagesFromDB } =
    useDBContext() || {};
  const { words, topics, language, currentTopic } = useMemo(
    () =>
      validRoute(
        topicsFromDB,
        languagesFromDB,
        favLanguages,
        setTopicIds,
        langId as LanguageCode,
        topicLabel,
        subTopicId,
        addFavoriteLanguage,
      ),
    [
      addFavoriteLanguage,
      favLanguages,
      langId,
      languagesFromDB,
      setTopicIds,
      subTopicId,
      topicLabel,
      topicsFromDB,
    ],
  );

  const currentLanguage = useMemo(() => {
    if (!langId || !languagesFromDB) {
      return undefined;
    }

    return langIdToLanguage(langId as LanguageCode, languagesFromDB);
  }, [langId, languagesFromDB]);

  useEffect(() => {
    // Scroll into view if topic and/or sub topic changes (or are reset - i.e. the user visits the frontpage)

    if (!topicsFromDB || !currentLanguage) {
      return;
    }

    const isFrontpage = !topicLabel;
    const previousPageWasFrontpage = !currentTopicId && !currentSubTopicId;

    let newTopicId: string | undefined;
    let topicHasChanged = false;

    let newSubTopicId: string | undefined;
    let subTopicHasChanged = false;

    if (!isFrontpage) {
      const topic = findTopic(topicsFromDB, currentLanguage, topicLabel);
      newTopicId = topic?.id;

      topicHasChanged = newTopicId !== currentTopicId;

      const topicHasSubTopics = !!topic?.subTopics;
      const subTopicIsSetInUrl = !!subTopicId;

      if (topicHasSubTopics && subTopicIsSetInUrl) {
        const { subTopics } = topic;

        const subTopic = findTopic(subTopics, currentLanguage, subTopicId);
        newSubTopicId = subTopic?.id;
      }
    }

    subTopicHasChanged = newSubTopicId !== currentSubTopicId;

    // If the previous page was the frontpage AND the new page is the frontpage,
    // then we shouldn't trigger scroll into view, because it means that something
    // other than the topic or sub topic was changed (language or search params).
    const shouldScrollIntoView =
      (isFrontpage && !previousPageWasFrontpage) ||
      topicHasChanged ||
      subTopicHasChanged;
    if (shouldScrollIntoView) {
      h5pInstance?.getWrapper().scrollIntoView();
    }

    setCurrentTopicId(newTopicId);
    setCurrentSubTopicId(newSubTopicId);

    // Avoid depending on `currentTopicId` and `currentSubTopicId` as they are set by the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, h5pInstance, subTopicId, topicLabel, topics]);

  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const [topicsSize, setTopicsSize] = useState(
    smallScreen ? TopicGridSizes.Compact : TopicGridSizes.Big,
  );
  const [isWordView, setIsWordView] = useState(false);
  const [showTopicImageView, setShowTopicImageView] = useState(true);

  const toggleShowTopicImageView = (value: boolean): void => {
    setShowTopicImageView(value);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearchParams = (
    search: SearchParameters,
    value: boolean,
    defaultValue: boolean,
  ): void => {
    if (defaultValue === value) {
      searchParams.delete(search);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set(search, value.toString());
    setSearchParams(searchParams);
  };

  const defaultShowWrittenWords = true;
  const defaultShowArticles = false;

  const [showWrittenWords, setShowWrittenWords] = useState(
    searchParams.get(SearchParameters.wordsVisible) !== null
      ? searchParams.get(SearchParameters.wordsVisible) === "true"
      : defaultShowWrittenWords,
  );

  const [showArticles, setShowArticles] = useState(
    searchParams.get(SearchParameters.articlesVisible) !== null
      ? searchParams.get(SearchParameters.articlesVisible) === "true"
      : defaultShowArticles,
  );

  const handleToggleArticles = (value: boolean): void => {
    handleSearchParams(
      SearchParameters.articlesVisible,
      value,
      defaultShowArticles,
    );
    setShowArticles(value);
  };

  const handleToggleChange = (value: boolean): void => {
    handleSearchParams(
      SearchParameters.wordsVisible,
      value,
      defaultShowWrittenWords,
    );
    setShowWrittenWords(value);
  };

  const currentLang = useCurrentLanguage();

  setIsTopicRouteTrue();

  if ((words && language) || (topics && language)) {
    return (
      <>
        <SubHeader
          topicIds={topicIds}
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          handleToggleChange={handleToggleChange}
          toggleChecked={showWrittenWords}
          showTopicImageView={showTopicImageView}
          rtl={rtl}
          handleToggleArticles={handleToggleArticles}
          articlesToggleChecked={showArticles}
        />
        <div lang={currentLang}>
          <TopicGrid
            topics={topics}
            words={words}
            topicsSize={topicsSize}
            currentLanguage={language}
            showWrittenWords={showWrittenWords}
            setIsWordView={setIsWordView}
            currentTopic={currentTopic}
            toggleShowTopicImageView={toggleShowTopicImageView}
            showArticles={showArticles}
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <p>Page does not exist</p>
    </div>
  );
};
