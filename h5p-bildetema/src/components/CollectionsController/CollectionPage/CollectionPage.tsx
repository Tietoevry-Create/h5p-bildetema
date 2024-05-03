import { useEffect } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Link } from "react-router-dom";
import { STATIC_PATH } from "common/constants/paths";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";

type MyCollection = {
  collectionTitle: string;
  showArticles: boolean;
  showWrittenWords: boolean;
};

const CollectionPage = ({
  collectionTitle,
  showWrittenWords,
  showArticles,
}: MyCollection): JSX.Element => {
  const { addCollection } = useMyCollections();
  const words = useSelectedWords();

  useEffect(() => {
    if (collectionTitle === undefined) return;
    addCollection({ title: collectionTitle, wordIds: words.map(v => v.id) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (words.length === 0) {
    // TODO: What to show when there are no words?
    return (
      <div>
        Denne samlingen er tom. Du kan legge til ord via{" "}
        <Link to={STATIC_PATH.SEARCH}>søk</Link>
      </div>
    );
  }

  return (
    <div className={styles.words}>
      {words.map(word => (
        <MultiLanguageWord
          key={word.id}
          searchResult={word}
          showWrittenWords={showWrittenWords}
          showArticles={showArticles}
        />
      ))}
    </div>
  );
};

export default CollectionPage;
