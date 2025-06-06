import { useParams } from "react-router-dom";
import { JSX, useEffect, useMemo, useState } from "react";
import { STATIC_PATH } from "common/constants/paths";
import { searchResultsIncludesArticles } from "common/utils/word.utils";
import { useH5PInstance } from "use-h5p";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import styles from "./CollectionController.module.scss";
import CollectionPage from "./CollectionPage/CollectionPage";
import CollectionsPage from "./CollectionsPage/CollectionsPage";
import { SubHeader } from "../SubHeader/SubHeader";
import { useSelectedWords } from "../../hooks/useSelectedWords";
import { useSearchParamContext } from "../../hooks/useSearchParamContext";
import useCurrentCollection from "../../hooks/useCurrentCollection";
import { useL10ns } from "../../hooks/useL10n";
import { H5PWrapper } from "../../h5p/H5PWrapper";

const CollectionController = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const h5pInstance = useH5PInstance<H5PWrapper>();
  const langCode = useCurrentLanguageCode();
  const words = useSelectedWords();
  const { collection } = useParams<{ collection: string }>();
  const { showArticles, showWrittenWords } = useSearchParamContext();
  const { isCollectionOwner } = useCurrentCollection();
  const { breadcrumbsHome, myCollections } = useL10ns(
    "breadcrumbsHome",
    "myCollections",
  );

  const handleSetEditMode = (value: boolean): void => {
    setEditMode(value);
  };

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
        editMode={editMode}
      />
    );
  };

  useEffect(() => {
    // Scroll into view on load and if collection param changes (i.e. when
    // switching between the main collection page and a collection)
    const wrapper = h5pInstance?.getWrapper();
    if (wrapper) {
      wrapper.scrollIntoView();
    }
  }, [collection, h5pInstance]);

  useEffect(() => {
    if (editMode) {
      setEditMode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, langCode]);

  return (
    <div className={`${styles.CollectionController} ${styles.mainSize}`}>
      <div className={styles.menuWrapper}>
        <SubHeader
          breadCrumbs={breadCrumbs}
          isWordView={!!collection && words.length > 0}
          rtl={false}
          showArticlesToggle={showArticlesToggle}
          includeShareButton={!editMode}
          includePrintButton={!editMode}
          includeSaveButton={!isCollectionOwner}
          includeEditButton={isCollectionOwner && words.length > 0}
          editMode={editMode}
          setEditMode={handleSetEditMode}
        />
      </div>
      {currentPage()}
    </div>
  );
};

export default CollectionController;
