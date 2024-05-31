/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */

import React, {
  forwardRef,
  ReactNode,
  Ref,
  RefObject,
  useMemo,
  useState,
} from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { SearchResult } from "common/types/types";
import { AudioRefContext } from "common/context/AudioContext";
import { useDialogContext } from "common/hooks/useDialogContext";
import ChooseCollectionDialog from "common/components/ChooseCollectionDialog/ChooseCollectionDialog";
import { useChooseCollectionDialog } from "common/hooks/useChooseCollectionDialog";
import { SearchResultCard } from "../SearchResultCard/SearchResultCard";
import styles from "./SearchResultView.module.scss";

type ListProps = {
  style?: React.CSSProperties;
  children?: ReactNode;
};

const gridComponents = {
  List: forwardRef(
    ({ style, children, ...props }: ListProps, ref: Ref<HTMLDivElement>) => (
      <div
        ref={ref}
        {...props}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
          paddingInlineStart: "0",
          ...style,
        }}
      >
        {children}
      </div>
    ),
  ),
};

export type SearchResultViewProps = {
  searchResults: SearchResult[];
  search: string;
  searchResultAmount: number;
  // handleOrderChange: (option: SearchOrderOption) => void;
  // sortOptions: SearchOrderOption[];
  // resultSortType: SearchOrderOption;
};

const SearchResultView = ({
  searchResults,
  search,
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

  const { isOpen, selectedId, handleCloseDialog, handleOpenDialog } =
    useDialogContext();
  const {
    options,
    selectedCollection,
    handleSelectCollection,
    handleAddToCollection,
  } = useChooseCollectionDialog();

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
        open={isOpen}
        options={options}
        selectedCollection={selectedCollection}
        selectedWordId={selectedId}
        onSelectCollection={handleSelectCollection}
        onClose={handleCloseDialog}
        onAddBookmark={() =>
          handleAddToCollection(selectedId, handleCloseDialog)
        }
      />
      <AudioRefContext.Provider value={audioContextValue}>
        <VirtuosoGrid
          useWindowScroll
          overscan={{
            main: 1000,
            reverse: 1000,
          }}
          data={searchResults}
          components={gridComponents}
          itemContent={(_, w) => (
            <SearchResultCard
              key={w.id}
              searchResult={w}
              handleBookmarkClick={handleOpenDialog}
            />
          )}
        />
      </AudioRefContext.Provider>
    </div>
  );
};

export default SearchResultView;
