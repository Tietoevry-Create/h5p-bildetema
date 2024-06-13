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
import useIsCollectionOwner from "../../hooks/useIsCollectionOwner";
import { useL10ns } from "../../hooks/useL10n";

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
  const isCollectionOwner = useIsCollectionOwner();
  const { breadcrumbsHome, myCollections } = useL10ns(
    "breadcrumbsHome",
    "myCollections",
  );

  const showArticlesToggle = useMemo(() => {
    return searchResultsIncludesArticles(words, langCode);
  }, [langCode, words]);

  const breadCrumbs = useMemo(() => {
    const crumbs = [
      {
        label: breadcrumbsHome,
        path: `/${langCode}`,
      },
      {
        label: myCollections,
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
  }, [breadcrumbsHome, langCode, myCollections, collection]);

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
          isWordView={!!collection && words.length > 0}
          rtl={rtl}
          showArticlesToggle={showArticlesToggle}
          includeShareButton
          includeSaveButton={!isCollectionOwner}
        />
      </div>
      {currentPage()}
    </div>
  );
};

export default CollectionController;
