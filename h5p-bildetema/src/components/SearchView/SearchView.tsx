import { useDBContext } from "common/hooks/useDBContext";
import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SearchResult,
  Topic,
  searchResultTranslations,
  Word,
} from "common/types/types";
import debounce from "debounce";
// import {distance, closest} from 'fastest-levenshtein'
import { LanguageCode } from "common/types/LanguageCode";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import SearchResultView from "./SearchResultView";
import SearchField from "./SearchField";
import styles from "./SearchView.module.scss";

type SearchViewProps = {
  setIsTopicRouteFalse: () => void;
};

const SearchView = ({ setIsTopicRouteFalse }: SearchViewProps): JSX.Element => {
  setIsTopicRouteFalse();
  // const { topics: topicsFromDB, languages: languagesFromDB } =
  const { topics: topicsFromDB } = useDBContext() || {};
  const langCode = useCurrentLanguageCode();
  const [searchParams, setSearchParams] = useSearchParams();

  const currSearch = searchParams.get("search") ?? "";

  const findTranslationsForWord = (
    word: Word,
    topic: Topic,
    languagesToFind: LanguageCode[],
  ): searchResultTranslations[] => {
    if (languagesToFind.length === 0) {
      return [];
    }
    const results: searchResultTranslations[] = [];
    languagesToFind.forEach(lc => {
      const translation = topic.words.get(lc)?.find(w => w.id === word.id);
      if (translation) {
        results.push({
          langCode: lc,
          audioFiles: translation.audioFiles,
          labels: translation.labels,
        });
      }
    });

    return results;
  };

  const searchForWord = (
    s: string,
    languagesToFind: LanguageCode[] = ["swe", "isl"],
  ): SearchResult[] => {
    const resWords = topicsFromDB
      ?.map(topic => {
        const topicWords = topic.words.get(langCode);
        if (topicWords?.length) {
          const p = topicWords
            .filter(w => {
              return w.labels.some(label => label.label.includes(s));
            })
            .map(w => {
              const searchResult: SearchResult = {
                id: w.id,
                images: w.images,
                translations: [
                  {
                    langCode,
                    labels: w.labels,
                    audioFiles: w.audioFiles,
                  },
                  ...findTranslationsForWord(w, topic, languagesToFind),
                ],
                topicId: topic.id,
              };
              return searchResult;
            });
          return p;
        }
        return topic.subTopics
          .map(subTopic => {
            const subTopicWords = subTopic.words.get(langCode);
            if (subTopicWords?.length) {
              return subTopicWords
                .filter(w => {
                  return w.labels.some(label => label.label.includes(s));
                })
                .map(w => {
                  const searchResult: SearchResult = {
                    id: w.id,
                    images: w.images,
                    translations: [
                      {
                        langCode,
                        labels: w.labels,
                        audioFiles: w.audioFiles,
                      },
                      ...findTranslationsForWord(w, subTopic, languagesToFind),
                    ],
                    topicId: topic.id,
                    subTopicId: subTopic.id,
                  };

                  return searchResult;
                });
            }
            return [];
          })
          .flat();
      })
      .flat()
      .filter(Boolean);

    const resWordsWithoutDuplicates = [
      ...new Map(resWords?.map(w => [w.id, w])).values(),
    ];

    return resWordsWithoutDuplicates ?? [];
  };

  const [searchResult, setSearchResult] = React.useState<SearchResult[]>(
    currSearch ? searchForWord(currSearch) : [],
  );

  const debouncedSearch = useRef(
    debounce((value: string) => {
      if (value === "") {
        setSearchResult([]);
        return;
      }
      const res = searchForWord(value);
      setSearchResult(res);
    }, 400),
  ).current;

  const handleSearch = (value: string): void => {
    if (value === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
      setSearchResult([]);
      debouncedSearch.clear();
      return;
    }
    searchParams.set("search", value);
    setSearchParams(searchParams);
    debouncedSearch(value);
  };

  return (
    <div className={styles.searchView}>
      <div className={styles.searchFieldBackground}>
        <div className={`${styles.searchFieldWrapper} ${styles.grid}`}>
          <div className={styles.searchField}>
            <SearchField handleSearch={handleSearch} search={currSearch} />
          </div>
        </div>
      </div>

      <div className={`${styles.searchResultWrapper} ${styles.grid}`}>
        <div>left menu</div>
        <SearchResultView searchResults={searchResult} />
      </div>
    </div>
  );
};

export default SearchView;
