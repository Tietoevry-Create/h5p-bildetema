import { useNewDBContext } from "common/hooks/useNewDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics, TopicGridSizes } from "common/types/types";
import { uriComponentToTopicPath } from "common/utils/router.utils";
import { newWordsIncludesArticles } from "common/utils/word.utils";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useH5PInstance } from "use-h5p";
import { H5PWrapper } from "../../h5p/H5PWrapper";
import {
  useCurrentLanguageAttribute,
  useCurrentLanguageCode,
} from "../../hooks/useCurrentLanguage";
import { useCurrentWords } from "../../hooks/useCurrentWords";
import { useSearchParamContext } from "../../hooks/useSearchParamContext";
import { SubHeader } from "../SubHeader/SubHeader";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import styles from "./TopicRouteController.module.scss";

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
  const { topicPaths, idToContent, langCodeTolanguages } = useNewDBContext();
  const { showArticles, showWrittenWords } = useSearchParamContext();

  const { langCodeParam, topicLabelParam, subTopicLabelParam } = useParams();

  const [currentTopicId, setCurrentTopicId] = useState<string>();
  const [currentSubTopicId, setCurrentSubTopicId] = useState<string>();
  const [showTopicImageView, setShowTopicImageView] = useState(true);
  const [previousPageWasFrontpage, setPreviousPageWasFrontpage] =
    useState(false);

  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const [topicsSize, setTopicsSize] = useState(
    smallScreen ? TopicGridSizes.Compact : TopicGridSizes.Big,
  );

  const currentLanguage = useMemo(() => {
    if (!langCodeParam || !langCodeTolanguages) {
      return undefined;
    }
    return langCodeTolanguages?.get(langCodeParam as LanguageCode);
  }, [langCodeParam, langCodeTolanguages]);

  const isValidRoute = useMemo(() => {
    if (subTopicLabelParam) {
      return topicPaths?.has(
        `${uriComponentToTopicPath(subTopicLabelParam)}-${currentLanguageCode}`,
      );
    }
    if (topicLabelParam) {
      return topicPaths?.has(
        `${uriComponentToTopicPath(topicLabelParam)}-${currentLanguageCode}`,
      );
    }
    return true;
  }, [currentLanguageCode, subTopicLabelParam, topicLabelParam, topicPaths]);

  const isWordView = useMemo(() => {
    return newWords.at(0)?.id.charAt(0) !== "T";
  }, [newWords]);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    // Scroll into view if topic and/or sub topic changes (or are reset - i.e. the user visits the frontpage)

    if (!currentLanguage || !idToContent || !topicPaths) {
      return;
    }
    const isFrontpage = !topicLabelParam;

    let newTopicId: string | undefined;
    let topicHasChanged = false;

    let newSubTopicId: string | undefined;
    let subTopicHasChanged = false;

    if (!isFrontpage) {
      newTopicId =
        topicPaths.get(
          `${uriComponentToTopicPath(topicLabelParam)}-${currentLanguageCode}`,
        ) || "";
      topicHasChanged = newTopicId !== currentTopicId;

      const subTopics = idToContent.get(newTopicId);
      let topicHasSubTopics = false;
      if (subTopics) {
        topicHasSubTopics = subTopics.length > 0;
      }

      const subTopicIsSetInUrl = !!subTopicLabelParam;

      if (topicHasSubTopics && subTopicIsSetInUrl) {
        newSubTopicId = topicPaths?.get(
          `${uriComponentToTopicPath(
            subTopicLabelParam,
          )}-${currentLanguageCode}`,
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
    setPreviousPageWasFrontpage(isFrontpage);

    // Avoid depending on `currentTopicId` and `currentSubTopicId` as they are set by the effect
  }, [currentLanguage, h5pInstance, subTopicLabelParam, topicLabelParam]);

  const toggleShowTopicImageView = (value: boolean): void => {
    setShowTopicImageView(value);
  };

  const showArticlesToggle = useMemo(() => {
    return newWordsIncludesArticles(newWords, currentLanguageCode);
  }, [currentLanguageCode, newWords]);

  if (currentLanguage && isValidRoute) {
    return (
      <div className={`${styles.body} ${rtl ? styles.rtl : ""}`}>
        <SubHeader
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          showTopicImageView={showTopicImageView}
          rtl={rtl}
          showArticlesToggle={showArticlesToggle}
          currentTopics={currentTopics}
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
