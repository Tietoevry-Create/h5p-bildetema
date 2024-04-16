import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { STATIC_PATH } from "common/constants/paths";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./CollectionController.module.scss";
import MyCollectionPage from "./MyCollection/MyCollectionPage";
import CollectionElement from "./CollectionLink/CollectionElement";
import Button from "../Button/Button";
import { AddIcon } from "../Icons/Icons";
import Dialog from "../Dialog/Dialog";
import TextInput from "../TextInput/TextInput";

// TODO: could be refactored to only include routing logic
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

  const { myCollections, addCollection } = useMyCollections();

  const [createCollectionDialogOpen, setCreateCollectionDialogOpen] =
    useState(false);

  const [textInput, setTextInput] = useState("");

  const handleCreateNewCollection = (): void => {
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
                handleEnter={handleCreateNewCollection}
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
                  onClick={handleCreateNewCollection}
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
                key={v.title}
                amountOfCollectionItems={v.wordsIds.length}
                label={v.title}
                href={`${STATIC_PATH.COLLECTIONS}/${v.title}?lang=${langCode}&words=${v.wordsIds}`}
              />
            ))}
          </div>
        </div>
      );
    }
    return <MyCollectionPage collectionTitle={collection} />;
  };

  return (
    <div className={`${styles.CollectionController} ${styles.mainSize}`}>
      <div className={styles.menuWrapper}>
        <Breadcrumbs
          currentLanguageCode={langCode}
          // TODO: translate search label
          breadCrumbs={breadCrumbs}
        />
        div hei
      </div>
      <div className={styles.contentWrapper}>{currentPage()}</div>
    </div>
  );
};

export default CollectionController;
