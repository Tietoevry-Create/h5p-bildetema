/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useMemo } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";

export type CollectionOption = {
  id: string;
  label: string;
};

export const useChooseCollectionDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionOption | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const { myCollections, addItemToCollection } = useMyCollections();

  const options = useMemo(() => {
    return myCollections.map(collection => ({
      label: collection.title,
      id: collection.id,
    }));
  }, [myCollections]);

  const handleOpenDialog = (id: string): void => {
    setIsOpen(true);
    setSelectedWordId(id);
  };

  const handleCloseDialog = (): void => {
    setIsOpen(false);
    setSelectedWordId(null);
  };

  const handleAddBookmark = (): void => {
    if (!selectedWordId || !selectedCollection) return;
    addItemToCollection({
      id: selectedCollection.id,
      wordId: selectedWordId,
    });
    handleCloseDialog();
  };

  const handleSelectCollection = (collection: CollectionOption): void => {
    setSelectedCollection(collection);
  };

  return {
    isOpen,
    options,
    selectedCollection,
    selectedWordId,
    handleOpenDialog,
    handleCloseDialog,
    handleAddBookmark,
    handleSelectCollection,
  };
};
