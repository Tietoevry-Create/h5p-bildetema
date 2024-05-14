import React, { RefObject, useMemo, useState } from "react";
import { SearchResult } from "common/types/types";
import { AudioRefContext } from "common/context/AudioContext";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useMyCollections } from "common/hooks/useMyCollections";
import { SearchResultCard } from "../SearchResultCard/SearchResultCard";
import ChooseCollectionDialog from "../ChooseCollectionDialog/ChooseCollectionDialog";
import styles from "./SearchResultView.module.scss";
// import Select from "../../Select/Select";
// import { SearchOrderOption } from "../useSearchResults";

export type CollectionOption = {
  id: string;
  label: string;
};

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
    rootMargin: "0px 0px 600px 0px",
  });

  const { myCollections, addItemToCollection } = useMyCollections();

  const options = myCollections.map(collection => {
    return {
      label: collection.title,
      id: collection.id,
    };
  });

  const [open, setOpen] = React.useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionOption | null>(null);

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const handleCloseDialog = (): void => {
    setOpen(false);
    setSelectedWordId(null);
  };

  const handleBookmarkClick = (id: string): void => {
    setOpen(true);
    setSelectedWordId(id);
  };

  const handleAddBookmark = (): void => {
    if (!selectedWordId || !selectedCollection) return;
    addItemToCollection({
      id: selectedCollection.id,
      wordId: selectedWordId,
    });
    handleCloseDialog();
  };

  const handleSelectCollection = (collection: CollectionOption): void => {
    setSelectedCollection(collection);
  };

  const searchLabel =
    search.trim() === "" ? (
      <>
        Viser <b>{searchResultAmount}</b> ord.
      </>
    ) : (
      <>
        Ditt søk på <b>{search}</b> ga <b>{searchResultAmount}</b> treff.
      </>
    );

  return (
    <div className={styles.searchResultView}>
      <div className={styles.searchViewHeading}>
        <div className={styles.searchLabel}>{searchLabel}</div>
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
      <ChooseCollectionDialog
        open={open}
        options={options}
        selectedCollection={selectedCollection}
        selectedWordId={selectedWordId}
        onSelectCollection={handleSelectCollection}
        onClose={handleCloseDialog}
        onAddBookmark={handleAddBookmark}
      />

      <ul className={styles.searchResultList}>
        <AudioRefContext.Provider value={audioContextValue}>
          {searchResults?.map(w => {
            return (
              <SearchResultCard
                key={w.id}
                searchResult={w}
                handleBookmarkClick={handleBookmarkClick}
              />
            );
          })}
          {hasNextPage && <span ref={sentryRef} />}
        </AudioRefContext.Provider>
      </ul>
    </div>
  );
};

export default SearchResultView;
