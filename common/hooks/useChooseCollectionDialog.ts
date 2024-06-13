/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMemo } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { LOCAL_STORAGE_KEYS } from "common/constants/local-storage-keys";
import useLocalStorageState from "use-local-storage-state";

export type CollectionOption = {
  id: string;
  label: string;
};

export const useChooseCollectionDialog = () => {
  const [selectedCollection, setSelectedCollection] =
    useLocalStorageState<CollectionOption | null>(
      LOCAL_STORAGE_KEYS.SELECTED_COLLECTION,
    );
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
