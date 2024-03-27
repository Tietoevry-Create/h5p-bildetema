import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { SearchResult } from "common/types/types";
import { newWordsToSearchResult } from "common/utils/data.utils";
import { useLocation } from "react-router-dom";
import { useCurrentLanguage } from "./useCurrentLanguage";

export const useSelectedWords = (): SearchResult[] => {
  const { idToWords } = useNewDBContext();
  const backedUrl = useBackendUrlContext();
  const lang = useCurrentLanguage()
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

      // return newWordsToSearchResult(newWords, [lang, {code: "pol", label: "Polski", rtl: false}], backedUrl);
      // return newWordsToSearchResult(newWords, [lang, {code: "pol", label: "Polski", rtl: false}, {code: "nob", label: "Bokmål", rtl: false}], backedUrl);
      return newWordsToSearchResult(newWords, [lang, ], backedUrl);

  }
  return [];
};
