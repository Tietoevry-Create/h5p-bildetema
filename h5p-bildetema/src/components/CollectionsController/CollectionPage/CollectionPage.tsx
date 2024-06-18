import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "common/components/Button";
import { STATIC_PATH } from "common/constants/paths";
import { BookmarkIcon } from "common/components/Icons/Icons";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { CollectionOption } from "common/hooks/useChooseCollectionDialog";
import { LOCAL_STORAGE_KEYS } from "common/constants/local-storage-keys";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import useCurrentCollection from "../../../hooks/useCurrentCollection";
import { useL10ns } from "../../../hooks/useL10n";
import { useEnvironment, environment } from "../../../hooks/useEnvironment";

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
  const lang = useCurrentLanguage();
  const { isCollectionOwner, collectionId, collectionName } =
    useCurrentCollection();
  const env = useEnvironment();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelectedCollection] =
    useLocalStorageState<CollectionOption | null>(
      LOCAL_STORAGE_KEYS.SELECTED_COLLECTION,
    );

  useEffect(() => {
    if (collectionId && collectionName) {
      setSelectedCollection({
        id: collectionId,
        label: collectionName,
      });
    }
  }, [collectionId, collectionName, setSelectedCollection]);

  const {
    addWordsDescription,
    addWordsDescriptionWithoutSearch,
    search,
    topicView,
    goToSearch,
    goToTopic,
    thisCollectionIsEmpty,
  } = useL10ns(
    "addWordsDescription",
    "addWordsDescriptionWithoutSearch",
    "search",
    "topicView",
    "goToSearch",
    "goToTopic",
    "thisCollectionIsEmpty",
  );

  const shouldIncludeSearch =
    env !== environment.prod && env !== environment.stage;

  const replacements = {
    search: <Link to={STATIC_PATH.SEARCH}>{search.toLowerCase()}</Link>,
    topicView: <Link to={`/${lang.code}`}>{topicView.toLowerCase()}</Link>,
  };

  const description = shouldIncludeSearch
    ? addWordsDescription
    : addWordsDescriptionWithoutSearch;

  const descriptionWithLinks = replacePlaceholders(description, replacements);

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.bookmarkIcon}>
          <BookmarkIcon />
        </div>
        <p className={styles.description}>{`${thisCollectionIsEmpty}.`}</p>
        <p className={styles.description}>{descriptionWithLinks}</p>
        <div className={styles.navButtons}>
          <Button
            variant="default"
            role="link"
            onClick={() => navigate(STATIC_PATH.SEARCH)}
          >
            {goToSearch}
          </Button>
          <Button variant="default" role="link" onClick={() => navigate("/")}>
            {goToTopic}
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
        <p className={styles.description}>{descriptionWithLinks}</p>
      ) : null}
    </div>
  );
};

export default CollectionPage;
