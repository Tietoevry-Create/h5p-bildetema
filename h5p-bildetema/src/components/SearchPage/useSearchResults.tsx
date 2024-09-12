import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { Language, NewWord, SearchResult } from "common/types/types";
import { newWordsToSearchResult } from "common/utils/data.utils";
import {
  sortNewWordsByPosition,
  sortNewWordsBylevenshtein,
  sortSearchByTopic,
} from "common/utils/searchResults.utils";
import { filterOutTopics, searchForNewWord } from "common/utils/word.utils";
import { useReducer } from "react";
import { OptionType } from "../Select/Select";

export const ActionType = {
  SEARCH: "SEARCH",
  RESET: "RESET_SEARCH_RESULTS",
  SORT: "SORT",
  FILTER: "FILTER",
} as const;

export const SortOptions = {
  SIMILARITY: "SIMILARITY",
  PRIORITY: "PRIORITY",
  TOPIC: "TOPIC",
} as const;

type SortOptions = (typeof SortOptions)[keyof typeof SortOptions];

export type SearchOrderOption = OptionType<{
  label: string;
  option: SortOptions;
}>;

type SearchAction = {
  type: typeof ActionType.SEARCH;
  payload: {
    search: string;
    searchLanguage: Language;
    filter: string[];
    viewLanguage: Language[];
  };
};

type SortAction = {
  type: typeof ActionType.SORT;
  payload: {
    searchOrderOption: SearchOrderOption;
    search: string;
    langCode: LanguageCode;
    languages: Language[];
  };
};

type ResetAction = {
  type: typeof ActionType.RESET;
};

type FilterAction = {
  type: typeof ActionType.FILTER;
  payload: {
    search: string;
    filter: string[];
    languages: Language[];
  };
};

type Action = SearchAction | ResetAction | SortAction | FilterAction;

type SearchState = {
  searchResults: NewWord[];
  filteredSearchResults: NewWord[];
  visibleSearchResults: SearchResult[];
  order: SearchOrderOption;
  newWords: NewWord[];
  backendUrl: string;
  langCodeTolanguages: Map<LanguageCode, Language>;
};

const filterSearchResults = (
  searchResults: NewWord[],
  filter: string[],
): NewWord[] => {
  if (filter.length === 0) {
    return searchResults;
  }
  return searchResults.filter(result => filter.includes(result.topicId));
};

const sortResults = (
  sortOption: SortOptions,
  search: string,
  searchResults: NewWord[],
  langCode: LanguageCode,
): NewWord[] => {
  switch (sortOption) {
    case SortOptions.SIMILARITY:
      return sortNewWordsBylevenshtein(search, searchResults, langCode);
    case SortOptions.PRIORITY:
      return sortNewWordsByPosition(search, searchResults, langCode);
    case SortOptions.TOPIC:
      return sortSearchByTopic(searchResults);
    default:
      return searchResults;
  }
};

const searchReducer = (state: SearchState, action: Action): SearchState => {
  const { type } = action;
  switch (type) {
    case ActionType.SEARCH: {
      const { payload } = action;
      let res = searchForNewWord(
        payload.search,
        payload.searchLanguage.code,
        state.newWords,
      );
      if (payload.search !== "") {
        res = sortResults(
          state.order.option,
          payload.search,
          res,
          payload.searchLanguage.code,
        );
      }
      const filtered = filterSearchResults(res, payload.filter);
      const visibleSearchResults = newWordsToSearchResult(
        filtered,
        [payload.searchLanguage, ...payload.viewLanguage],
        state.backendUrl,
      );
      return {
        ...state,
        searchResults: res,
        filteredSearchResults: filtered,
        visibleSearchResults,
      };
    }

    case ActionType.RESET:
      return {
        ...state,
        filteredSearchResults: [],
        searchResults: [],
        visibleSearchResults: [],
      };

    case ActionType.SORT: {
      const { payload } = action;
      const sortedSearchRes = sortResults(
        payload.searchOrderOption.option,
        payload.search,
        state.searchResults,
        payload.langCode,
      );

      const filteredSearchRes = sortResults(
        payload.searchOrderOption.option,
        payload.search,
        state.filteredSearchResults,
        payload.langCode,
      );

      const visibleSearchResults = newWordsToSearchResult(
        filteredSearchRes,
        payload.languages,
        state.backendUrl,
      );
      return {
        ...state,
        order: payload.searchOrderOption,
        searchResults: sortedSearchRes,
        filteredSearchResults: filteredSearchRes,
        visibleSearchResults,
      };
    }

    case ActionType.FILTER: {
      const { payload } = action;
      const filteredSearchRes = (() => {
        if (payload.filter.length === 0) {
          return state.searchResults;
        }
        if (payload.search === "")
          return filterSearchResults(state.newWords, payload.filter);

        return filterSearchResults(state.searchResults, payload.filter);
      })();

      const visibleSearchResults = newWordsToSearchResult(
        filteredSearchRes,
        payload.languages,
        state.backendUrl,
      );
      return {
        ...state,
        filteredSearchResults: filteredSearchRes,
        visibleSearchResults,
      };
    }

    default:
      return state;
  }
};

export const useSearchResults = ({
  search,
  filter,
  viewLanguage,
  searchLanguage,
  order,
}: {
  order: SearchOrderOption;
  search: string;
  filter: string[];
  viewLanguage: Language[];
  searchLanguage: Language;
}): {
  state: SearchState;
  dispatch: React.Dispatch<Action>;
} => {
  const { idToWords, langCodeTolanguages } = useNewDBContext();
  const backendUrl = useBackendUrlContext();

  const defaultState: SearchState = {
    searchResults: [],
    filteredSearchResults: [],
    visibleSearchResults: [],
    order,
    newWords: idToWords ? filterOutTopics([...idToWords.values()]) : [],
    backendUrl,
    langCodeTolanguages,
  };

  const initialState = ((): SearchState => {
    let res = searchForNewWord(
      search,
      searchLanguage.code,
      defaultState.newWords,
    );
    if (res.length === 0) {
      return defaultState;
    }

    if (search !== "") {
      res = sortResults(order.option, search, res, searchLanguage.code);
    }

    const filteredRes = filterSearchResults(res, filter);

    const visibleSearchResults = newWordsToSearchResult(
      filteredRes,
      [searchLanguage, ...viewLanguage],
      backendUrl,
    );

    return {
      ...defaultState,
      searchResults: res,
      filteredSearchResults: filteredRes,
      visibleSearchResults,
    };
  })();

  const [state, dispatch] = useReducer(searchReducer, initialState);

  return { state, dispatch };
};
