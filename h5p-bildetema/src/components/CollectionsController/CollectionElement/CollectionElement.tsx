import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Button } from "common/components/Button";
import {
  DeleteIcon,
  EditIcon,
  MoreVertIcon,
} from "common/components/Icons/Icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "../../Menu";
import styles from "./CollectionElement.module.scss";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import EditDialog from "../../EditDialog/EditDialog";
import { useL10ns } from "../../../hooks/useL10n";

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
  const {
    changeName,
    delete: l10nDelete,
    nameOfTheCollection,
    deleteCollection: l10nDeleteCollection,
    deleteCollectionConfirmation,
    moreOptionsAriaLabel,
  } = useL10ns(
    "changeName",
    "delete",
    "nameOfTheCollection",
    "deleteCollection",
    "deleteCollectionConfirmation",
    "moreOptionsAriaLabel",
  );

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

  const handleCancelEditDialog = (): void => {
    setOpenDialog(OpenDialog.NONE);
    setTitle(label);
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
        title={l10nDeleteCollection}
        description={deleteCollectionConfirmation}
        itemToDeleteTitle={label}
        onClose={() => setOpenDialog(OpenDialog.NONE)}
        onDelete={handleDeleteCollection}
      />
      <EditDialog
        open={openDialog === OpenDialog.EDIT_DIALOG}
        title={changeName}
        textInputValue={title}
        textInputLabel={nameOfTheCollection}
        onTextInputChange={handleEditCollectionTitle}
        onClose={handleCancelEditDialog}
        onSave={handleNewTitle}
      />
      <Menu>
        <MenuButton className={styles.menuButton}>
          <Button variant="circle" aria-label={moreOptionsAriaLabel}>
            <MoreVertIcon />
          </Button>
        </MenuButton>
        <MenuItems anchor="bottom end">
          <MenuItem
            label={changeName}
            icon={<EditIcon />}
            onClick={() => setOpenDialog(OpenDialog.EDIT_DIALOG)}
          />
          <MenuItem
            label={l10nDelete}
            icon={<DeleteIcon />}
            onClick={() => setOpenDialog(OpenDialog.DELETE_DIALOG)}
          />
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CollectionElement;
