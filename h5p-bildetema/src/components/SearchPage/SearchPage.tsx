import { useDBContext } from "common/hooks/useDBContext";
import React, { useDeferredValue, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SearchResult,
} from "common/types/types";
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

  const findWords = (s: string):SearchResult[] => {
    return searchForWord(s, langCode, topicsFromDB, ["eng", "isl"])
  }

  const [searchResult, setSearchResult] = React.useState<SearchResult[]>(
    currSearch ? findWords(currSearch) : [],
  );

  const deferredSearchResult = useDeferredValue(searchResult);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      if (value === "") {
        setSearchResult([]);
        return;
      }
      if (value.length < 2) {
        return;
      }
      const res = findWords(value);
      setSearchResult(res);
    }, 400),
  ).current;

  const handleSearch = (value: string): void => {
    if (value === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
      setSearchResult([]);
      debouncedSearch.clear();
      return;
    }
    searchParams.set("search", value);
    setSearchParams(searchParams);
    debouncedSearch(value);
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

      <div className={`${styles.searchResultWrapper} ${styles.grid}`}>
        <div>left menu</div>
        <SearchResultView searchResults={deferredSearchResult.slice(0, 20)} />
      </div>
    </div>
  );
};

export default SearchPage;
