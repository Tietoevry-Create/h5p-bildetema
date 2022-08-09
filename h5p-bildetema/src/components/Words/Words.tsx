import type { IH5PContentType } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect, useRef, useState } from "react";
import { useContentId } from "use-h5p";
import { Word } from "../../../../common/types/types";
// eslint-disable-next-line import/no-relative-packages
import { library as gridViewLibrary } from "../../../../h5p-bildetema-words-grid-view/src/library";

type WordsProps = {
  words?: Word[];
  showWrittenWords: boolean;
};

export const Words: React.FC<WordsProps> = ({ words, showWrittenWords }) => {
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

    setGridViewInstance(
      H5P.newRunnable(
        {
          library: `${gridViewLibrary.machineName} ${gridViewLibrary.majorVersion}.${gridViewLibrary.minorVersion}`,
          params: {
            words,
            showWrittenWords,
          },
        },
        contentId,
        H5P.jQuery(ref.current),
      ),
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
