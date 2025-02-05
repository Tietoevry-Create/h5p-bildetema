import { FC } from "react";
import { Button } from "common/components/Button";
import { EditIcon } from "common/components/Icons/Icons";
import styles from "./EditCollectionButton.module.scss";

type EditCollectionButtonProps = {
  editMode: boolean;
  handleEditModeChange: (editMode: boolean) => void;
};

export const EditCollectionButton: FC<EditCollectionButtonProps> = ({
  editMode,
  handleEditModeChange,
}) => {
  return (
    <Button
      variant="capsule"
      onClick={() => handleEditModeChange(!editMode)}
      className={editMode ? styles.active : ""}
    >
      <EditIcon />
      <span>{editMode ? "Lagre" : "Rediger"}</span>
    </Button>
  );
};
