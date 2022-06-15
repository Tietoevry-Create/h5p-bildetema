import { IH5PContentType } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect } from "react";
import { H5PContext } from "use-h5p";
import { Word } from "../../../../common/types/types";

type WordsProps = {
  words?: Word[];
};

export const Words: React.FC<WordsProps> = ({ words }) => {

  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const library = new (H5P as any).BildetemaWordsGridView({
      "bildetema-words-grid-view": words,
    });
    if (ref.current) {
      library.attach(H5P.jQuery(ref.current));
    }
  }, [words]);

  return <div ref={ref} />;
};
