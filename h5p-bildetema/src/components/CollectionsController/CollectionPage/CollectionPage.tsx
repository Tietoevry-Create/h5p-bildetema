import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "common/components/Button";
import { STATIC_PATH } from "common/constants/paths";
import { BookmarkIcon } from "common/components/Icons/Icons";
import { useMyCollections } from "common/hooks/useMyCollections";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";

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

  const { myCollections } = useMyCollections();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("id") ?? "";

  const isCollectionOwner = useMemo(
    () =>
      myCollections.findIndex(collection => collection.id === collectionId) !==
      -1,
    [collectionId, myCollections],
  );

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.bookmarkIcon}>
          <BookmarkIcon />
        </div>
        {/* TODO: add translation */}
        <p className={styles.description}>Denne samlingen er tom.</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.navButtons}>
          <Button
            variant="default"
            role="link"
            onClick={() => navigate(STATIC_PATH.SEARCH)}
          >
            {/* TODO: add translation */}
            Gå til søk
          </Button>
          <Button variant="default" role="link" onClick={() => navigate("/")}>
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
      {isCollectionOwner ? (
        <p className={styles.description}>{description}</p>
      ) : null}
    </div>
  );
};

export default CollectionPage;
