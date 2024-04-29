import { useParams, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { STATIC_PATH } from "common/constants/paths";
import { searchResultsIncludesArticles } from "common/utils/word.utils";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import styles from "./CollectionController.module.scss";
import CollectionPage from "./CollectionPage/CollectionPage";
import CollectionsPage from "./CollectionsPage/CollectionsPage";
import { SubHeader } from "../SubHeader/SubHeader";
import { SearchParameters } from "../../enums/SearchParameters";
import { useToggleSearchParam } from "../../hooks/useToggleSearchParam";
import { useSelectedWords } from "../../hooks/useSelectedWords";

const defaultShowWrittenWords = true;
const defaultShowArticles = false;

type CollectionControllerProps = {
  rtl: boolean;
};

const CollectionController = ({
  rtl,
}: CollectionControllerProps): JSX.Element => {
  const { collection } = useParams();
  const langCode = useCurrentLanguageCode();
  const [searchParams] = useSearchParams();
  const words = useSelectedWords();

  const [showWrittenWords, setShowWrittenWords] = useState(
    searchParams.get(SearchParameters.wordsVisible) !== null
      ? searchParams.get(SearchParameters.wordsVisible) === "true"
      : defaultShowWrittenWords,
  );

  const [showArticles, setShowArticles] = useState(
    searchParams.get(SearchParameters.articlesVisible) !== null
      ? searchParams.get(SearchParameters.articlesVisible) === "true"
      : defaultShowArticles,
  );

  const handleShowArticlesChange = useToggleSearchParam(
    SearchParameters.articlesVisible,
    defaultShowArticles,
    setShowArticles,
  );

  const handleShowWrittenWordsChange = useToggleSearchParam(
    SearchParameters.wordsVisible,
    defaultShowWrittenWords,
    setShowWrittenWords,
  );

  const showArticlesToggle = useMemo(() => {
    return searchResultsIncludesArticles(words, langCode);
  }, [langCode, words]);

  const breadCrumbs = useMemo(() => {
    const crumbs = [
      // TODO: translate
      { label: "Home", path: `/${langCode}` },
      {
        // TODO: translate
        label: "Mine samlinger",
        path: `${STATIC_PATH.COLLECTIONS}?lang=${langCode}`,
      },
    ];

    if (!collection) return crumbs;
    return [
      ...crumbs,
      {
        label: collection,
        path: `${STATIC_PATH.COLLECTIONS}/${collection}?lang=${langCode}`,
      },
    ];
  }, [langCode, collection]);

  const currentPage = (): JSX.Element => {
    if (!collection) {
      return <CollectionsPage />;
    }
    return (
      <CollectionPage
        collectionTitle={collection}
        showWrittenWords={showWrittenWords}
        showArticles={showArticles}
      />
    );
  };

  return (
    <div className={`${styles.CollectionController} ${styles.mainSize}`}>
      <div className={styles.menuWrapper}>
        <SubHeader
          breadCrumbs={breadCrumbs}
          isWordView={!!collection}
          showWrittenWords={showWrittenWords}
          rtl={rtl}
          showArticlesToggle={showArticlesToggle}
          showArticles={showArticles}
          onShowWrittenWordsChange={handleShowWrittenWordsChange}
          onShowArticlesChange={handleShowArticlesChange}
        />
      </div>
      <div className={styles.contentWrapper}>{currentPage()}</div>
    </div>
  );
};

export default CollectionController;
