import Dialog from "common/components/Dialog/Dialog";
import TextInput from "common/components/TextInput/TextInput";
import { Button } from "common/components/Button/Button";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./EditDialog.module.scss";

type EditDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  textInputLabel: string;
  textInputValue: string;
  createNewCollection?: boolean;
  onTextInputChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

const EditDialog = ({
  open,
  title,
  description,
  textInputValue,
  textInputLabel,
  createNewCollection = false,
  onTextInputChange,
  onClose,
  onSave,
}: EditDialogProps): JSX.Element => {
  const { cancel, confirm, saveChanges, ariaDisabledCreateACollection } =
    useL10ns(
      "cancel",
      "confirm",
      "saveChanges",
      "ariaDisabledCreateACollection",
    );

  const saveButtonText = createNewCollection ? confirm : saveChanges;
  const noValidInput = !textInputValue.trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
    >
      <TextInput
        handleChange={onTextInputChange}
        handleEnter={onSave}
        label={textInputLabel}
        value={textInputValue}
      />
      <div className={styles.dialogButtonWrapper}>
        <Button
          className={styles.dialogButton}
          variant="secondary"
          onClick={onClose}
        >
          {cancel}
        </Button>
        <Button
          className={styles.dialogButton}
          variant="default"
          onClick={onSave}
          aria-disabled={noValidInput}
          disabledTooltip={ariaDisabledCreateACollection}
        >
          {saveButtonText}
        </Button>
      </div>
    </Dialog>
  );
};

export default EditDialog;
