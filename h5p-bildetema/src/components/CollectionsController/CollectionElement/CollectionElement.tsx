import { JSX, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Button } from "common/components/Button";
import {
  DeleteIcon,
  EditIcon,
  LinkIcon,
  MoreVertIcon,
} from "common/components/Icons/Icons";
import { enqueueSnackbar } from "notistack";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { Menu, MenuButton, MenuItem, MenuItems } from "../../Menu";
import styles from "./CollectionElement.module.scss";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import EditDialog from "../../EditDialog/EditDialog";
import { useL10ns } from "../../../hooks/useL10n";
import { getSiteLanguagePath } from "../../../hooks/useSiteLanguage";

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
}: CollectionElementProps): JSX.Element => {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(OpenDialog.NONE);
  const siteLanguagePath = getSiteLanguagePath();
  const { deleteCollection, changeCollectionTitle } = useMyCollections();
  const {
    changeName,
    delete: l10nDelete,
    nameOfTheCollection,
    deleteCollection: l10nDeleteCollection,
    deleteCollectionConfirmation,
    deleteCollectionStatusMessage,
    moreOptionsAriaLabel,
    copyLink,
    linkCopied,
    changesSaved,
  } = useL10ns(
    "changeName",
    "delete",
    "nameOfTheCollection",
    "deleteCollection",
    "deleteCollectionConfirmation",
    "deleteCollectionStatusMessage",
    "moreOptionsAriaLabel",
    "copyLink",
    "linkCopied",
    "changesSaved",
  );

  const [title, setTitle] = useState(label);

  const handleEditCollectionTitle = (value: string): void => {
    setTitle(value);
  };

  const handleNewTitle = (): void => {
    if (title) {
      changeCollectionTitle({ newTitle: title, id });
      setOpenDialog(OpenDialog.NONE);
      enqueueSnackbar(changesSaved, {
        variant: "success",
      });
    }
  };

  const getDeleteCollectionStatusMessage = (): ReactNode => {
    const replacements = {
      collection: <b key={1}>{label}</b>,
    };
    const message = replacePlaceholders(
      deleteCollectionStatusMessage,
      replacements,
    );
    return <span>{message}</span>;
  };

  const handleDeleteCollection = (): void => {
    deleteCollection(id);
    setOpenDialog(OpenDialog.NONE);
    enqueueSnackbar(getDeleteCollectionStatusMessage(), {
      variant: "success",
    });
  };

  const handleCancelEditDialog = (): void => {
    setOpenDialog(OpenDialog.NONE);
    setTitle(label);
  };

  const handleCopyLink = async (): Promise<void> => {
    if (typeof window === "undefined") {
      return;
    }
    const { origin } = window.location;
    const language = siteLanguagePath ? `/${siteLanguagePath}` : "";
    const url = `${origin}${language}/#${href}`;

    try {
      await navigator.clipboard.writeText(url);
      enqueueSnackbar(linkCopied, {
        variant: "success",
      });
    } catch (error) {
      /* TODO: Show error message to user in for example a toast */
      console.error(error);
    }
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
            label={copyLink}
            icon={<LinkIcon />}
            onClick={handleCopyLink}
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
