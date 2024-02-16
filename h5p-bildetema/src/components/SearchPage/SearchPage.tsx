import { useDBContext } from "common/hooks/useDBContext";
import React, { useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { Language } from "common/types/types";
import { useDebouncedCallback } from "use-debounce";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import SearchResultView from "./SearchResultView/SearchResultView";
import SearchView from "./SearchView/SearchView";
import styles from "./SearchPage.module.scss";
import { OptionType } from "../Select/Select";
import {
  ActionType,
  SearchOrderOption,
  SortOptions,
  useSearchResults,
} from "./useSearchResults";

// TODO TRANSLATE LABELS
const searchOrderOptions: SearchOrderOption[] = [
  { label: "Prioritet", option: SortOptions.PRIORITY },
  { label: "Likhet", option: SortOptions.SIMILARITY },
  { label: "Tema", option: SortOptions.TOPIC },
];

const SearchParamKeys = {
  SEARCH: "search",
  FILTER: "filter",
  VIEW_LANG: "viewLang",
  SEARCH_LANG: "lang",
};

const SearchPage = (): JSX.Element => {
  const { topics: topicsFromDB = [], languages = [] } = useDBContext() || {};

  const [searchParams, setSearchParams] = useSearchParams();

  const langCode = useCurrentLanguageCode();

  const viewLangCode = searchParams.get(SearchParamKeys.VIEW_LANG);

  const [searchLanguage, setSearchLanguage] = React.useState<Language>(
    languages?.find(l => l.code === langCode) ||
      // TODO should not be static
      ({ code: langCode, label: "Bokmål" } as Language),
  );

  // TODO: if current language is not Norwegian, set viewLanguage to Norwegian
  const [viewLanguage, setViewLanguage] = React.useState<Language>(() => {
    if (viewLangCode) {
      return languages?.find(l => l.code === viewLangCode) || searchLanguage;
    }
    // TODO should change based on page language (no / se / de ....)
    if (searchLanguage.code !== "nob") {
      return languages?.find(l => l.code === "nob") || searchLanguage;
    }
    return languages?.find(l => l.code === "eng") || searchLanguage;
  });

  const currSearch = searchParams.get(SearchParamKeys.SEARCH) ?? "";

  const filter = searchParams.get(SearchParamKeys.FILTER)?.split(",") ?? [];

  const { state, dispatch } = useSearchResults({
    filter,
    search: currSearch,
    searchLanguage,
    topics: topicsFromDB,
    order: searchOrderOptions[0],
    viewLanguage: [viewLanguage],
  });

  const deferredSearchResult = useDeferredValue(state.visibleSearchResults);

  const handleOrderChange = (option: SearchOrderOption): void => {
    dispatch({
      type: ActionType.SORT,
      payload: { searchOrderOption: option, search: currSearch },
    });
  };

  const loadMore = (): void => {
    dispatch({ type: ActionType.LOAD_MORE });
  };

  const debouncedSearch = useDebouncedCallback((search: string) => {
    dispatch({
      type: ActionType.SEARCH,
      payload: {
        search,
        topics: topicsFromDB,
        searchLanguage,
        filter,
        viewLanguage: [viewLanguage],
      },
    });
  }, 400);

  const handleSearch = (search: string): void => {
    if (search === "") {
      searchParams.delete(SearchParamKeys.SEARCH);
      debouncedSearch.cancel();
      setSearchParams(searchParams);
      dispatch({ type: ActionType.RESET });
      return;
    }
    searchParams.set(SearchParamKeys.SEARCH, search);
    setSearchParams(searchParams);
    if (search.length < 2) return;

    debouncedSearch(search);
  };

  const handleSearchLanguageChange = (lang: OptionType<Language>): void => {
    searchParams.set("lang", lang.code);
    setSearchParams(searchParams);
    setSearchLanguage(lang);
    handleSearch(currSearch);
  };

  const handleViewLanguageChange = (lang: OptionType<Language>): void => {
    searchParams.set("viewLang", lang.code);
    setSearchParams(searchParams);
    setViewLanguage(lang);
    handleSearch(currSearch);
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
      dispatch({ type: ActionType.FILTER, payload: newFilter });
      return;
    }
    searchParams.set("filter", newFilter.join(","));
    setSearchParams(searchParams);
    dispatch({ type: ActionType.FILTER, payload: newFilter });
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
              languages={languages}
              searchLanguage={searchLanguage}
              viewLanguage={viewLanguage}
              handleSearchLanguageChange={handleSearchLanguageChange}
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
            searchResultAmount={state.filteredSearchResults.length}
            sortOptions={searchOrderOptions}
            handleOrderChange={handleOrderChange}
            resultSortType={state.order}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
