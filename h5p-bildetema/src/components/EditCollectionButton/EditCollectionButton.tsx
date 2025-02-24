import { FC } from "react";
import { Button } from "common/components/Button";
import { EditIcon } from "common/components/Icons/Icons";
import styles from "./EditCollectionButton.module.scss";

export type EditCollectionButtonProps = {
  editMode: boolean | undefined;
  setEditMode: (editMode: boolean) => void;
};

export const EditCollectionButton: FC<EditCollectionButtonProps> = ({
  editMode,
  setEditMode,
}) => {
  // TODO: Translate
  return (
    <Button
      variant="capsule"
      onClick={() => setEditMode(!editMode)}
      className={editMode ? styles.active : ""}
    >
      <EditIcon />
      <span>{editMode ? "Lagre" : "Rediger"}</span>
    </Button>
  );
};
