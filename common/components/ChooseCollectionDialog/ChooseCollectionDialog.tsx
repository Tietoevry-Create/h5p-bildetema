import { useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Button } from "common/components/Button";
import { CollectionOption } from "common/types/types";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";

import { v4 as uuid } from "uuid";

import Dialog from "../Dialog/Dialog";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import { AddIcon } from "../Icons/Icons";
import styles from "./ChooseCollectionDialog.module.scss";

export type ChooseCollectionDialogProps = {
  open: boolean;
  options: CollectionOption[];
  selectedCollection: CollectionOption | null;
  selectedWordId: string | null;
  onSelectCollection: (collection: CollectionOption) => void;
  onClose: () => void;
  onAddBookmark: () => void;
};

const ChooseCollectionDialog = ({
  open,
  options,
  selectedCollection,
  selectedWordId,
  onSelectCollection,
  onClose,
  onAddBookmark,
}: ChooseCollectionDialogProps): JSX.Element => {
  const { addItemToCollection, addCollection } = useMyCollections();
  const {
    createACollection,
    cancel,
    addWord,
    chooseCollection,
    chooseACollection,
    createNewCollection: l10nCreateNewCollection,
  } = useL10ns(
    "createACollection",
    "cancel",
    "addWord",
    "chooseCollection",
    "chooseACollection",
    "createNewCollection",
  );

  const [createNewCollection, setCreateNewCollection] = useState(false);
  const [textInput, setTextInput] = useState("");

  const noOptions = options.length === 0;
  const showCreateNewCollection = noOptions || createNewCollection;
  const description = showCreateNewCollection
    ? createACollection
    : chooseACollection;

  const handleClose = (): void => {
    setCreateNewCollection(false);
    setTextInput("");
    onClose();
  };

  const handleCreateNewCollection = (): void => {
    if (textInput === "") return;
    if (selectedWordId === null) return;

    const newCollection = {
      title: textInput,
      id: uuid(),
    };

    addCollection(newCollection);

    onSelectCollection({
      label: newCollection.title,
      id: newCollection.id,
    });

    addItemToCollection({
      id: newCollection.id,
      wordId: selectedWordId,
    });
    setTextInput("");
    handleClose();
  };

  return (
    <div className={styles.dialogContainer}>
      <Dialog
        open={open}
        onClose={handleClose}
        title={addWord}
        description={description}
      >
        <div className={styles.dialogContentWrapper}>
          {showCreateNewCollection ? (
            <TextInput
              handleChange={(e: string) => setTextInput(e)}
              handleEnter={handleCreateNewCollection}
              value={textInput}
            />
          ) : (
            <div className={styles.dialogSelectWrapper}>
              <Select
                fixed
                placeholder={chooseCollection}
                variant="secondary"
                options={options}
                handleChange={onSelectCollection}
                selectedOption={selectedCollection}
              />
              <Button
                variant="secondary"
                className={styles.createNewCollection}
                onClick={() => setCreateNewCollection(true)}
              >
                <AddIcon />
                {l10nCreateNewCollection}
              </Button>
            </div>
          )}
          <div className={styles.dialogButtonWrapper}>
            <Button variant="secondary" onClick={handleClose}>
              {cancel}
            </Button>
            <Button
              variant="default"
              onClick={
                showCreateNewCollection
                  ? handleCreateNewCollection
                  : onAddBookmark
              }
            >
              Ok
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ChooseCollectionDialog;
