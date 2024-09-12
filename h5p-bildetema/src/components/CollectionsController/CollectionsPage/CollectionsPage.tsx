import { Button } from "common/components/Button";
import Dialog from "common/components/Dialog/Dialog";
import { AddIcon } from "common/components/Icons/Icons";
import TextInput from "common/components/TextInput/TextInput";
import { STATIC_PATH } from "common/constants/paths";
import { useMyCollections } from "common/hooks/useMyCollections";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentLanguageCode } from "../../../hooks/useCurrentLanguage";
import { useL10ns } from "../../../hooks/useL10n";
import CollectionElement from "../CollectionElement/CollectionElement";
import styles from "./CollectionsPage.module.scss";

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
  const navigate = useNavigate();

  const { myCollections, addCollection } = useMyCollections();
  const reversedCollections = useMemo(
    () => myCollections.slice().reverse(),
    [myCollections],
  );

  const [createCollectionDialogOpen, setCreateCollectionDialogOpen] =
    useState(false);

  const [textInput, setTextInput] = useState("");

  const handleCreateNewCollection = (): void => {
    if (!textInput) return;

    const id = addCollection({ title: textInput });
    setTextInput("");
    setCreateCollectionDialogOpen(false);
    navigate(
      `${STATIC_PATH.COLLECTIONS}/${textInput}?lang=${langCode}&id=${id}`,
    );
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
      <p className={styles.description}>{collectionsPageDescription}</p>
      <Button
        className={styles.addButton}
        variant="default"
        onClick={() => setCreateCollectionDialogOpen(true)}
      >
        <AddIcon />
        <span>{createACollection}</span>
      </Button>
      <div className={styles.collectionWrapper}>
        {reversedCollections.map(v => (
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
