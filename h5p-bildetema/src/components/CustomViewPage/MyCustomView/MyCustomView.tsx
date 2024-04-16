import { useEffect } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Link } from "react-router-dom";
import { STATIC_PATH } from "common/constants/paths";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./MyCustomView.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";

type MyCustomViewProps = {
  collectionTitle: string;
};

const MyCustomView = ({ collectionTitle }: MyCustomViewProps): JSX.Element => {
  const words = useSelectedWords();
  const { addCollection } = useMyCollections();

  useEffect(() => {
    if (collectionTitle === undefined) return;
    addCollection({ title: collectionTitle, wordIds: words.map(v => v.id) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (words.length === 0) {
    // TODO: What to show when there are no words?
    return (
      <div>
        Denne samlingen er tom. Du kan legge til ord fra &nbsp;
        <Link to={STATIC_PATH.SEARCH}>søke</Link>
        &nbsp;siden
      </div>
    );
  }

  return (
    <div className={styles.words}>
      {words.map(word => (
        <MultiLanguageWord searchResult={word} />
      ))}
    </div>
  );
};

export default MyCustomView;
