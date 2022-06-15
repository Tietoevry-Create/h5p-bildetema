import { IH5PContentType } from "h5p-types";
import { H5P } from "h5p-utils";
import React, { useEffect } from "react";
import { H5PContext } from "use-h5p";
import { Word } from "../../../../common/types/types";

type WordsProps = {
  words?: Word[];
};

export const Words: React.FC<WordsProps> = ({ words }) => {
  const [h5pContext, setH5PContext] = React.useState<
    IH5PContentType | undefined
  >(undefined);
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.info("words", words);
    console.info("h5p", H5P);
    const library = new (H5P as any).BildetemaWordsGridView({
      "bildetema-words-grid-view": words,
    });
    console.info("library", library);
    setH5PContext(library);
    if (ref.current) {
      library.attach(H5P.jQuery(ref.current));
    }
  }, [words]);

  return <div ref={ref} />;
};
