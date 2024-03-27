import React from "react";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./MyCustomView.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { SearchResultCard } from "../../SearchPage/SearchResultCard/SearchResultCard";

const MyCustomView = (): JSX.Element => {
  const words = useSelectedWords();
  return (
    <div className={styles.words}>
      {words.map(word => (
        // <SearchResultCard searchResult={word}/>
        <MultiLanguageWord searchResult={word} />
      ))}
    </div>
  );
};

export default MyCustomView;
