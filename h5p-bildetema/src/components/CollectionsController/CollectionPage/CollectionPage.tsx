import { useNavigate } from "react-router-dom";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { BookmarkIcon } from "../../Icons/Icons";
import Button from "../../Button/Button";

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

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.bookmarkIcon}>
          <BookmarkIcon />
        </div>
        {/* TODO: add translation */}
        <p>Klikk på bokmerket for ord du vil legge til i denne samlingen.</p>
        <Button
          variant="default"
          role="link"
          aria-label="button-link to front page to add more words"
          onClick={() => navigate("/")}
        >
          {/* TODO: add translation */}
          Oppdag ord
        </Button>
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
