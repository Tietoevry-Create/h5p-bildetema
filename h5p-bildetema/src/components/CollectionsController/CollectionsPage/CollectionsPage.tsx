import React, { useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { STATIC_PATH } from "common/constants/paths";
import { Button } from "common/components/Button";
import TextInput from "common/components/TextInput/TextInput";
import Dialog from "common/components/Dialog/Dialog";
import { AddIcon } from "common/components/Icons/Icons";
import styles from "./CollectionsPage.module.scss";
import CollectionElement from "../CollectionElement/CollectionElement";
import { useCurrentLanguageCode } from "../../../hooks/useCurrentLanguage";

const CollectionsPage = (): React.JSX.Element => {
  // TODO: translate
  const title = "Lag en samling";
  // TODO: translate
  const description = "Navn på samlingen";

  const langCode = useCurrentLanguageCode();

  const { myCollections, addCollection } = useMyCollections();

  const [createCollectionDialogOpen, setCreateCollectionDialogOpen] =
    useState(false);

  const [textInput, setTextInput] = useState("");

  const handleCreateNewCollection = (): void => {
    if (!textInput) return;

    addCollection({ title: textInput });
    setTextInput("");
    setCreateCollectionDialogOpen(false);
  };
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
              variant="secondary"
              onClick={() => setCreateCollectionDialogOpen(false)}
            >
              Avbryt
            </Button>
            <Button variant="default" onClick={handleCreateNewCollection}>
              Ok
            </Button>
          </div>
        </div>
      </Dialog>
      <div>Her kan du se alle samlingene du har laget.</div>
      <Button
        className={styles.addButton}
        variant="default"
        onClick={() => setCreateCollectionDialogOpen(true)}
      >
        <AddIcon />
        <span>Lag en samling</span>
      </Button>
      <div className={styles.collectionWrapper}>
        {myCollections.map(v => (
          <CollectionElement
            key={v?.id}
            id={v.id}
            amountOfCollectionItems={v.wordsIds.length}
            label={v.title}
            // href={`${STATIC_PATH.COLLECTIONS}/${v.title}?lang=${langCode}&id=${v.id}&words=${v.wordsIds}`}
            href={`${STATIC_PATH.COLLECTIONS}/${v.title}?lang=${langCode}&id=${
              v.id
            }${v.wordsIds.length > 0 ? `&words=${v.wordsIds}` : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
