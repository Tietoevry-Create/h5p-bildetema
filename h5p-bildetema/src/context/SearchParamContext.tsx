import React, { useState, createContext, useMemo, useCallback, JSX } from "react";
import { useSearchParams } from "react-router-dom";
import { useToggleSearchParam } from "../hooks/useToggleSearchParam";
import { SearchParameters } from "../enums/SearchParameters";

export type SearchParamContextType = {
  showArticles: boolean;
  showWrittenWords: boolean;
  handleShowArticlesChange: (value: boolean) => void;
  handleShowWrittenWordsChange: (value: boolean) => void;
  syncStateWithParams: () => void;
};

export const SearchParamContext = createContext<
  SearchParamContextType | undefined
>(undefined);

const defaultShowWrittenWords = true;
const defaultShowArticles = false;

type SearchParamProviderType = {
  children: React.ReactNode;
};

export const SearchParamProvider = ({
  children,
}: SearchParamProviderType): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showWrittenWords, setShowWrittenWords] = useState(
    searchParams.get(SearchParameters.wordsVisible) !== null
      ? searchParams.get(SearchParameters.wordsVisible) === "true"
      : defaultShowWrittenWords,
  );

  const [showArticles, setShowArticles] = useState(
    searchParams.get(SearchParameters.articlesVisible) !== null
      ? searchParams.get(SearchParameters.articlesVisible) === "true"
      : defaultShowArticles,
  );

  const handleShowArticlesChange = useToggleSearchParam(
    SearchParameters.articlesVisible,
    defaultShowArticles,
    setShowArticles,
  );

  const handleShowWrittenWordsChange = useToggleSearchParam(
    SearchParameters.wordsVisible,
    defaultShowWrittenWords,
    setShowWrittenWords,
  );

  const syncStateWithParams = useCallback(() => {
    if (showWrittenWords !== defaultShowWrittenWords) {
      searchParams.set(SearchParameters.wordsVisible, String(showWrittenWords));
    }

    if (showArticles !== defaultShowArticles) {
      searchParams.set(SearchParameters.articlesVisible, String(showArticles));
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, showArticles, showWrittenWords]);

  const values: SearchParamContextType = useMemo(
    () => ({
      showArticles,
      showWrittenWords,
      handleShowArticlesChange,
      handleShowWrittenWordsChange,
      syncStateWithParams,
    }),
    [
      handleShowArticlesChange,
      handleShowWrittenWordsChange,
      showArticles,
      showWrittenWords,
      syncStateWithParams,
    ],
  );

  return (
    <SearchParamContext.Provider value={values}>
      {children}
    </SearchParamContext.Provider>
  );
};
