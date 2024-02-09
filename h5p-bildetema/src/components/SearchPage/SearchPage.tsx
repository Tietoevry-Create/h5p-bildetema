import { useDBContext } from "common/hooks/useDBContext";
import React, { useDeferredValue, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Language, SearchResult } from "common/types/types";
import {
  sortSearchByPosition,
  sortSearchByTopic,
  sortSearchBylevenshtein,
} from "common/utils/searchResults.utils";
import debounce from "debounce";
import { searchForWord } from "common/utils/word.utils";
import { LanguageCode } from "common/types/LanguageCode";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import SearchResultView from "./SearchResultView/SearchResultView";
import SearchView from "./SearchView/SearchView";
import styles from "./SearchPage.module.scss";
import { OptionType } from "../Select/Select";

type SearchPageProps = {
  setIsTopicRouteFalse: () => void;
};

const SearchPage = ({ setIsTopicRouteFalse }: SearchPageProps): JSX.Element => {
  setIsTopicRouteFalse();
  const { topics: topicsFromDB, languages } = useDBContext() || {};
  const langCode = useCurrentLanguageCode();

  const [currLang, setCurrLang] = React.useState<Language>(
    languages?.find(l => l.code === langCode) ||
    // TODO should not be static
    ({ code: langCode, label: "Bokmål" } as Language),
  );

  // TODO: if current language is not Norwegian, set viewLanguage to Norwegian
  const [viewLanguage, setViewLanguage] = React.useState<Language>(currLang);

  const [searchParams, setSearchParams] = useSearchParams();
  const currSearch = searchParams.get("search") ?? "";

  const amountVisible = 20;

  // TODO translate / change
  const sortOptions = ["Prioritet", "Likhet", "Tema"] as const;

  type SortOptions = (typeof sortOptions)[number];

  const [resultSortType, setResultSortType] = React.useState<SortOptions>(
    sortOptions[0],
  );

  const findWords = (
    s: string,
    lCode: LanguageCode,
    vlCode: LanguageCode,
  ): SearchResult[] => {
    return searchForWord(s, lCode, topicsFromDB, [vlCode]);
  };

  const sortResults = (
    sortOption: SortOptions,
    search: string,
    searchResults: SearchResult[],
  ): SearchResult[] => {
    switch (sortOption) {
      case "Likhet":
        return sortSearchBylevenshtein(search, searchResults);
      case "Prioritet":
        return sortSearchByPosition(search, searchResults);
      case "Tema":
        return sortSearchByTopic(searchResults);
      default:
        return [];
    }
  };

  const [searchResult, setSearchResult] = React.useState<SearchResult[]>(() => {
    if (currSearch) {
      const res = findWords(currSearch, langCode, viewLanguage.code);
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

  const handleOrderChange = (option: OptionType<{ label: string }>): void => {
    setResultSortType(option.label as SortOptions);
    const res = sortResults(
      option.label as SortOptions,
      currSearch,
      searchResult,
    );
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
    debounce(
      (
        value: string,
        sortType: SortOptions,
        lCode: LanguageCode,
        vlCode: LanguageCode,
      ) => {
        if (value === "") {
          setSearchResult([]);
          setVisibleSearchResult([]);
          return;
        }
        if (value.length < 2) {
          return;
        }
        const res = findWords(value, lCode, vlCode);
        setResults(sortResults(sortType, value, res));
      },
      400,
    ),
  ).current;

  const handleSearch = (
    value: string,
    lCode?: LanguageCode,
    vlCode?: LanguageCode,
  ): void => {
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
    debouncedSearch(
      value,
      resultSortType,
      lCode ?? langCode,
      vlCode ?? viewLanguage.code,
    );
  };

  const handleLanguageChange = (lang: OptionType<Language>): void => {
    searchParams.set("lang", lang.code);
    setSearchParams(searchParams);
    setCurrLang(lang);
    handleSearch(currSearch ?? "", lang.code, viewLanguage.code);
  };

  const handleViewLanguageChange = (lang: OptionType<Language>): void => {
    searchParams.set("viewLang", lang.code);
    setSearchParams(searchParams);
    setViewLanguage(lang);
    handleSearch(currSearch ?? "", currLang.code, lang.code);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchViewBackground}>
        <div className={`${styles.searchViewWrapper} ${styles.grid}`}>
          <div className={styles.searchView}>
            <SearchView
              handleSearch={handleSearch}
              search={currSearch}
              languages={languages ?? []}
              currLang={currLang}
              viewLanguage={viewLanguage}
              handleLanguageChange={handleLanguageChange}
              handleViewLanguageChange={handleViewLanguageChange}
            />
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
            resultSortType={{ label: resultSortType }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
