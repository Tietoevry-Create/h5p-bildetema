// import { useSelectedWords } from "../../hooks/useSelectedWords";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { STATIC_PATH } from "common/constants/paths";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./CustomViewPage.module.scss";
import MyCustomView from "./MyCustomView/MyCustomView";
import CollectionElement from "./CollectionLink/CollectionElement";
import Button from "../Button/Button";
import { AddIcon } from "../Icons/Icons";
import Dialog from "../Dialog/Dialog";
import TextInput from "../TextInput/TextInput";

const CustomViewPage = (): JSX.Element => {
  // const newWords = useSelectedWords();
  // console.log(newWords)
  const { collection } = useParams();
  const langCode = useCurrentLanguageCode();

  const breadCrumbs = useMemo(() => {
    const crumbs = [
      { label: "Home", path: `/${langCode}` },
      // TODO: translate
      {
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

  const { myCollections, addCollection } = useMyCollections();

  const [createCollectionDialogOpen, setCreateCollectionDialogOpen] =
    useState(false);

  const [textInput, setTextInput] = useState("");

  const handleSubmit = (): void => {
    addCollection({ title: textInput });
    setTextInput("");
    setCreateCollectionDialogOpen(false);
  };

  const currentPage = (): JSX.Element => {
    if (!collection) {
      // TODO: Own component?

      // TODO: translate
      const title = "Lag en samling";
      // TODO: translate
      const description = "Navn på samlingen";
      return (
        <div className={styles.container}>
          <Dialog
            title={title}
            description={description}
            open={createCollectionDialogOpen}
            onClose={() => setCreateCollectionDialogOpen(false)}
          >
            <div className={styles.dialogContentWrapper}>
              <TextInput
                handleChange={(e: string) => setTextInput(e)}
                handleEnter={handleSubmit}
                value={textInput}
              />
              <div className={styles.dialogButtonWrapper}>
                <Button
                  className={styles.dialogButton}
                  variant="secondary"
                  onClick={() => setCreateCollectionDialogOpen(false)}
                >
                  Avbryt
                </Button>
                <Button
                  className={styles.dialogButton}
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Ok
                </Button>
              </div>
            </div>
          </Dialog>
          <div className={styles.description}>
            Her kan du se alle samlingene du har laget.
          </div>
          <Button
            className={styles.addButton}
            variant="primary"
            onClick={() => setCreateCollectionDialogOpen(true)}
          >
            <AddIcon />
            <span>Lag en samling</span>
          </Button>
          <div className={styles.collectionWrapper}>
            {myCollections.map(v => (
              <CollectionElement
                amountOfCollectionItems={v.wordsIds.length}
                label={v.title}
                href={`${STATIC_PATH.COLLECTIONS}/${v.title}?lang=${langCode}&words=${v.wordsIds}`}
              />
            ))}
          </div>
        </div>
      );
    }
    return <MyCustomView collectionTitle={collection} />;
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
