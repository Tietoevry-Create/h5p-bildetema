/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */

import React, {
  forwardRef,
  JSX,
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
import ChooseCollectionsDialog from "common/components/ChooseCollectionsDialog/ChooseCollectionsDialog";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { SearchResultCard } from "../SearchResultCard/SearchResultCard";
import SearchFilterDialog from "../SearchFilter/SearchFilterDialog";
import { useL10ns } from "../../../hooks/useL10n";
import styles from "./SearchResultView.module.scss";
import SearchSuggestion from "./SearchSuggestion";

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
  filter: string[];
  resetFilter: () => void;
  handleFilterChange: (topicId: string, add: boolean) => void;
  // handleOrderChange: (option: SearchOrderOption) => void;
  // sortOptions: SearchOrderOption[];
  // resultSortType: SearchOrderOption;
};

const SearchResultView = ({
  searchResults,
  search,
  searchResultAmount,
  filter,
  resetFilter,
  handleFilterChange,
}: SearchResultViewProps): JSX.Element => {
  const { handleOpenDialog } = useDialogContext();
  const { searchResultLabel, searchResultHitsLabel } = useL10ns(
    "searchResultLabel",
    "searchResultHitsLabel",
  );

  const [contextAudioRef, setAudioRef] = useState(
    {} as RefObject<HTMLAudioElement>,
  );

  const audioContextValue = useMemo(() => {
    const setContextAudioRef = (ref: RefObject<HTMLAudioElement>): void => {
      setAudioRef(ref);
    };
    return { contextAudioRef, setContextAudioRef };
  }, [contextAudioRef, setAudioRef]);

  const getSearchResultLabel = (): ReactNode => {
    const searchResultReplacements = {
      amount: <b>{searchResultAmount.toString()}</b>,
    };
    const searchResultLabelString = replacePlaceholders(
      searchResultLabel,
      searchResultReplacements,
    );

    const searchResultHitsReplacements = {
      searchTerm: <b>{search}</b>,
      amount: <b>{searchResultAmount.toString()}</b>,
    };
    const searchResultHitsLabelString = replacePlaceholders(
      searchResultHitsLabel,
      searchResultHitsReplacements,
    );

    return search.trim() === ""
      ? searchResultLabelString
      : searchResultHitsLabelString;
  };

  return (
    <div className={styles.searchResultView}>
      <div className={styles.searchViewHeading}>
        <div className={styles.buttonWrapper}>
          <SearchFilterDialog
            handleFilterChange={handleFilterChange}
            filter={filter}
            resetFilter={resetFilter}
          />
        </div>
        <p className={styles.searchResultLabel}>{getSearchResultLabel()}</p>
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
      <ChooseCollectionsDialog />
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
      {searchResultAmount === 0 && <SearchSuggestion />}
    </div>
  );
};

export default SearchResultView;
