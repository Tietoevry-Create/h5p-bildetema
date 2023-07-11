import type { H5PLibrary, IH5PContentType, Library } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { L10nContext, useContentId } from "use-h5p";
import { LanguageCode } from "common/types/LanguageCode";
import { DisplayView, TopicIds, Word } from "common/types/types";
import { getLibraryName } from "common/utils/library/library.utils";
import { useDBContext } from "common/hooks/useDBContext";
import { SearchParameters } from "../../enums/SearchParameters";
import styles from "./Words.module.scss";
// eslint-disable-next-line import/no-relative-packages
import gridViewLibrary from "../../../../h5p-bildetema-words-grid-view/library.json";
import { DisplayViewButtons } from "../DisplayViewButtons/DisplayViewButtons";

type WordsProps = {
  words?: Word[];
  topic?: TopicIds;
  showWrittenWords: boolean;
  currentLanguage: LanguageCode;
  toggleShowTopicImageView: (value: boolean) => void;
  showArticles: boolean;
};

export const Words: React.FC<WordsProps> = ({
  words,
  topic,
  showWrittenWords,
  currentLanguage,
  toggleShowTopicImageView,
  showArticles,
}) => {
  const topicViewRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<HTMLDivElement>(null);
  const [topicViewInstance, setTopicViewInstance] = useState<IH5PContentType>();
  const [gridViewInstance, setGridViewInstance] = useState<IH5PContentType>();
  const contentId = useContentId();
  const [isTopicImageView, setIsTopicImageView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showTopicImageView, setTopicImageView] = useState(
    searchParams.get(SearchParameters.showTopicImageView) !== null
      ? searchParams.get(SearchParameters.showTopicImageView) === "true"
      : true,
  );
  const l10n = useContext(L10nContext);
  const { topics } = useDBContext() || {};
  const onlyTopicImage = React.useMemo(() => {
    if (!isTopicImageView) return false;
    if (topic?.subTopicId) {
      return topics
        ?.find(t => t.id === topic?.topicId)
        ?.subTopics.find(s => s.id === topic?.subTopicId)?.onlyTopicImage;
    }
    return topics?.find(t => t.id === topic?.topicId)?.onlyTopicImage;
  }, [topic?.subTopicId, topic?.topicId, topics, isTopicImageView]);

  React.useEffect(() => {
    toggleShowTopicImageView(showTopicImageView);
  }, [toggleShowTopicImageView, showTopicImageView]);

  const handleViewChange = (value: boolean): void => {
    setTopicImageView(value);
    searchParams.set(SearchParameters.showTopicImageView, value.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    (() => {
      if (!contentId) {
        return;
      }

      if (!topicViewRef.current || !gridViewRef.current) {
        return;
      }

      const viewIsInitialized =
        topicViewRef.current.childElementCount > 0 &&
        gridViewRef.current.childElementCount > 0;
      if (viewIsInitialized) {
        return;
      }

      topicViewRef.current.innerHTML = "";
      gridViewRef.current.innerHTML = "";

      const setViewInstances = (
        topicRootElement: HTMLDivElement,
        gridRootElement: HTMLDivElement,
      ): void => {
        const existingContent = (window as any).H5PAllContents?.filter(
          (h5pContent: any) => {
            const params = JSON.parse(h5pContent.json_content);

            return (
              topic &&
              params.selectedTopic &&
              params.selectedTopic.topicId === topic?.topicId &&
              params.selectedTopic.subTopicId === topic?.subTopicId
            );
          },
        );

        const currentTopicHasTopicImage =
          existingContent && existingContent.length > 0;

        if (currentTopicHasTopicImage) {
          setIsTopicImageView(true);

          const content = existingContent[0];
          const params = {
            ...JSON.parse(content.json_content),
            currentLanguage,
            l10n,
            showWrittenWords,
            showArticles,
          };

          const topicView = H5P.newRunnable(
            {
              library: getLibraryName({
                machineName: content.machine_name,
                majorVersion: content.major_version,
                minorVersion: content.minor_version,
              } as Library),
              params,
            },
            content.content_id,
            H5P.jQuery(topicRootElement),
          );
          setTopicViewInstance(topicView);
        } else {
          setIsTopicImageView(false);
          setTopicImageView(false);
        }

        const gridView = H5P.newRunnable(
          {
            library: getLibraryName(gridViewLibrary as H5PLibrary),
            params: {
              words,
              showWrittenWords,
              showArticles,
              l10n,
            },
          },
          contentId,
          H5P.jQuery(gridRootElement),
        );
        setGridViewInstance(gridView);
      };

      setViewInstances(topicViewRef.current, gridViewRef.current);
    })();
    // Avoid updating when params changes, because we want to trigger changes in the useEffect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, topicViewRef, gridViewRef]);

  useEffect(() => {
    topicViewInstance?.trigger("change-params", {
      words,
      showWrittenWords,
      currentLanguage,
      showArticles,
    });
    gridViewInstance?.trigger("change-params", {
      words,
      showWrittenWords,
      currentLanguage,
      showArticles,
    });
    // Avoid updating when `gridViewInstance` changes, because we don't want to trigger updates to the grid view when it initializes
  }, [
    words,
    showWrittenWords,
    topicViewInstance,
    gridViewInstance,
    currentLanguage,
    showArticles,
  ]);

  return (
    <>
      {isTopicImageView && !onlyTopicImage && (
        <div className={styles.toggle}>
          <DisplayViewButtons
            displayView={
              showTopicImageView || onlyTopicImage
                ? DisplayView.TopicImage
                : DisplayView.Grid
            }
            setDisplayView={handleViewChange}
          />
        </div>
      )}
      <div
        ref={topicViewRef}
        className={
          !showTopicImageView && !onlyTopicImage ? styles.displayNone : ""
        }
      />
      <div
        ref={gridViewRef}
        className={
          showTopicImageView || onlyTopicImage ? styles.displayNone : ""
        }
      />
    </>
  );
};
