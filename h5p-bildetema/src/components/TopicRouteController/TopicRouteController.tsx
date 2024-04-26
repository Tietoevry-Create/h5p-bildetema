import { LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics, TopicGridSizes } from "common/types/types";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { uriComponentToTopicPath } from "common/utils/router.utils";
import { getNewWordsFromId } from "common/utils/data.utils";
import { newWordsIncludesArticles } from "common/utils/word.utils";
import { useH5PInstance } from "use-h5p";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import styles from "./TopicRouteController.module.scss";
import { H5PWrapper } from "../../h5p/H5PWrapper";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import { SubHeader } from "../SubHeader/SubHeader";
import { SearchParameters } from "../../enums/SearchParameters";
import {
  useCurrentLanguageAttribute,
  useCurrentLanguageCode,
} from "../../hooks/useCurrentLanguage";
import { useCurrentWords } from "../../hooks/useCurrentWords";
import { useToggleSearchParam } from "../../hooks/useToggleSearchParam";

const defaultShowWrittenWords = true;
const defaultShowArticles = false;

export type TopicRouteControllerProps = {
  rtl: boolean;
  currentTopics: CurrentTopics;
};

export const TopicRouteController: FC<TopicRouteControllerProps> = ({
  rtl,
  currentTopics,
}) => {
  const h5pInstance = useH5PInstance<H5PWrapper>();
  const currentLang = useCurrentLanguageAttribute();
  const currentLanguageCode = useCurrentLanguageCode();
  const newWords = useCurrentWords();
  const { topicPaths, idToContent, idToWords, langCodeTolanguages } =
    useNewDBContext();

  const { langCodeParam, topicLabelParam, subTopicLabelParam } = useParams();
  const [searchParams] = useSearchParams();

  const [currentTopicId, setCurrentTopicId] = useState<string>();
  const [currentSubTopicId, setCurrentSubTopicId] = useState<string>();
  const [showTopicImageView, setShowTopicImageView] = useState(true);

  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const [topicsSize, setTopicsSize] = useState(
    smallScreen ? TopicGridSizes.Compact : TopicGridSizes.Big,
  );

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

  const handleShowArticlesChange = useToggleSearchParam(
    SearchParameters.articlesVisible,
    defaultShowArticles,
    setShowArticles,
  );

  const handleShowWrittenWordsChange = useToggleSearchParam(
    SearchParameters.wordsVisible,
    defaultShowWrittenWords,
    setShowWrittenWords,
  );

  const currentLanguage = useMemo(() => {
    if (!langCodeParam || !langCodeTolanguages) {
      return undefined;
    }
    return langCodeTolanguages?.get(langCodeParam as LanguageCode);
  }, [langCodeParam, langCodeTolanguages]);

  const isValidRoute = useMemo(() => {
    if (subTopicLabelParam) {
      return topicPaths?.has(uriComponentToTopicPath(subTopicLabelParam));
    }
    if (topicLabelParam) {
      return topicPaths?.has(uriComponentToTopicPath(topicLabelParam));
    }
    return true;
  }, [subTopicLabelParam, topicLabelParam, topicPaths]);

  const isWordView = useMemo(() => {
    return newWords.at(0)?.id.charAt(0) !== "T";
  }, [newWords]);

  useEffect(() => {
    // Scroll into view if topic and/or sub topic changes (or are reset - i.e. the user visits the frontpage)

    if (!currentLanguage || !idToContent || !topicPaths) {
      return;
    }
    const isFrontpage = !topicLabelParam;
    const previousPageWasFrontpage = !currentTopicId && !currentSubTopicId;

    let newTopicId: string | undefined;
    let topicHasChanged = false;

    let newSubTopicId: string | undefined;
    let subTopicHasChanged = false;

    if (!isFrontpage) {
      newTopicId =
        topicPaths.get(uriComponentToTopicPath(topicLabelParam)) || "";
      topicHasChanged = newTopicId !== currentTopicId;

      const subTopics = idToContent.get(newTopicId);
      let topicHasSubTopics = false;
      if (subTopics) {
        topicHasSubTopics = subTopics.length > 0;
      }

      const subTopicIsSetInUrl = !!subTopicLabelParam;

      if (topicHasSubTopics && subTopicIsSetInUrl) {
        newSubTopicId = topicPaths?.get(
          uriComponentToTopicPath(subTopicLabelParam),
        );
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
  }, [currentLanguage, h5pInstance, subTopicLabelParam, topicLabelParam]);

  const toggleShowTopicImageView = (value: boolean): void => {
    setShowTopicImageView(value);
  };

  const showArticlesToggle = useMemo(() => {
    const { topic, subTopic } = currentTopics;
    if (subTopic) {
      const words = getNewWordsFromId(subTopic.id, idToWords, idToContent);
      return newWordsIncludesArticles(words, currentLanguageCode);
    }
    if (topic) {
      const words = getNewWordsFromId(topic.id, idToWords, idToContent);
      return newWordsIncludesArticles(words, currentLanguageCode);
    }
    return false;
  }, [currentLanguageCode, currentTopics, idToContent, idToWords]);

  if (currentLanguage && isValidRoute) {
    return (
      <div className={`${styles.body} ${rtl ? styles.rtl : ""}`}>
        <SubHeader
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          showWrittenWords={showWrittenWords}
          showTopicImageView={showTopicImageView}
          rtl={rtl}
          showArticlesToggle={showArticlesToggle}
          showArticles={showArticles}
          currentTopics={currentTopics}
          onShowWrittenWordsChange={handleShowWrittenWordsChange}
          onShowArticlesChange={handleShowArticlesChange}
        />
        <div lang={currentLang}>
          <TopicGrid
            newWords={newWords}
            topicsSize={topicsSize}
            currentLanguage={currentLanguage}
            showWrittenWords={showWrittenWords}
            toggleShowTopicImageView={toggleShowTopicImageView}
            showArticles={showArticles}
            currentTopics={currentTopics}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Page does not exist</p>
    </div>
  );
};
