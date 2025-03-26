import { FC } from "react";
import { Button } from "common/components/Button";
import { EditIcon } from "common/components/Icons/Icons";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./EditCollectionButton.module.scss";

type EditCollectionButtonProps = {
  editMode: boolean | undefined;
  setEditMode: (editMode: boolean) => void;
};

export const EditCollectionButton: FC<EditCollectionButtonProps> = ({
  editMode,
  setEditMode,
}) => {
  const { edit, done } = useL10ns("edit", "done");

  return (
    <Button
      variant="capsule"
      onClick={() => setEditMode(!editMode)}
      className={editMode ? styles.active : ""}
    >
      <EditIcon />
      <span>{editMode ? done : edit}</span>
    </Button>
  );
};
