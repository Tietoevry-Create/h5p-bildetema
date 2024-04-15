import React, { useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { Language } from "common/types/types";
import { useDebouncedCallback } from "use-debounce";
import { useNewDBContext } from "common/hooks/useNewDBContext";
// import { isLanguageCode } from "common/types/LanguageCode";
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
import { useLanguagesWithTranslatedLabels } from "../../hooks/useLanguagesWithTranslatedLabels";

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
  const { langCodeTolanguages } = useNewDBContext();

  const languages = useLanguagesWithTranslatedLabels();

  const [searchParams, setSearchParams] = useSearchParams();

  const langCode = useCurrentLanguageCode();

  // const viewLangCode = searchParams.get(SearchParamKeys.VIEW_LANG);

  const [searchLanguage, setSearchLanguage] = React.useState<Language>(
    langCodeTolanguages.get(langCode) ||
      // TODO should not be static
      ({ code: langCode, label: "Bokmål" } as Language),
  );

  // TODO: if current language is not Norwegian, set viewLanguage to Norwegian
  const [viewLanguages] = React.useState<Language[]>(() => {
    const viewLangs: Language[] = [];
    // if (viewLangCode) {
    //   if (isLanguageCode(viewLangCode))
    //     viewLangs.push(langCodeTolanguages.get(viewLangCode) || searchLanguage);
    //     return viewLangs;
    // }
    // // TODO should change based on page language (no / se / de ....)
    // if (searchLanguage.code !== "nob") {
    //   viewLangs.push(langCodeTolanguages.get("nob") || searchLanguage);
    //   return viewLangs;
    // }
    // viewLangs.push(langCodeTolanguages.get("eng") || searchLanguage);
    return viewLangs;
  });

  const currSearch = searchParams.get(SearchParamKeys.SEARCH) ?? "";

  const filter = searchParams.get(SearchParamKeys.FILTER)?.split(",") ?? [];

  const { state, dispatch } = useSearchResults({
    filter,
    search: currSearch.trim(),
    searchLanguage,
    order: searchOrderOptions[0],
    viewLanguage: viewLanguages,
  });

  const deferredSearchResult = useDeferredValue(state.visibleSearchResults);

  // TODO: Remove if not needed
  // const handleOrderChange = (option: SearchOrderOption): void => {
  //   dispatch({
  //     type: ActionType.SORT,
  //     payload: {
  //       searchOrderOption: option,
  //       search: currSearch,
  //       langCode,
  //       languages: [searchLanguage, viewLanguage],
  //     },
  //   });
  // };

  const loadMore = (): void => {
    dispatch({
      type: ActionType.LOAD_MORE,
      payload: { languages: [searchLanguage, ...viewLanguages] },
    });
  };

  const debouncedSearch = useDebouncedCallback((search: string) => {
    dispatch({
      type: ActionType.SEARCH,
      payload: {
        search: search.trim(),
        searchLanguage,
        filter,
        viewLanguage: viewLanguages,
      },
    });
  }, 400);

  const handleSearch = (search: string): void => {
    searchParams.set(SearchParamKeys.SEARCH, search);
    setSearchParams(searchParams);
    debouncedSearch(search);
  };

  const handleSearchLanguageChange = (lang: OptionType<Language>): void => {
    searchParams.set("lang", lang.code);
    setSearchParams(searchParams);
    setSearchLanguage(lang);
    handleSearch(currSearch);
  };

  // const handleViewLanguageChange = (lang: OptionType<Language>): void => {
  //   searchParams.set("viewLang", lang.code);
  //   setSearchParams(searchParams);
  //   setViewLanguage(lang);
  //   handleSearch(currSearch);
  // };

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
      dispatch({
        type: ActionType.FILTER,
        payload: {
          search: currSearch.trim(),
          filter: newFilter,
          languages: [searchLanguage, ...viewLanguages],
        },
      });
      return;
    }
    searchParams.set("filter", newFilter.join(","));
    setSearchParams(searchParams);
    dispatch({
      type: ActionType.FILTER,
      payload: {
        search: currSearch.trim(),
        filter: newFilter,
        languages: [searchLanguage, ...viewLanguages],
      },
    });
  };

  const resetFilter = (): void => {
    searchParams.delete("filter");
    setSearchParams(searchParams);
    dispatch({
      type: ActionType.FILTER,
      payload: {
        search: currSearch.trim(),
        filter: [],
        languages: [searchLanguage, ...viewLanguages],
      },
    });
  };

  // TODO: translate
  const searchInputPlaceholder = `Søk blant ${state.filteredSearchResults.length} ord`;

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
              resetFilter={resetFilter}
              // viewLanguage={viewLanguage}
              handleSearchLanguageChange={handleSearchLanguageChange}
              // handleViewLanguageChange={handleViewLanguageChange}
              searchInputPlaceholder={searchInputPlaceholder}
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

            // TODO: Remove if not needed
            // sortOptions={searchOrderOptions}
            // handleOrderChange={handleOrderChange}
            // resultSortType={state.order}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
