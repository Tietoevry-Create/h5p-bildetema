import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useMyCollections } from "common/hooks/useMyCollections";
import styles from "./CollectionElement.module.scss";
import { DeleteIcon, EditIcon, MoreVertIcon } from "../../Icons/Icons";
import Dialog from "../../Dialog/Dialog";
import Button from "../../Button/Button";

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
};
const CollectionElement = ({
  href,
  label,
  amountOfCollectionItems,
}: CollectionElementProps): React.JSX.Element => {
  const [openDialog, setOpenDialog] = React.useState<OpenDialog>(
    OpenDialog.NONE,
  );
  const { deleteCollection } = useMyCollections();

  return (
    <div className={styles.collectionElementWrapper}>
      <span className={styles.label}>
        <b>{label}</b>({amountOfCollectionItems})
      </span>
      <Link to={href} className={styles.link}>
        <span className={styles.linkLabel}>{label}</span>
      </Link>
      <Dialog
        open={openDialog === OpenDialog.DELETE_DIALOG}
        onClose={() => setOpenDialog(OpenDialog.NONE)}
        // TODO: TRANSLATE
        title="Slett samling"
        description="Er du sikker på at du vil slette samlingen:"
      >
        <div className={styles.deleteDialog}>
          <span>{label}</span>
          <div>
            <Button
              className={styles.dialogButton}
              variant="secondary"
              onClick={() => setOpenDialog(OpenDialog.NONE)}
            >
              Nei
            </Button>
            <Button
              className={styles.dialogButton}
              variant="primary"
              onClick={() => {
                deleteCollection(label);
                setOpenDialog(OpenDialog.NONE);
              }}
            >
              Ja
            </Button>
          </div>
        </div>
      </Dialog>
      <Menu>
        <Menu.Button className={styles.button}>
          {" "}
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
                // onClick={() => deleteCollection(label)}
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
