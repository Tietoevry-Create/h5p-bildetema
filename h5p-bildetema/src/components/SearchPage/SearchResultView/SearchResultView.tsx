import React, { RefObject, useMemo, useState } from "react";
import { SearchResult } from "common/types/types";
import { AudioRefContext } from "common/context/AudioContext";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { SearchResultCard } from "../SearchResultCard/SearchResultCard";
import styles from "./SearchResultView.module.scss";
import Select from "../../Select/Select";

export type SearchResultViewProps = {
  searchResults: SearchResult[];
  search: string;
  loadMore: () => void;
  searchResultAmount: number;
  handleOrderChange: (option: string) => void;
  sortOptions: string[];
};

const SearchResultView = ({
  searchResults,
  search,
  loadMore,
  searchResultAmount,
  handleOrderChange,
  sortOptions,
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

  const hasNextPage = searchResults.length < searchResultAmount;
  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    // disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 600px 0px",
  });

  return (
    <div className={styles.searchResultView}>
      <div className={styles.searchViewHeading}>
        <div>
          Ditt søk på <b>{search}</b> ga <b>{searchResultAmount}</b> treff.
        </div>
        <div className={styles.orderWrap}>
          <span>Sorter etter</span>
          <Select options={sortOptions} handleChange={handleOrderChange} />
        </div>
      </div>

      <ul
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
          {hasNextPage && <span ref={sentryRef} />}
        </AudioRefContext.Provider>
      </ul>
    </div>
  );
};

export default SearchResultView;
