import { FC } from "react";
import { Button } from "common/components/Button";
import { EditIcon } from "common/components/Icons/Icons";

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
      style={
        editMode
          ? {
              backgroundColor: "#007271",
              borderColor: "#007271",
              color: "#fff",
            }
          : {}
      }
    >
      <EditIcon />
      <span>{editMode ? "Lagre" : "Rediger"}</span>
    </Button>
  );
};
