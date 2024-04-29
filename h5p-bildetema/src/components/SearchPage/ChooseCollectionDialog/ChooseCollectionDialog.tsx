import { useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import Dialog from "../../Dialog/Dialog";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
import TextInput from "../../TextInput/TextInput";
import { AddIcon } from "../../Icons/Icons";
import styles from "./ChooseCollectionDialog.module.scss";

type CollectionOption = {
  label: string;
};

export type ChooseCollectionDialogProps = {
  open: boolean;
  options: CollectionOption[];
  selected: CollectionOption | null;
  selectedWordId: string | null;
  setSelected: (option: CollectionOption) => void;
  onClose: () => void;
  onChange: (option: CollectionOption) => void;
  onAddBookmark: () => void;
};

const ChooseCollectionDialog = ({
  open,
  options,
  selected,
  selectedWordId,
  setSelected,
  onClose,
  onChange,
  onAddBookmark,
}: ChooseCollectionDialogProps): JSX.Element => {
  const { addItemToCollection, addCollection } = useMyCollections();

  const [createNewCollection, setCreateNewCollection] = useState(false);
  const [textInput, setTextInput] = useState("");

  const noOptions = options.length === 0;
  const showCreateNewCollection = noOptions || createNewCollection;
  const description = showCreateNewCollection
    ? "Lag en samling"
    : "Velg en samling";

  const handleClose = (): void => {
    setCreateNewCollection(false);
    setTextInput("");
    onClose();
  };

  const handleCreateNewCollection = (): void => {
    if (textInput === "") return;
    if (selectedWordId === null) return;

    addCollection({ title: textInput });
    setSelected({ label: textInput });
    addItemToCollection({
      title: textInput,
      wordId: selectedWordId,
    });
    setTextInput("");
    handleClose();
  };

  // TODO: translate all text

  return (
    <div className={styles.dialogContainer}>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Legg til ord"
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
                placeholder="Velg samling"
                variant="secondary"
                options={options}
                handleChange={onChange}
                selectedOption={selected}
              />
              <Button
                variant="secondary"
                className={styles.createNewCollection}
                onClick={() => setCreateNewCollection(true)}
              >
                <AddIcon />
                Lag ny samling
              </Button>
            </div>
          )}
          <div className={styles.dialogButtonWrapper}>
            <Button variant="secondary" onClick={handleClose}>
              Avbryt
            </Button>
            <Button
              variant="primary"
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
