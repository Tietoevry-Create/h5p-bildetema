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
import { useL10ns } from "../../../hooks/useL10n";

const CollectionsPage = (): React.JSX.Element => {
  const {
    nameOfTheCollection,
    createACollection,
    collectionsPageDescription,
    cancel,
  } = useL10ns(
    "nameOfTheCollection",
    "createACollection",
    "collectionsPageDescription",
    "cancel",
  );

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
        title={createACollection}
        description={nameOfTheCollection}
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
              {cancel}
            </Button>
            <Button variant="default" onClick={handleCreateNewCollection}>
              Ok
            </Button>
          </div>
        </div>
      </Dialog>
      <div>{collectionsPageDescription}</div>
      <Button
        className={styles.addButton}
        variant="default"
        onClick={() => setCreateCollectionDialogOpen(true)}
      >
        <AddIcon />
        <span>{createACollection}</span>
      </Button>
      <div className={styles.collectionWrapper}>
        {myCollections.map(v => (
          <CollectionElement
            key={v?.id}
            id={v.id}
            amountOfCollectionItems={v.wordsIds.length}
            label={v.title}
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
