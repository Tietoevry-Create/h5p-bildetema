import type { IH5PContentType, Library } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect, useRef, useState } from "react";
import { useContentId } from "use-h5p";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { TopicIds, Word } from "../../../../common/types/types";
import { getLibraryName } from "../../../../common/utils/library/library.utils";
import { Toggle } from "../Toggle/Toggle";
import styles from "./Words.module.scss";
// eslint-disable-next-line import/no-relative-packages
import { library as gridViewLibrary } from "../../../../h5p-bildetema-words-grid-view/src/library";

type WordsProps = {
  words?: Word[];
  topic?: TopicIds;
  showWrittenWords: boolean;
  currentLanguage: LanguageCode;
  showTopicImageView: boolean;
  toggleShowTopicImageView: (value: boolean) => void;
};

export const Words: React.FC<WordsProps> = ({
  words,
  topic,
  showWrittenWords,
  currentLanguage,
  showTopicImageView,
  toggleShowTopicImageView,
}) => {
  const topicViewRef = useRef<HTMLDivElement>(null);
  const gridViewRef = useRef<HTMLDivElement>(null);
  const [topicViewInstance, setTopicViewInstance] = useState<IH5PContentType>();
  const [gridViewInstance, setGridViewInstance] = useState<IH5PContentType>();
  const contentId = useContentId();
  const [isTopicImageView, setIsTopicImageView] = useState(false);

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
          toggleShowTopicImageView(false);
        }

        const gridView = H5P.newRunnable(
          {
            library: getLibraryName(gridViewLibrary),
            params: {
              words,
              showWrittenWords,
            },
          },
          contentId,
          H5P.jQuery(gridRootElement),
        );
        setGridViewInstance(gridView);
      };

      setViewInstances(topicViewRef.current, gridViewRef.current);
    })();
    return () => {
      toggleShowTopicImageView(true);
    };

    // Avoid updating when params changes, because we want to trigger changes in the useEffect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, topicViewRef, gridViewRef]);

  useEffect(() => {
    topicViewInstance?.trigger("change-params", {
      words,
      showWrittenWords,
      currentLanguage,
    });
    gridViewInstance?.trigger("change-params", {
      words,
      showWrittenWords,
      currentLanguage,
    });
    // Avoid updating when `gridViewInstance` changes, because we don't want to trigger updates to the grid view when it initializes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    words,
    showWrittenWords,
    topicViewInstance,
    gridViewInstance,
    currentLanguage,
  ]);

  return (
    <>
      <div className={styles.toggle}>
        {isTopicImageView && (
          <Toggle
            label="Topic view"
            checked={showTopicImageView}
            handleChange={toggleShowTopicImageView}
            id={`topic-view-toggle-${contentId}`}
          />
        )}
      </div>
      <div
        ref={topicViewRef}
        className={!showTopicImageView && styles.displayNone}
      />
      <div
        ref={gridViewRef}
        className={showTopicImageView && styles.displayNone}
      />
    </>
  );
};
