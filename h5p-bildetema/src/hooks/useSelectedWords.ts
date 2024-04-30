import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { NewWord, SearchResult } from "common/types/types";
import { newWordsToSearchResult } from "common/utils/data.utils";
import { useLocation } from "react-router-dom";
import { useCurrentLanguage } from "./useCurrentLanguage";

export const useSelectedWords = (): SearchResult[] => {
  const { idToWords } = useNewDBContext();
  const backedUrl = useBackendUrlContext();
  const lang = useCurrentLanguage();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const words = params.get("words")?.split(",");

  if (words?.length && words.length > 0) {
    const newWords = words
      .map(wordId => {
        const newWord = idToWords.get(wordId);
        return newWord;
      })
      .filter(el => el !== undefined);

    // newWords as NewWord[] should not be necessary, because we filter out all undefined elements
    // but we get some build errors if we do not do this...
    return newWordsToSearchResult(newWords as NewWord[], [lang], backedUrl);
  }
  return [];
};

export const useSelectedNewWords = (): NewWord[] => {
  const { idToWords } = useNewDBContext();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const words = params.get("words")?.split(",");

  if (words?.length && words.length > 0) {
    const newWords = words
      .map(wordId => {
        const newWord = idToWords.get(wordId);
        return newWord;
      })
      .filter(el => el !== undefined);

    return newWords as NewWord[];
  }
  return [];
};
