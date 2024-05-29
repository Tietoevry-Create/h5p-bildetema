import { useNavigate } from "react-router-dom";
import { Button } from "common/components/Button";
import { STATIC_PATH } from "common/constants/paths";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { BookmarkIcon } from "../../Icons/Icons";

type MyCollection = {
  showArticles: boolean;
  showWrittenWords: boolean;
};

const description =
  "Legg til ord ved å klikke på bokmerket på bildene, enten via søk eller temavisning.";

const CollectionPage = ({
  showWrittenWords,
  showArticles,
}: MyCollection): JSX.Element => {
  const words = useSelectedWords();
  const navigate = useNavigate();

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.bookmarkIcon}>
          <BookmarkIcon />
        </div>
        {/* TODO: add translation */}
        <p>Denne samlingen er tom.</p>
        <p>{description}</p>
        <div className={styles.navButtons}>
          <Button
            variant="default"
            role="link"
            aria-label="button-link to front page to add more words"
            onClick={() => navigate(STATIC_PATH.SEARCH)}
          >
            {/* TODO: add translation */}
            Gå til søk
          </Button>
          <Button
            variant="default"
            role="link"
            aria-label="button-link to front page to add more words"
            onClick={() => navigate("/")}
          >
            {/* TODO: add translation */}
            Gå til tema
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
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
      <p>{description}</p>
    </div>
  );
};

export default CollectionPage;
