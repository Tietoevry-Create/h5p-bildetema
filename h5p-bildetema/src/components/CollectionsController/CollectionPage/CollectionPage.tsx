import { Link, useNavigate } from "react-router-dom";
import { STATIC_PATH } from "common/constants/paths";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import Button from "../../Button/Button";
import { AddIcon, ArrowRight } from "../../Icons/Icons";

type MyCollection = {
  showArticles: boolean;
  showWrittenWords: boolean;
};

const CollectionPage = ({
  showWrittenWords,
  showArticles,
}: MyCollection): JSX.Element => {
  const words = useSelectedWords();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button
          variant="link"
          aria-label="Go to search to add words to collection"
          onClick={() => navigate(STATIC_PATH.SEARCH)}
          className={styles.link}
        >
          Legg til ord
          <span className={styles.icon}>
            <ArrowRight />
          </span>
        </Button>
      </div>
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
