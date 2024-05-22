import { Link } from "react-router-dom";
import { STATIC_PATH } from "common/constants/paths";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { ArrowRight } from "../../Icons/Icons";

type MyCollection = {
  showArticles: boolean;
  showWrittenWords: boolean;
};

const CollectionPage = ({
  showWrittenWords,
  showArticles,
}: MyCollection): JSX.Element => {
  const words = useSelectedWords();

  return (
    <div>
      <Link to={STATIC_PATH.SEARCH} className={styles.iconLink}>
        Legg til ord <ArrowRight className={styles.icon} />
      </Link>
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
    </div>
  );
};

export default CollectionPage;
