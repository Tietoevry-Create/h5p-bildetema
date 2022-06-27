import { H5P } from "h5p-utils";
import React, { useEffect } from "react";
import { useContentId } from "use-h5p";
import { Word } from "../../../../common/types/types";

type WordsProps = {
  words?: Word[];
  showWrittenWords: boolean;
};

export const Words: React.FC<WordsProps> = ({ words, showWrittenWords }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const contentId = useContentId()
  useEffect(() => {
    if (ref.current) {
      if (ref.current.childElementCount > 0)
        ref.current.removeChild(ref.current.childNodes[0]);
      const library = new (H5P as any).BildetemaWordsGridView({
        "bildetema-words-grid-view-words": words,
        "bildetema-words-grid-view-show": showWrittenWords,
      }, contentId);
      library.attach(H5P.jQuery(ref.current));
    }
  }, []);

  return <div ref={ref} />;
};
