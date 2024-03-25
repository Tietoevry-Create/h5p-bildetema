import React, { RefObject, useMemo, useState } from "react";
import { SearchResult } from "common/types/types";
import { AudioRefContext } from "common/context/AudioContext";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { SearchResultCard } from "../SearchResultCard/SearchResultCard";
import styles from "./SearchResultView.module.scss";
// import Select from "../../Select/Select";
// import { SearchOrderOption } from "../useSearchResults";

export type SearchResultViewProps = {
  searchResults: SearchResult[];
  search: string;
  loadMore: () => void;
  searchResultAmount: number;
  // handleOrderChange: (option: SearchOrderOption) => void;
  // sortOptions: SearchOrderOption[];
  // resultSortType: SearchOrderOption;
};

const SearchResultView = ({
  searchResults,
  search,
  loadMore,
  searchResultAmount,
} // handleOrderChange,
// sortOptions,
// resultSortType,
: SearchResultViewProps): JSX.Element => {
  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );

  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);

  const hasNextPage = searchResults.length < searchResultAmount;
  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 600px 0px",
  });

  return (
    <div className={styles.searchResultView}>
      <div className={styles.searchViewHeading}>
        <div>
          {/* TODO Translate */}
          Ditt søk på <b>{search}</b> ga <b>{searchResultAmount}</b> treff.
        </div>
        {/* TODO REMOVE ? */}
        {/* <div className={styles.orderWrap}>
          <span>Sorter etter</span>
          <Select
            options={sortOptions}
            handleChange={handleOrderChange}
            selectedOption={resultSortType}
            variant="secondary"
          />
        </div> */}
      </div>

      <ul className={styles.searchResultList}>
        <AudioRefContext.Provider value={audioContextValue}>
          {searchResults?.map(w => {
            return <SearchResultCard key={w.id} searchResult={w} />;
          })}
          {hasNextPage && <span ref={sentryRef} />}
        </AudioRefContext.Provider>
      </ul>
    </div>
  );
};

export default SearchResultView;
