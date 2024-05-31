import { LanguageCode } from "common/types/LanguageCode";
import { DisplayView, TopicIds, Word } from "common/types/types";
import { getLibraryName } from "common/utils/library/library.utils";
import type { H5PLibrary, IH5PContentType } from "h5p-types";
import { H5P } from "h5p-utils";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { L10nContext, useContentId } from "use-h5p";
import { TopicImageHotspot } from "common/types/TopicImageHotspot";
import { SearchParameters } from "../../enums/SearchParameters";
import { DisplayViewButtons } from "../DisplayViewButtons/DisplayViewButtons";
import styles from "./Words.module.scss";

// TODO: Export library from h5p-bildetema-words-topic-view
// eslint-disable-next-line import/no-relative-packages
import gridViewLibrary from "../../../../h5p-bildetema-words-grid-view/library.json";

type WordsProps = {
  words?: Word[];
  topic?: TopicIds;
  showWrittenWords: boolean;
  currentLanguage: LanguageCode;
  toggleShowTopicImageView: (value: boolean) => void;
  showArticles: boolean;
};

type H5PContent = {
  content_id: number;
  json_content: string;
  machine_name: string;
  major_version: number;
  minor_version: number;
};

type ExistingContentWindow = Window & {
  H5PAllContents?: H5PContent[];
};

export const Words: FC<WordsProps> = ({
  words,
  topic,
  showWrittenWords,
  currentLanguage,
  toggleShowTopicImageView,
  showArticles,
}) => {
  const [hotspots, setHotspots] = useState<TopicImageHotspot[]>([]);
  const topicViewRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<HTMLDivElement>(null);
  const [topicViewInstance, setTopicViewInstance] = useState<IH5PContentType>();
  const [gridViewInstance, setGridViewInstance] = useState<IH5PContentType>();
  const contentId = useContentId();
  const [isTopicImageView, setIsTopicImageView] = useState(false);
  const [onlyTopicImage, setOnlyTopicImage] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [showTopicImageView, setTopicImageView] = useState(
    searchParams.get(SearchParameters.showTopicImageView) !== null
      ? searchParams.get(SearchParameters.showTopicImageView) === "true"
      : true,
  );
  const l10n = useContext(L10nContext);

  useEffect(() => {
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
        const existingContent = (
          window as ExistingContentWindow
        ).H5PAllContents?.filter((h5pContent: H5PContent) => {
          const params = JSON.parse(h5pContent.json_content);

          return (
            topic &&
            params.selectedTopic &&
            params.selectedTopic.topicId === topic?.topicId &&
            params.selectedTopic.subTopicId === topic?.subTopicId
          );
        });

        const publishedTopicImage = existingContent?.find(content => {
          const params = JSON.parse(content.json_content);
          return params?.isPublished;
        });

        const currentTopicHasTopicImage = !!publishedTopicImage;

        if (currentTopicHasTopicImage) {
          setIsTopicImageView(true);

          const content = publishedTopicImage;
          const savedParams = JSON.parse(content.json_content);
          const paramHotspots = savedParams.hotspots as TopicImageHotspot[];
          if (!paramHotspots || paramHotspots.length < 0) return;

          const hotspotsWithTranslatedWords = paramHotspots
            .filter(hotspot => hotspot != null && hotspot.points?.length > 0)
            .map(hotspot => {
              const word = words?.find(w => w.id === hotspot.word.id);
              if (!word) {
                return hotspot;
              }

              return {
                ...hotspot,
                word,
              };
            });
          setHotspots(hotspotsWithTranslatedWords);

          const params = {
            ...savedParams,
            currentLanguage,
            l10n,
            showWrittenWords,
            showArticles,
            hotspots: hotspotsWithTranslatedWords,
          };

          if (params?.isPublished) {
            if (params?.showOnlyTopicImage) setOnlyTopicImage(true);
            const topicView = H5P.newRunnable(
              {
                library: getLibraryName({
                  machineName: content.machine_name,
                  majorVersion: content.major_version,
                  minorVersion: content.minor_version,
                } as H5PLibrary),
                params,
              },
              content.content_id,
              H5P.jQuery(topicRootElement),
            );
            setTopicViewInstance(topicView);
          }
        } else {
          setIsTopicImageView(false);
          setTopicImageView(false);
        }

        // If onlyTopicImage is true, and a Topic Image exist, we don't need to render the grid view
        if (currentTopicHasTopicImage && onlyTopicImage) {
          return;
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
    const h = hotspots.map(hotspot => {
      const word = words?.find(w => w.id === hotspot.word.id);
      if (!word) {
        return hotspot;
      }

      return {
        ...hotspot,
        word,
      };
    });
    topicViewInstance?.trigger("change-params", {
      hotspots: h,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, showWrittenWords, currentLanguage, showArticles, hotspots]);

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
        className={!showTopicImageView ? styles.displayNone : ""}
      />
      <div
        ref={gridViewRef}
        className={showTopicImageView ? styles.displayNone : ""}
      />
    </>
  );
};
