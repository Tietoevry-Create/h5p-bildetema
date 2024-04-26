import { useEffect } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Link, useSearchParams } from "react-router-dom";
import { STATIC_PATH } from "common/constants/paths";
import { v4 as uuid } from "uuid";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";

type MyCollection = {
  collectionTitle: string;
};

const CollectionPage = ({ collectionTitle }: MyCollection): JSX.Element => {
  const words = useSelectedWords();
  const [searchParams] = useSearchParams();

  const { addCollection } = useMyCollections();

  useEffect(() => {
    const id = searchParams.get("id") || uuid();
    if (collectionTitle === undefined) return;
    addCollection({
      id,
      title: collectionTitle,
      wordIds: words.map(v => v.id),
    });
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
        <MultiLanguageWord searchResult={word} key={word.id} />
      ))}
    </div>
  );
};

export default CollectionPage;
