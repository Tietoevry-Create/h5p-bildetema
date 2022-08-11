import type { IH5PContentType } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect, useRef, useState } from "react";
import { useContentId } from "use-h5p";
import { TopicIds, Word } from "../../../../common/types/types";
// eslint-disable-next-line import/no-relative-packages
import { library as gridViewLibrary } from "../../../../h5p-bildetema-words-grid-view/src/library";

type WordsProps = {
  words?: Word[];
  topic?: TopicIds;
  showWrittenWords: boolean;
};

export const Words: React.FC<WordsProps> = ({ words, topic, showWrittenWords }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [gridViewInstance, setGridViewInstance] = useState<IH5PContentType>();
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

    const getViewInstance = ():IH5PContentType => {
      const existingContent = (H5PAllContents as any).filter((c:any) => {
        const params = JSON.parse(c.json_content);
        
        return topic && params.selectedTopic && params.selectedTopic.topicId === topic?.topicId && params.selectedTopic.subTopicId === topic?.subTopicId;
      })
      if (existingContent && existingContent.length > 0) {
        const content = existingContent[0];
        const params = JSON.parse(content.json_content);
        return H5P.newRunnable({
          library: "H5P.BildetemaTopicImageView 1.0",
          params,
        },
        content.content_id,
        H5P.jQuery(ref.current),
      );
          
      //    content.content_id, ref.current, params);
      }
      return H5P.newRunnable(
        {
          library: `${gridViewLibrary.machineName} ${gridViewLibrary.majorVersion}.${gridViewLibrary.minorVersion}`,
          params: {
            words,
            showWrittenWords,
          },
        },
        contentId,
        H5P.jQuery(ref.current),
      );
    };

    setGridViewInstance(
      getViewInstance(),
    );

    // Avoid updating when params changes, because we want to trigger changes in the useEffect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId]);

  useEffect(() => {
    gridViewInstance?.trigger("change-params", {
      words,
      showWrittenWords,
    });

    // Avoid updating when `gridViewInstance` changes, because we don't want to trigger updates to the grid view when it initializes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, showWrittenWords]);

  return <div ref={ref} />;
};