// import { useSelectedWords } from "../../hooks/useSelectedWords";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./CustomViewPage.module.scss";
import MyCustomView from "./MyCustomView/MyCustomView";
import CollectionElement from "./CollectionLink/CollectionElement";

const CustomViewPage = (): JSX.Element => {
  // const newWords = useSelectedWords();
  // console.log(newWords)
  const { collection } = useParams();
  const langCode = useCurrentLanguageCode();

  const breadCrumbs = useMemo(() => {
    const crumbs = [
      { label: "Home", path: `/${langCode}` },
      { label: "Egne visninger", path: `/my-collections?lang=${langCode}` },
    ];
    if (!collection) return crumbs;
    return [
      ...crumbs,
      { label: collection, path: `/my-collections/${collection}?lang=${langCode}` },
    ];
  }, [langCode, collection]);

  const {myCollections} = useMyCollections()

  const currentPage = (): JSX.Element => {
    if (!collection) {
      return (
        <div className={styles.container}>
          {myCollections.map(v => (
            <CollectionElement amountOfCollectionItems={v.wordsIds.length} label={v.title} href={`/my-collections/${v.title}?lang=${langCode}&words=${v.wordsIds}`}/>
          ))}
        </div>
      );
    }
    return <MyCustomView collectionTitle={collection}/>;
  };

  return (
    <div className={`${styles.customViewPage} ${styles.mainSize}`}>
      <div className={styles.menuWrapper}>
        <Breadcrumbs
          currentLanguageCode={langCode}
          // TODO: translate search label
          breadCrumbs={breadCrumbs}
        />
      </div>
      <div className={styles.contentWrapper}>{currentPage()}</div>
    </div>
  );
};

export default CustomViewPage;
