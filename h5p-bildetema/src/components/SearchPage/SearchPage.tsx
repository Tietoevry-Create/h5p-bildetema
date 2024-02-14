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

const SearchPage = (): JSX.Element => {
  const { topics: topicsFromDB, languages } = useDBContext() || {};
  const [searchParams, setSearchParams] = useSearchParams();

  const langCode = useCurrentLanguageCode();

  const viewLangCode = searchParams.get("viewLang");

  const [currLang, setCurrLang] = React.useState<Language>(
    languages?.find(l => l.code === langCode) ||
      // TODO should not be static
      ({ code: langCode, label: "Bokmål" } as Language),
  );

  // TODO: if current language is not Norwegian, set viewLanguage to Norwegian
  const [viewLanguage, setViewLanguage] = React.useState<Language>(() => {
    if (viewLangCode) {
      return languages?.find(l => l.code === viewLangCode) || currLang;
    }
    // TODO should change based on page language (no / se / de ....)
    if (currLang.code !== "nob") {
      return languages?.find(l => l.code === "nob") || currLang;
    }
    return languages?.find(l => l.code === "eng") || currLang;
  });

  const currSearch = searchParams.get("search") ?? "";
  const filter = searchParams.get("filter")?.split(",") ?? [];

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

  const filterSearchResults = (
    currFilter: string[],
    currSearchResults: SearchResult[],
  ): SearchResult[] => {
    if (currFilter.length === 0) {
      return currSearchResults;
    }
    return currSearchResults.filter(result =>
      currFilter.includes(result.topicId),
    );
  };

  const [searchResult, setSearchResult] = React.useState<SearchResult[]>(() => {
    if (currSearch) {
      const res = findWords(currSearch, langCode, viewLanguage.code);
      return sortResults(resultSortType, currSearch, res);
    }
    return [];
  });

  const [filteredSearchResult, setFilteredSearchResult] = React.useState<
    SearchResult[]
  >(filterSearchResults(filter, searchResult));

  const [visibleSearchResult, setVisibleSearchResult] = React.useState<
    SearchResult[]
  >(filteredSearchResult.slice(0, amountVisible));

  const deferredSearchResult = useDeferredValue(visibleSearchResult);

  const setFilteredVisibleResults = (
    currFilter: string[],
    results: SearchResult[],
  ): void => {
    const filtered = filterSearchResults(currFilter, results);
    setFilteredSearchResult(filtered);
    setVisibleSearchResult(filtered.slice(0, amountVisible));
  };

  const setResults = (results: SearchResult[], currFilter: string[]): void => {
    setSearchResult(results);
    setFilteredVisibleResults(currFilter, results);
  };

  const handleOrderChange = (option: OptionType<{ label: string }>): void => {
    setResultSortType(option.label as SortOptions);
    const res = sortResults(
      option.label as SortOptions,
      currSearch,
      searchResult,
    );
    setResults(res, filter);
  };

  const loadMore = (): void => {
    setVisibleSearchResult(prev => {
      const visibleSearch = [
        ...prev,
        ...filteredSearchResult.slice(prev.length, prev.length + amountVisible),
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
        currFilter: string[],
      ) => {
        if (value === "") {
          setSearchResult([]);
          setVisibleSearchResult([]);
          setFilteredSearchResult([]);
          return;
        }
        if (value.length < 2) {
          return;
        }
        const res = findWords(value, lCode, vlCode);
        setResults(sortResults(sortType, value, res), currFilter);
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
      setFilteredSearchResult([]);
      return;
    }
    searchParams.set("search", value);
    setSearchParams(searchParams);
    debouncedSearch(
      value,
      resultSortType,
      lCode ?? langCode,
      vlCode ?? viewLanguage.code,
      filter,
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

  const handleFilterChange = (topicId: string, add: boolean): void => {
    let newFilter: string[];
    if (add) {
      newFilter = [...filter, topicId];
    } else {
      newFilter = filter.filter(id => id !== topicId);
    }
    if (newFilter.length === 0) {
      searchParams.delete("filter");
      setSearchParams(searchParams);
      setFilteredVisibleResults(newFilter, searchResult);
      return;
    }
    searchParams.set("filter", newFilter.join(","));
    setSearchParams(searchParams);
    setFilteredVisibleResults(newFilter, searchResult);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchViewBackground}>
        <div className={`${styles.searchViewWrapper} ${styles.mainSize}`}>
          <div className={styles.searchView}>
            <SearchView
              filter={filter}
              handleSearch={handleSearch}
              handleFilterChange={handleFilterChange}
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
        <div className={`${styles.grid} ${styles.mainSize}`}>
          <SearchResultView
            searchResults={deferredSearchResult}
            search={currSearch}
            loadMore={loadMore}
            searchResultAmount={filteredSearchResult.length}
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
