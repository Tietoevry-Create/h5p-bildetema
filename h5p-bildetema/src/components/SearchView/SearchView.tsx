import { useDBContext } from "common/hooks/useDBContext";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { WordSearchResults } from "common/types/types";
import debounce from 'debounce';
// import {distance, closest} from 'fastest-levenshtein'
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import SearchResultView from "./SearchResultView";
import SearchField from "./SearchField";
import styles from "./SearchView.module.scss";

type SearchViewProps = {
  setIsTopicRouteFalse: () => void;
};

const SearchView = ({ setIsTopicRouteFalse }: SearchViewProps): JSX.Element => {
  setIsTopicRouteFalse();
  const { topics: topicsFromDB, languages: languagesFromDB } =
  useDBContext() || {};
  const langCode = useCurrentLanguageCode();
  // console.log(topicsFromDB)
  const [searchParams, setSearchParams] = useSearchParams()

  const currSearch = searchParams.get("search") ?? ""


  const searchForWord = (s: string): WordSearchResults[] => {
    const resWords = topicsFromDB?.map((topic) => {
      const topicWords =  topic.words.get(langCode)
      if (topicWords?.length) {
        const p = topicWords.filter((w) => {
          return w.labels.some(label => label.label.includes(s))
        }).map(w => {
          const word: WordSearchResults = {
            ...w,
            topicId: topic.id
          }
          return word
        })
        return p
      }
      return topic.subTopics.map((subTopic) => {
        const subTopicWords = subTopic.words.get(langCode)
        if(subTopicWords?.length){
          return subTopicWords.filter((w) => {
            return w.labels.some(label => label.label.includes(s))
          }).map(w => {
            const word: WordSearchResults = {
              ...w,
              subTopicId: subTopic.id,
              topicId: topic.id
            }
            
            return word
          })
        }
        return []
      }).flat()

    }).flat().filter(Boolean)    

    const resWordsWithoutDuplicates = [
      ...new Map(resWords?.map((w) => [w.id, w])).values(),
    ]

    return resWordsWithoutDuplicates ?? []
  }
  
  const [searchResult, setSearchResult] = React.useState<WordSearchResults[]>(
    currSearch ? searchForWord(currSearch) : []
  )

  const debouncedSearch =
    debounce((value: string) => {
      if(value === "") {
        setSearchResult([])
        return
      }
      const res = searchForWord(value)
      setSearchResult(res)
    }, 400)

  const handleSearch = (value: string): void => {
    if(value === "") {
      searchParams.delete("search")
      setSearchParams(searchParams)
      debouncedSearch(value)
      return
    }
    searchParams.set("search", value)
    setSearchParams(searchParams)
    debouncedSearch(value)
  }

  return <div className={styles.searchView}>
    <div className={styles.searchFieldBackground}>
      <div className={`${styles.searchFieldWrapper} ${styles.grid}`}>
        <div className={styles.searchField}>
          <SearchField handleSearch={handleSearch} search={currSearch}/>
        </div>
      </div>
    </div>


    <div className={`${styles.searchResultWrapper} ${styles.grid}`}>
      <div>left menu</div>
        <SearchResultView searchResults={searchResult}/>
    </div>

  </div>;
};

export default SearchView;
