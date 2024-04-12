import React, { useEffect } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./MyCustomView.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";

type MyCustomViewProps = {
  collectionTitle: string
}

const MyCustomView = ({collectionTitle}: MyCustomViewProps): JSX.Element => {
  const words = useSelectedWords();
  const {myCollections, setMyCollections} = useMyCollections()

  useEffect(() => {
    if(collectionTitle === undefined) return
    const isMyCollection = myCollections.some(v => v.title === collectionTitle)
    if(isMyCollection) return
    setMyCollections([...myCollections, {title: collectionTitle, wordsIds: words.map(v => v.id)}])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
