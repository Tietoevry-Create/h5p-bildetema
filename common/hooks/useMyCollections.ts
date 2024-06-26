/* eslint-disable no-restricted-syntax */
import { Collection } from "common/types/types";
import { LOCAL_STORAGE_KEYS } from "common/constants/local-storage-keys";
import useLocalStorageState from "use-local-storage-state";
import { useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { CollectionOption } from "./useChooseCollectionDialog";

type ModifyCollection = {
  id: string;
  wordId: string;
};
type ChangeCollectionTitle = {
  newTitle: string;
  id: string;
};

type AddCollection = {
  title: string;
  id?: string;
  wordIds?: string[];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMyCollections = () => {
  const [myCollections, setMyCollections] = useLocalStorageState<Collection[]>(
    LOCAL_STORAGE_KEYS.MY_COLLECTIONS,
    { defaultValue: [] },
  );

  const getUniqueIds = useCallback(() => {
    const wordIdsInCollections = new Set<string>();
    for (const collection of myCollections) {
      for (const wordId of collection.wordsIds) {
        wordIdsInCollections.add(wordId);
      }
    }

    return wordIdsInCollections;
  }, [myCollections]);

  const wordIdsInCollections = getUniqueIds();

  const [selectedCollection, setSelectedCollection] =
    useLocalStorageState<CollectionOption | null>(
      LOCAL_STORAGE_KEYS.SELECTED_COLLECTION,
    );

  useEffect(() => {
    setMyCollections(prev => {
      if (prev.length === 0) return prev;
      return prev.map(collection => {
        if (collection.id !== undefined) return collection;
        return { ...collection, id: uuid() };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCollection = (id: string): void => {
    const newCollections = myCollections.filter(
      collection => collection.id !== id,
    );
    setMyCollections(newCollections);

    if (selectedCollection?.id === id) {
      setSelectedCollection(null);
    }
  };

  const deleteWordFromCollection = (
    collectionId: string,
    wordId: string,
  ): void => {
    setMyCollections(prevCollections =>
      prevCollections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            wordsIds: collection.wordsIds.filter(id => id !== wordId),
          };
        }
        return collection;
      }),
    );
  };

  const addCollection = ({ title, wordIds, id }: AddCollection): void => {
    const newId = id || uuid();
    setMyCollections(prev => {
      const isExistingCollection = prev.some(
        collection => collection.id === id,
      );
      if (isExistingCollection) return prev;
      return [...prev, { id: newId, title, wordsIds: wordIds || [] }];
    });

    setSelectedCollection({
      id: newId,
      label: title,
    });
  };

  const addItemToCollection = ({ id, wordId }: ModifyCollection): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map(collection => {
        if (collection.id === id) {
          if (collection.wordsIds.includes(wordId)) return collection;
          return { ...collection, wordsIds: [...collection.wordsIds, wordId] };
        }
        return collection;
      });
      return updatedCollection;
    });
  };

  const removeItemFromCollection = ({
    id: collectionId,
    wordId,
  }: ModifyCollection): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            wordsIds: collection.wordsIds.filter(id => id !== wordId),
          };
        }
        return collection;
      });
      return updatedCollection;
    });
  };

  const changeCollectionTitle = ({
    newTitle,
    id,
  }: ChangeCollectionTitle): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map(collection => {
        if (collection.id === id) {
          return { ...collection, title: newTitle };
        }
        return collection;
      });
      return updatedCollection;
    });
  };

  return {
    myCollections,
    wordIdsInCollections,
    deleteCollection,
    deleteWordFromCollection,
    addCollection,
    addItemToCollection,
    removeItemFromCollection,
    changeCollectionTitle,
  };
};
