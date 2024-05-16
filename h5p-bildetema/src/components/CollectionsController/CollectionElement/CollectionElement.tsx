import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useMyCollections } from "common/hooks/useMyCollections";
import styles from "./CollectionElement.module.scss";
import { DeleteIcon, EditIcon, MoreVertIcon } from "../../Icons/Icons";
import Dialog from "../../Dialog/Dialog";
import Button from "../../Button/Button";
import TextInput from "../../TextInput/TextInput";
import DeleteDialog from "../../Dialog/DeleteDialog/DeleteDialog";

const OpenDialog = {
  DELETE_DIALOG: "DELETE_DIALOG",
  EDIT_DIALOG: "EDIT_DIALOG",
  NONE: "NONE",
} as const;

type OpenDialog = (typeof OpenDialog)[keyof typeof OpenDialog];

type CollectionElementProps = {
  href: string;
  label: string;
  amountOfCollectionItems: number;
  id: string;
};
const CollectionElement = ({
  href,
  label,
  amountOfCollectionItems,
  id,
}: CollectionElementProps): React.JSX.Element => {
  const [openDialog, setOpenDialog] = React.useState<OpenDialog>(
    OpenDialog.NONE,
  );
  const { deleteCollection, changeCollectionTitle } = useMyCollections();

  const [title, setTitle] = useState(label);

  const handleEditCollectionTitle = (value: string): void => {
    setTitle(value);
  };

  const handleNewTitle = (): void => {
    if (title) {
      changeCollectionTitle({ newTitle: title, id });
      setOpenDialog(OpenDialog.NONE);
    }
  };

  const handleDeleteCollection = (): void => {
    deleteCollection(id);
    setOpenDialog(OpenDialog.NONE);
  };

  return (
    <div className={styles.collectionElementWrapper}>
      <span className={styles.label}>
        <b>{label}</b>({amountOfCollectionItems})
      </span>
      <Link to={href} className={styles.link}>
        <span className={styles.linkLabel}>{label}</span>
      </Link>
      <DeleteDialog
        open={openDialog === OpenDialog.DELETE_DIALOG}
        title="Slett samling"
        description="Er du sikker på at du vil slette samlingen:"
        itemToDeleteTitle={label}
        onClose={() => setOpenDialog(OpenDialog.NONE)}
        onDelete={handleDeleteCollection}
      />
      <Dialog
        open={openDialog === OpenDialog.EDIT_DIALOG}
        onClose={() => setOpenDialog(OpenDialog.NONE)}
        // TODO: TRANSLATE
        title="Endre navn"
        // TODO: TRANSLATE
        description="Navn på samlingen"
      >
        <div className={styles.deleteDialog}>
          <TextInput
            handleChange={handleEditCollectionTitle}
            value={title}
            handleEnter={handleNewTitle}
          />
          <div>
            <Button
              className={styles.dialogButton}
              variant="secondary"
              onClick={() => setOpenDialog(OpenDialog.NONE)}
            >
              {/* TODO: TRANSLATE */}
              Avbryt
            </Button>
            <Button
              className={styles.dialogButton}
              variant="primary"
              onClick={handleNewTitle}
            >
              {/* TODO: TRANSLATE */}
              Lagre Endring
            </Button>
          </div>
        </div>
      </Dialog>
      <Menu>
        <Menu.Button className={styles.button}>
          <MoreVertIcon />
        </Menu.Button>
        <Menu.Items className={styles.menu}>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${styles.menuItemButton} ${
                  active && styles.active
                }`}
                onClick={() => setOpenDialog(OpenDialog.EDIT_DIALOG)}
              >
                <EditIcon />
                <span>
                  {/* TODO: Translate */}
                  Endre navn
                </span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${styles.menuItemButton} ${
                  active && styles.active
                }`}
                onClick={() => setOpenDialog(OpenDialog.DELETE_DIALOG)}
              >
                <DeleteIcon />
                <span>
                  {/* TODO: Translate */}
                  Slett
                </span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CollectionElement;
