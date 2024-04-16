import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { STATIC_PATH } from "common/constants/paths";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./CollectionController.module.scss";
import CollectionPage from "./CollectionPage/CollectionPage";
import CollectionsPage from "./CollectionsPage/CollectionsPage";

const CollectionController = (): JSX.Element => {
  const { collection } = useParams();
  const langCode = useCurrentLanguageCode();

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
    return <CollectionPage collectionTitle={collection} />;
  };

  return (
    <div className={`${styles.CollectionController} ${styles.mainSize}`}>
      <div className={styles.menuWrapper}>
        <Breadcrumbs currentLanguageCode={langCode} breadCrumbs={breadCrumbs} />
      </div>
      <div className={styles.contentWrapper}>{currentPage()}</div>
    </div>
  );
};

export default CollectionController;
