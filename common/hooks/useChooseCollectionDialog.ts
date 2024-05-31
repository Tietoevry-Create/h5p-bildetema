/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useMemo } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";

export type CollectionOption = {
  id: string;
  label: string;
};

export const useChooseCollectionDialog = () => {
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionOption | null>(null);
  const { myCollections, addItemToCollection } = useMyCollections();

  const options = useMemo(() => {
    return myCollections.map(collection => ({
      label: collection.title,
      id: collection.id,
    }));
  }, [myCollections]);

  const handleAddToCollection = (
    wordId: string | null,
    onCloseDialog: () => void,
  ): void => {
    if (!wordId || !selectedCollection) return;
    addItemToCollection({
      id: selectedCollection.id,
      wordId,
    });
    onCloseDialog();
  };

  const handleSelectCollection = (collection: CollectionOption): void => {
    setSelectedCollection(collection);
  };

  return {
    options,
    selectedCollection,
    handleAddToCollection,
    handleSelectCollection,
  };
};
