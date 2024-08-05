/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";

import ConfirmationDialog from "common/components/ConfirmationDialog/ConfirmationDialog";
import CheckboxItemList from "common/components/CheckboxItemList/CheckboxItemList";
import NewOption from "common/components/NewOption/NewOption";
import { Button } from "common/components/Button";
import CustomSuccessToastMessage from "common/components/ToastMessages/CustomSuccessToastMessage";
import CollectionUpdatedToastMessage from "common/components/ToastMessages/CollectionUpdatedToastMessage";
import { AddIcon } from "common/components/Icons/Icons";
import { useCollectionDialog } from "common/hooks/useCollectionDialog";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";
import toast from "react-hot-toast";

const ChooseCollectionsDialog = () => {
  const [textInput, setTextInput] = useState("");
  const {
    options,
    selectedOptions,
    handleNewOptionClick,
    showCreate,
    handleConfirm,
    handleCancel,
    toggleOption,
    getCollectionChangeDetails,
  } = useCollectionDialog();

  const {
    createACollection,
    chooseACollection,
    createNewCollection: l10nCreateNewCollection,
  } = useL10ns("createACollection", "chooseACollection", "createNewCollection");

  const description = showCreate ? createACollection : chooseACollection;

  const confirm = () => {
    const details = getCollectionChangeDetails();

    if (!details) {
      toast(t => (
        <CustomSuccessToastMessage t={t}>
          Endringer lagret
        </CustomSuccessToastMessage>
      ));
    } else {
      toast(t => (
        <CollectionUpdatedToastMessage
          t={t}
          wasRemoved={details.wasRemoved}
          word={details.wordName}
          collection={details.collectionName}
          href="/"
        />
      ));
    }
    handleConfirm(textInput);
  };

  return (
    <ConfirmationDialog
      title={description}
      onCancel={handleCancel}
      onConfirm={confirm}
    >
      {showCreate ? (
        <NewOption
          value={textInput}
          handleChange={value => setTextInput(value)}
          onCreateOption={handleConfirm}
        />
      ) : (
        <>
          <CheckboxItemList
            options={options}
            selectedOptions={selectedOptions}
            onToggle={toggleOption}
          />
          <Button variant="secondary" onClick={handleNewOptionClick}>
            <AddIcon />
            {l10nCreateNewCollection}
          </Button>
        </>
      )}
    </ConfirmationDialog>
  );
};

export default ChooseCollectionsDialog;
