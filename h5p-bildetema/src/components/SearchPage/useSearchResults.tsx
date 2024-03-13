import {
  Language,
  NewWord,
  SearchResult,
  SearchResultTranslations,
} from "common/types/types";
import {
  sortNewWordsByPosition,
  sortNewWordsBylevenshtein,
  sortSearchByTopic,
} from "common/utils/searchResults.utils";
import { searchForNewWord } from "common/utils/word.utils";
import { useReducer } from "react";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { getImageUrl } from "common/utils/image/image.utils";
import { getAudioFiles } from "common/utils/audio/audio.utils";
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

type LoadMoreAction = {
  type: typeof ActionType.LOAD_MORE;
  payload: {
    languages: Language[];
  };
};

type FilterAction = {
  type: typeof ActionType.FILTER;
  payload: {
    search: string;
    filter: string[];
    languages: Language[];
  };
};

type Action =
  | SearchAction
  | ResetAction
  | SortAction
  | FilterAction
  | LoadMoreAction;

type SearchState = {
  searchResults: NewWord[];
  filteredSearchResults: NewWord[];
  visibleSearchResults: SearchResult[];
  order: SearchOrderOption;
  newWords: NewWord[];
  backendUrl: string;
  langCodeTolanguages: Map<LanguageCode, Language>;
};

const resultAmount = 20;

const getTranslations = (
  word: NewWord,
  languages: Language[],
  backendUrl: string,
): SearchResultTranslations[] => {
  return languages.map(lang => {
    const labels = word.translations.get(lang.code)?.labels || [];
    const audioFiles = getAudioFiles(word.id, backendUrl, lang.code);
    const searchResultTranslations: SearchResultTranslations = {
      lang,
      labels,
      audioFiles,
    };
    return searchResultTranslations;
  });
};

const newWordsToSearchResult = (
  newWords: NewWord[],
  languages: Language[],
  backendUrl: string,
): SearchResult[] => {
  return newWords.map(word => {
    const images = word.images.map(i => getImageUrl(i, backendUrl));
    const translations = getTranslations(word, languages, backendUrl);

    const result: SearchResult = {
      id: word.id,
      images,
      translations,
      topicId: word.topicId,
      subTopicId: word.subTopicId,
    };
    return result;
  });
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
      const res = searchForNewWord(
        payload.search,
        payload.searchLanguage.code,
        state.newWords,
      );
      const sortedRes = sortResults(
        state.order.option,
        payload.search,
        res,
        payload.searchLanguage.code,
      );
      const filtered = filterSearchResults(sortedRes, payload.filter);
      const visibleSearchResults = newWordsToSearchResult(
        filtered.slice(0, resultAmount),
        [payload.searchLanguage, ...payload.viewLanguage],
        state.backendUrl,
      );
      return {
        ...state,
        searchResults: sortedRes,
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
        filteredSearchRes.slice(0, resultAmount),
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
        filteredSearchRes.slice(0, resultAmount),
        payload.languages,
        state.backendUrl,
      );
      return {
        ...state,
        filteredSearchResults: filteredSearchRes,
        visibleSearchResults,
      };
    }

    case ActionType.LOAD_MORE: {
      const { payload } = action;
      const currentAmount = state.visibleSearchResults.length;
      const newVisibleResults = state.filteredSearchResults.slice(
        currentAmount,
        currentAmount + resultAmount,
      );
      const newVisibleSearchResults = newWordsToSearchResult(
        newVisibleResults,
        payload.languages,
        state.backendUrl,
      );

      return {
        ...state,
        visibleSearchResults: [
          ...state.visibleSearchResults,
          ...newVisibleSearchResults,
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
    newWords: idToWords ? [...idToWords.values()] : [],
    backendUrl,
    langCodeTolanguages,
  };

  const initialState = ((): SearchState => {
    if (search === "") {
      return defaultState;
    }

    const res = searchForNewWord(
      search,
      searchLanguage.code,
      defaultState.newWords,
    );
    if (res.length === 0) {
      return defaultState;
    }

    const sortedRes = sortResults(
      order.option,
      search,
      res,
      searchLanguage.code,
    );
    const filteredRes = filterSearchResults(sortedRes, filter);

    const visibleSearchResults = newWordsToSearchResult(
      filteredRes.slice(0, resultAmount),
      [searchLanguage, ...viewLanguage],
      backendUrl,
    );

    return {
      ...defaultState,
      searchResults: sortedRes,
      filteredSearchResults: filteredRes,
      visibleSearchResults,
    };
  })();

  const [state, dispatch] = useReducer(searchReducer, initialState);

  return { state, dispatch };
};
