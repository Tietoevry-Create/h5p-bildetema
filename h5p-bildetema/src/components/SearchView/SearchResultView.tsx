import React, { RefObject, useMemo, useState } from "react";
import { SearchResult } from "common/types/types";
// import { WordAudio } from "common/components/WordAudio/WordAudio";
import { AudioRefContext } from "common/context/AudioContext";
// import { useL10n } from "../../hooks/useL10n";
import { SearchResultCard } from "./SearchResultCard";

export type SearchResultViewProps = {
  searchResults: SearchResult[];
};
const SearchResultView = ({
  searchResults,
}: SearchResultViewProps): JSX.Element => {
  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );
  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul
      role="list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "10px",
      }}
    >
      <AudioRefContext.Provider value={audioContextValue}>
        {searchResults?.map(w => {
          return <SearchResultCard key={w.id} searchResult={w} />;
        })}
      </AudioRefContext.Provider>
    </ul>
  );
};

export default SearchResultView;
