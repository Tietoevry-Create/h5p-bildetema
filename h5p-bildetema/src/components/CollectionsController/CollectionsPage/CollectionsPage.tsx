import React, { useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { STATIC_PATH } from "common/constants/paths";
import Dialog from "../../Dialog/Dialog";
import styles from "./CollectionsPage.module.scss";
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import { AddIcon } from "../../Icons/Icons";
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
            <Button
              variant="primary"
              onClick={handleCreateNewCollection}
            >
              Ok
            </Button>
          </div>
        </div>
      </Dialog>
      <div>
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
};

export default CollectionsPage;
