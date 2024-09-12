import { Button } from "common/components/Button";
import { BookmarkIcon } from "common/components/Icons/Icons";
import { STATIC_PATH } from "common/constants/paths";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { Link, useNavigate } from "react-router-dom";
import useCurrentCollection from "../../../hooks/useCurrentCollection";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import { environment, useEnvironment } from "../../../hooks/useEnvironment";
import { useL10ns } from "../../../hooks/useL10n";
import { useSelectedWords } from "../../../hooks/useSelectedWords";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import styles from "./CollectionPage.module.scss";

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
  const { isCollectionOwner } = useCurrentCollection();
  const env = useEnvironment();

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

  const shouldIncludeSearch = env !== environment.prod;

  const replacements = {
    search: (
      <Link key={1} to={`${STATIC_PATH.SEARCH}?lang=${lang.code}`}>
        {search.toLowerCase()}
      </Link>
    ),
    topicView: (
      <Link key={2} to={`/${lang.code}`}>
        {topicView.toLowerCase()}
      </Link>
    ),
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
          {shouldIncludeSearch && (
            <Button
              variant="default"
              role="link"
              onClick={() =>
                navigate(`${STATIC_PATH.SEARCH}?lang=${lang.code}`)
              }
            >
              {goToSearch}
            </Button>
          )}
          <Button
            variant="default"
            role="link"
            onClick={() => navigate(`/${lang.code}`)}
          >
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
