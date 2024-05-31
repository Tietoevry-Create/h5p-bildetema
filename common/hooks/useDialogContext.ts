import { useContext } from "react";
import { DialogContext, DialogContextType } from "../context/DialogContext";

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialogContext must be used within the DialogContext.");
  }
  return context;
};
