/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";

import { Button } from "common/components/Button";
import Dialog from "common/components/Dialog/Dialog";
import { useDialogContext } from "common/hooks/useDialogContext";

import styles from "./ConfirmationDialog.module.scss";

type ConfirmationDialogProps = {
  children: React.ReactNode;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  disableConfirm?: boolean;
  disabledTooltip?: string;
};

const ConfirmationDialog = ({
  children,
  title,
  onConfirm,
  onCancel,
  disableConfirm = false,
  disabledTooltip,
}: ConfirmationDialogProps) => {
  const { isOpen, handleCloseDialog } = useDialogContext();
  const { cancel } = useL10ns("cancel");

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} title={title}>
      {children}
      <div className={styles.dialogButtonWrapper}>
        <Button variant="secondary" onClick={onCancel}>
          {cancel}
        </Button>
        <Button
          variant="default"
          onClick={onConfirm}
          aria-disabled={disableConfirm}
          disabledTooltip={disabledTooltip}
        >
          Ok
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
