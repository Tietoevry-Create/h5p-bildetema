import React, { useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { Language } from "common/types/types";
import { useDebouncedCallback } from "use-debounce";
import { isLanguageCode } from "common/types/LanguageCode";
import { DialogProvider } from "common/context/DialogContext";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
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
import { useL10n } from "../../hooks/useL10n";

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
  const languages = useLanguagesWithTranslatedLabels();
  const langCode = useCurrentLanguageCode();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchLanguage, setSearchLanguage] = React.useState<Language>(
    languages.find(lang => lang.code === langCode) ||
      // TODO should not be static
      ({ code: langCode, label: "Bokmål" } as Language),
  );

  const viewLangCode = searchParams.get(SearchParamKeys.VIEW_LANG);

  // TODO: if current language is not Norwegian, set viewLanguage to Norwegian
  const [viewLanguages, setViewLanguages] = React.useState<Language[]>(() => {
    const viewLangs: Language[] = [];
    if (viewLangCode) {
      if (isLanguageCode(viewLangCode))
        viewLangs.push(
          languages.find(lang => lang.code === viewLangCode) || searchLanguage,
        );
      return viewLangs;
    }
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

  const searchInputPlaceholder = replacePlaceholders(
    useL10n("searchInputPlaceholder"),
    {
      amount: state.filteredSearchResults.length.toString(),
    },
  ).join("");

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

  const handleViewLanguageChange = (lang: OptionType<Language>): void => {
    if (lang.code === viewLanguages[0]?.code) {
      searchParams.delete("viewLang");
      setSearchParams(searchParams);
      setViewLanguages([]);
      handleSearch(currSearch);
      return;
    }
    searchParams.set("viewLang", lang.code);
    setSearchParams(searchParams);
    setViewLanguages([lang]);
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

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchViewBackground}>
        <div className={`${styles.searchViewWrapper} ${styles.mainSize}`}>
          <div className={styles.searchView}>
            <SearchView
              handleSearch={handleSearch}
              search={currSearch}
              languages={languages}
              searchLanguage={searchLanguage}
              handleSearchLanguageChange={handleSearchLanguageChange}
              searchInputPlaceholder={searchInputPlaceholder}
              // Todo handle multiple languages
              viewLanguage={viewLanguages.length > 0 ? viewLanguages[0] : null}
              handleViewLanguageChange={handleViewLanguageChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.searchResultBackground}>
        <div className={`${styles.grid} ${styles.mainSize}`}>
          <DialogProvider>
            <SearchResultView
              searchResults={deferredSearchResult}
              search={currSearch}
              searchResultAmount={state.filteredSearchResults.length}
              filter={filter}
              resetFilter={resetFilter}
              handleFilterChange={handleFilterChange}
              // TODO: Remove if not needed
              // sortOptions={searchOrderOptions}
              // handleOrderChange={handleOrderChange}
              // resultSortType={state.order}
            />
          </DialogProvider>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
