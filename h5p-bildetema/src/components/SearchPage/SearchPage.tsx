import { useDBContext } from "common/hooks/useDBContext";
import React, { useDeferredValue, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchResult } from "common/types/types";
import {
  sortSearchByTopic,
  sortSearchBylevenshtein,
} from "common/utils/searchResults.utils";
import debounce from "debounce";
import { searchForWord } from "common/utils/word.utils";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import SearchResultView from "./SearchResultView/SearchResultView";
import SearchView from "./SearchView/SearchView";
import styles from "./SearchPage.module.scss";

type SearchPageProps = {
  setIsTopicRouteFalse: () => void;
};

const SearchPage = ({ setIsTopicRouteFalse }: SearchPageProps): JSX.Element => {
  setIsTopicRouteFalse();
  const { topics: topicsFromDB } = useDBContext() || {};
  const langCode = useCurrentLanguageCode();
  const [searchParams, setSearchParams] = useSearchParams();

  const currSearch = searchParams.get("search") ?? "";

  const amountVisible = 20;

  const sortOptions = ["Relevans", "Tema"] as const;

  type sortOptions = (typeof sortOptions)[number];

  const [resultSortType, setResultSortType] = React.useState<sortOptions>(
    sortOptions[0],
  );

  const findWords = (s: string): SearchResult[] => {
    return searchForWord(s, langCode, topicsFromDB, ["eng", "isl"]);
  };

  const sortResults = (
    sortOption: sortOptions,
    search: string,
    searchResults: SearchResult[],
  ): SearchResult[] => {
    switch (sortOption) {
      case "Relevans":
        return sortSearchBylevenshtein(search, searchResults);
      case "Tema":
        return sortSearchByTopic(searchResults);
      default:
        return [];
    }
  };

  const [searchResult, setSearchResult] = React.useState<SearchResult[]>(() => {
    if (currSearch) {
      const res = findWords(currSearch);
      return sortResults(resultSortType, currSearch, res);
    }
    return [];
  });

  const [visibleSearchResult, setVisibleSearchResult] = React.useState<
    SearchResult[]
  >(searchResult.slice(0, amountVisible));

  const deferredSearchResult = useDeferredValue(visibleSearchResult);

  const setResults = (results: SearchResult[]): void => {
    setSearchResult(results);
    setVisibleSearchResult(results.slice(0, amountVisible));
  };

  const handleOrderChange = (option: string): void => {
    setResultSortType(option as sortOptions);
    const res = sortResults(option as sortOptions, currSearch, searchResult);
    setResults(res);
  };

  const loadMore = (): void => {
    setVisibleSearchResult(prev => {
      const visibleSearch = [
        ...prev,
        ...searchResult.slice(prev.length, prev.length + amountVisible),
      ];
      return visibleSearch;
    });
  };

  const debouncedSearch = useRef(
    debounce((value: string, sortType: sortOptions) => {
      if (value === "") {
        setSearchResult([]);
        setVisibleSearchResult([]);
        return;
      }
      if (value.length < 2) {
        return;
      }
      const res = findWords(value);
      setResults(sortResults(sortType, value, res));
    }, 400),
  ).current;

  const handleSearch = (value: string): void => {
    if (value === "") {
      searchParams.delete("search");
      debouncedSearch.clear();
      setSearchParams(searchParams);
      setSearchResult([]);
      setVisibleSearchResult([]);
      return;
    }
    searchParams.set("search", value);
    setSearchParams(searchParams);
    debouncedSearch(value, resultSortType);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchViewBackground}>
        <div className={`${styles.searchViewWrapper} ${styles.grid}`}>
          <div className={styles.searchView}>
            <SearchView handleSearch={handleSearch} search={currSearch} />
          </div>
        </div>
      </div>
      <div className={styles.searchResultBackground}>
        <div className={`${styles.grid}`}>
          <div>Test</div>
          <SearchResultView
            searchResults={deferredSearchResult}
            search={currSearch}
            loadMore={loadMore}
            searchResultAmount={searchResult.length}
            sortOptions={[...sortOptions]}
            handleOrderChange={handleOrderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
