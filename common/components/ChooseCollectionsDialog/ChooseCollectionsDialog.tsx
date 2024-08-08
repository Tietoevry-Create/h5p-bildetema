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
import { STATIC_PATH } from "common/constants/paths";
import { getCurrentLanguageCode } from "h5p-bildetema/src/hooks/useCurrentLanguage";
import { useDialogContext } from "../../hooks/useDialogContext";

const ChooseCollectionsDialog = () => {
  const [textInput, setTextInput] = useState("");
  const currentLanguageCode = getCurrentLanguageCode();
  const { selectedId } = useDialogContext();
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
    changesSaved,
  } = useL10ns(
    "createACollection",
    "chooseACollection",
    "createNewCollection",
    "changesSaved",
  );

  const description = showCreate ? createACollection : chooseACollection;

  const getURL = (): string => {
    const details = getCollectionChangeDetails();
    if (!details) {
      return `${STATIC_PATH.COLLECTIONS}?lang=${currentLanguageCode}`;
    }

    if (!details.collection) return "";
    let words = [...details.collection.wordsIds];

    let url = `${STATIC_PATH.COLLECTIONS}/${details.collection.title}?lang=${currentLanguageCode}&id=${details.collection.id}`;
    if (!details.wasRemoved && selectedId) {
      words.push(selectedId);
    } else if (details.wasRemoved && selectedId) {
      words = words.filter(w => w !== selectedId);
    }

    if (words.length > 0) {
      url += `&words=${words}`;
    }

    return url;
  };

  const confirm = () => {
    const details = getCollectionChangeDetails();
    if (!details) {
      toast(t => (
        <CustomSuccessToastMessage t={t} href={getURL()}>
          {changesSaved}
        </CustomSuccessToastMessage>
      ));
    } else {
      toast(t => (
        <CollectionUpdatedToastMessage
          t={t}
          wasRemoved={details.wasRemoved}
          collection={details.collection?.title ?? ""}
          href={getURL()}
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
