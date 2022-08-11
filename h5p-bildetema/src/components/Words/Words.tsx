import type { IH5PContentType, Library } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect, useRef, useState } from "react";
import { useContentId } from "use-h5p";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { TopicIds, Word } from "../../../../common/types/types";
import { getLibraryName } from "../../../../common/utils/library/library.utils";
// eslint-disable-next-line import/no-relative-packages
import { library as gridViewLibrary } from "../../../../h5p-bildetema-words-grid-view/src/library";
// eslint-disable-next-line import/no-relative-packages
import { library as topicViewLibrary } from "../../../../h5p-bildetema-words-topic-image/src/library";

type WordsProps = {
  words?: Word[];
  topic?: TopicIds;
  showWrittenWords: boolean;
  currentLanguage: LanguageCode;
};

export const Words: React.FC<WordsProps> = ({
  words,
  topic,
  showWrittenWords,
  currentLanguage,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [topicViewInstance, setTopicViewInstance] = useState<IH5PContentType>();
  const contentId = useContentId();

  useEffect(() => {
    if (!contentId) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const gridViewIsInitialized = ref.current.childElementCount > 0;
    if (gridViewIsInitialized) {
      return;
    }

    const getViewInstance = (rootElement: HTMLDivElement): IH5PContentType => {
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
        const content = existingContent[0];
        const params = {
          ...JSON.parse(content.json_content),
          currentLanguage,
        };

        return H5P.newRunnable(
          {
            library: getLibraryName({
              machineName: content.machine_name,
              majorVersion: content.major_version,
              minorVersion: content.minor_version,
            } as Library),
            params,
          },
          content.content_id,
          H5P.jQuery(rootElement),
        );
      }

      return H5P.newRunnable(
        {
          library: getLibraryName(gridViewLibrary),
          params: {
            words,
            showWrittenWords,
          },
        },
        contentId,
        H5P.jQuery(rootElement),
      );
    };

    setTopicViewInstance(getViewInstance(ref.current));

    // Avoid updating when params changes, because we want to trigger changes in the useEffect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, ref.current]);

  useEffect(() => {
    topicViewInstance?.trigger("change-params", {
      words,
      showWrittenWords,
    });

    // Avoid updating when `gridViewInstance` changes, because we don't want to trigger updates to the grid view when it initializes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, showWrittenWords, topicViewInstance]);

  return <div ref={ref} />;
};
