import React, { useState, createContext, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useToggleSearchParam } from "../hooks/useToggleSearchParam";
import { SearchParameters } from "../enums/SearchParameters";

export type SearchParamContextType = {
  showArticles: boolean;
  showWrittenWords: boolean;
  editMode: boolean;
  handleShowArticlesChange: (value: boolean) => void;
  handleShowWrittenWordsChange: (value: boolean) => void;
  handleEditModeChange: (value: boolean) => void;
  syncStateWithParams: () => void;
};

export const SearchParamContext = createContext<
  SearchParamContextType | undefined
>(undefined);

const defaultShowWrittenWords = true;
const defaultShowArticles = false;
const defaultEditMode = false;

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

  const [editMode, setEditMode] = useState(
    searchParams.get(SearchParameters.editMode) !== null
      ? searchParams.get(SearchParameters.editMode) === "true"
      : defaultEditMode,
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

  const handleEditModeChange = useToggleSearchParam(
    SearchParameters.editMode,
    defaultEditMode,
    setEditMode,
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
      editMode,
      handleShowArticlesChange,
      handleShowWrittenWordsChange,
      handleEditModeChange,
      syncStateWithParams,
    }),
    [
      handleShowArticlesChange,
      handleShowWrittenWordsChange,
      handleEditModeChange,
      showArticles,
      showWrittenWords,
      editMode,
      syncStateWithParams,
    ],
  );

  return (
    <SearchParamContext.Provider value={values}>
      {children}
    </SearchParamContext.Provider>
  );
};
