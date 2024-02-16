import { Language, SearchResult, Topic } from "common/types/types";
import {
  sortSearchByPosition,
  sortSearchByTopic,
  sortSearchBylevenshtein,
} from "common/utils/searchResults.utils";
import { searchForWord } from "common/utils/word.utils";
import { useReducer } from "react";
import { OptionType } from "../Select/Select";

export const ActionType = {
  SEARCH: "SEARCH",
  RESET: "RESET_SEARCH_RESULTS",
  SORT: "SORT",
  FILTER: "FILTER",
  LOAD_MORE: "LOAD_MORE",
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
    topics: Topic[];
    viewLanguage?: Language[];
  };
};

type SortAction = {
  type: typeof ActionType.SORT;
  payload: {
    searchOrderOption: SearchOrderOption;
    search: string;
  };
};

type ResetAction = {
  type: typeof ActionType.RESET;
};

type LoadMoreAction = {
  type: typeof ActionType.LOAD_MORE;
};

type FilterAction = {
  type: typeof ActionType.FILTER;
  payload: string[];
};

type Action =
  | SearchAction
  | ResetAction
  | SortAction
  | FilterAction
  | LoadMoreAction;

type SearchState = {
  searchResults: SearchResult[];
  filteredSearchResults: SearchResult[];
  visibleSearchResults: SearchResult[];
  order: SearchOrderOption;
};

const resultAmount = 20;

const filterSearchResults = (
  searchResults: SearchResult[],
  filter: string[],
): SearchResult[] => {
  if (filter.length === 0) {
    return searchResults;
  }
  return searchResults.filter(result => filter.includes(result.topicId));
};

const sortResults = (
  sortOption: SortOptions,
  search: string,
  searchResults: SearchResult[],
): SearchResult[] => {
  switch (sortOption) {
    case SortOptions.SIMILARITY:
      return sortSearchBylevenshtein(search, searchResults);
    case SortOptions.PRIORITY:
      return sortSearchByPosition(search, searchResults);
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
      const res = searchForWord(
        payload.search,
        payload.searchLanguage,
        payload.topics,
        payload.viewLanguage,
      );
      const sortedRes = sortResults(state.order.option, payload.search, res);
      const filtered = filterSearchResults(sortedRes, payload.filter);
      return {
        ...state,
        searchResults: sortedRes,
        filteredSearchResults: filtered,
        visibleSearchResults: filtered.slice(0, resultAmount),
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
      );

      const filteredSearchRes = sortResults(
        payload.searchOrderOption.option,
        payload.search,
        state.filteredSearchResults,
      );

      return {
        ...state,
        order: payload.searchOrderOption,
        searchResults: sortedSearchRes,
        filteredSearchResults: filteredSearchRes,
        visibleSearchResults: filteredSearchRes.slice(0, resultAmount),
      };
    }
    case ActionType.FILTER: {
      const { payload } = action;
      const filteredSearchRes =
        payload.length === 0
          ? state.searchResults
          : filterSearchResults(state.searchResults, payload);
      return {
        ...state,
        filteredSearchResults: filteredSearchRes,
        visibleSearchResults: filteredSearchRes.slice(0, resultAmount),
      };
    }
    case ActionType.LOAD_MORE: {
      const currentAmount = state.visibleSearchResults.length;
      const newVisibleResults = state.filteredSearchResults.slice(
        currentAmount,
        currentAmount + resultAmount,
      );
      return {
        ...state,
        visibleSearchResults: [
          ...state.visibleSearchResults,
          ...newVisibleResults,
        ],
      };
    }

    default:
      return state;
  }
};

export const useSearchResults = ({
  search,
  filter,
  topics,
  viewLanguage,
  searchLanguage,
  order,
}: {
  order: SearchOrderOption;
  search: string;
  filter: string[];
  topics: Topic[];
  viewLanguage: Language[];
  searchLanguage: Language;
}): {
  state: SearchState;
  dispatch: React.Dispatch<Action>;
} => {
  const defaultState: SearchState = {
    searchResults: [],
    filteredSearchResults: [],
    visibleSearchResults: [],
    order,
  };

  const initialState = ((): SearchState => {
    if (search === "") {
      return defaultState;
    }

    const res = searchForWord(search, searchLanguage, topics, viewLanguage);
    if (res.length === 0) {
      return defaultState;
    }

    const sortedRes = sortResults(order.option, search, res);
    const filteredRes = filterSearchResults(sortedRes, filter);

    return {
      ...defaultState,
      searchResults: sortedRes,
      filteredSearchResults: filteredRes,
      visibleSearchResults: filteredRes.slice(0, resultAmount),
    };
  })();

  const [state, dispatch] = useReducer(searchReducer, initialState);

  return { state, dispatch };
};
