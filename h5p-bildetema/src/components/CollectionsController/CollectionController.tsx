import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { STATIC_PATH } from "common/constants/paths";
import { searchResultsIncludesArticles } from "common/utils/word.utils";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import styles from "./CollectionController.module.scss";
import CollectionPage from "./CollectionPage/CollectionPage";
import CollectionsPage from "./CollectionsPage/CollectionsPage";
import { SubHeader } from "../SubHeader/SubHeader";
import { useSelectedWords } from "../../hooks/useSelectedWords";
import { useSearchParamContext } from "../../hooks/useSearchParamContext";

type CollectionControllerProps = {
  rtl: boolean;
};

const CollectionController = ({
  rtl,
}: CollectionControllerProps): JSX.Element => {
  const { collection } = useParams();
  const langCode = useCurrentLanguageCode();
  const words = useSelectedWords();
  const { showArticles, showWrittenWords } = useSearchParamContext();

  const showArticlesToggle = useMemo(() => {
    return searchResultsIncludesArticles(words, langCode);
  }, [langCode, words]);

  const breadCrumbs = useMemo(() => {
    const crumbs = [
      // TODO: translate
      {
        label: "Home",
        path: `/${langCode}`,
      },
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
          rtl={rtl}
          showArticlesToggle={showArticlesToggle}
        />
      </div>
      <div className={styles.contentWrapper}>{currentPage()}</div>
    </div>
  );
};

export default CollectionController;
