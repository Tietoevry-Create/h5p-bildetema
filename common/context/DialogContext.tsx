import React, { createContext, useMemo, useState } from "react";

export type DialogContextType = {
  isOpen: boolean;
  selectedId: string | null;
  handleOpenDialog: (id: string) => void;
  handleCloseDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined,
);

export type ChooseCollectionDialogProviderType = {
  children: React.ReactNode;
};

export const DialogProvider = ({
  children,
}: ChooseCollectionDialogProviderType): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpenDialog = (id: string): void => {
    setIsOpen(true);
    setSelectedId(id);
  };

  const handleCloseDialog = (): void => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const values: DialogContextType = useMemo(
    () => ({
      isOpen,
      selectedId,
      handleOpenDialog,
      handleCloseDialog,
    }),
    [isOpen, selectedId],
  );

  return (
    <DialogContext.Provider value={values}>{children}</DialogContext.Provider>
  );
};
