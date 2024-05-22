import styles from "./DeleteDialog.module.scss";
import Button from "../../Button/Button";
import Dialog from "../Dialog";

type DeleteDialogProps = {
  open: boolean;
  title: string;
  description: string;
  itemToDeleteTitle: string;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteDialog = ({
  open,
  title,
  description,
  itemToDeleteTitle,
  onClose,
  onDelete,
}: DeleteDialogProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className={styles.deleteDialog}>
        <span className={styles.itemToDeleteTitle}>{itemToDeleteTitle}</span>
        <div>
          <Button
            className={styles.dialogButton}
            variant="secondary"
            onClick={onClose}
          >
            {/* TODO: TRANSLATE */}
            Nei
          </Button>
          <Button
            className={styles.dialogButton}
            variant="primary"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Ja
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;