/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import ConfirmationDialog from "common/components/ConfirmationDialog/ConfirmationDialog";
import CheckboxItemList from "common/components/CheckboxItemList/CheckboxItemList";
import NewOption from "common/components/NewOption/NewOption";
import { Button } from "common/components/Button";
import { AddIcon } from "common/components/Icons/Icons";
import { useCollectionDialog } from "common/hooks/useCollectionDialog";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";
import { enqueueSnackbar } from "notistack";
import { STATIC_PATH } from "common/constants/paths";
import {
  getCurrentLanguageCode,
  getSiteLanguage,
} from "h5p-bildetema/src/hooks/useCurrentLanguage";
import { useDialogContext } from "../../hooks/useDialogContext";
import { replacePlaceholders } from "../../utils/replacePlaceholders";

declare module "notistack" {
  interface VariantOverrides {
    // "extra" props it takes in options of `enqueueSnackbar`
    success: {
      href?: string;
    };
  }
}

const ChooseCollectionsDialog = () => {
  const [textInput, setTextInput] = useState("");
  const currentLanguageCode = getCurrentLanguageCode();
  const siteLanguage = getSiteLanguage();
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
    wordSavedInCollection,
    wordRemovedFromCollection,
    ariaDisabledChooseACollection,
    ariaDisabledChooseACollectionPreselected,
    ariaDisabledCreateACollection,
  } = useL10ns(
    "createACollection",
    "chooseACollection",
    "createNewCollection",
    "changesSaved",
    "wordSavedInCollection",
    "wordRemovedFromCollection",
    "ariaDisabledChooseACollection",
    "ariaDisabledChooseACollectionPreselected",
    "ariaDisabledCreateACollection",
  );

  const description = showCreate ? createACollection : chooseACollection;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getURL = (details: any = null): string => {
    const siteLanguagePath = !siteLanguage ? "" : `/${siteLanguage}`;

    if (!details) {
      return `${siteLanguagePath}/#${STATIC_PATH.COLLECTIONS}?lang=${currentLanguageCode}`;
    }

    if (!details.collection) return "";
    let words = [...details.collection.wordsIds];

    let url = `${siteLanguagePath}/#${STATIC_PATH.COLLECTIONS}/${details.collection.title}?lang=${currentLanguageCode}&id=${details.collection.id}`;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMessage = (details: any): React.ReactNode => {
    const replacements = {
      collection: <b key={1}>{details.collection?.title ?? ""}</b>,
    };

    const text = details.wasRemoved
      ? wordRemovedFromCollection
      : wordSavedInCollection;

    const message = replacePlaceholders(text, replacements);
    return <span>{message}</span>;
  };

  const getDisableConfirm = () => {
    if (showCreate) {
      return !textInput;
    }
    const details = getCollectionChangeDetails();
    return !details?.wasChanged;
  };

  const getDisabledTooltip = () => {
    if (showCreate) {
      return ariaDisabledCreateACollection;
    }
    const details = getCollectionChangeDetails();
    if (details?.alreadySelected) {
      return ariaDisabledChooseACollectionPreselected;
    }
    return ariaDisabledChooseACollection;
  };

  const confirm = () => {
    if (getDisableConfirm()) {
      return;
    }
    const details = getCollectionChangeDetails();
    if (!details?.collection || showCreate) {
      enqueueSnackbar(changesSaved, {
        variant: "success",
        href: getURL(),
      });
    } else {
      const message = getMessage(details);
      enqueueSnackbar(message, {
        variant: "success",
        href: getURL(details),
      });
    }
    handleConfirm(textInput);
    setTextInput("");
  };

  return (
    <ConfirmationDialog
      title={description}
      onCancel={handleCancel}
      onConfirm={confirm}
      disableConfirm={getDisableConfirm()}
      disabledTooltip={getDisabledTooltip()}
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
