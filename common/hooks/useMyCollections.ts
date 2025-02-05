/* eslint-disable no-restricted-syntax */
import { Collection } from "common/types/types";
import { LOCAL_STORAGE_KEYS } from "common/constants/local-storage-keys";
import useLocalStorageState from "use-local-storage-state";
import { useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";

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

  /*
   * Updates the collection with the given id with the new words.
    * @param id - The id of the collection to update.
    * @param newWords - The new words to update the collection with.
  */
  const updateCollection = (id: string | undefined, newWords: string[]): void => {
    if (!id) return;

    setMyCollections(prev => {
      const updatedCollections = prev.map(collection => {
        if (collection.id === id) {
          return { ...collection, wordsIds: newWords };
        }
        return collection;
      });
      return updatedCollections;
    });
  };

  const updateSortOrder = (sortOrder: string[]): void => {
    const sortOrderMap = new Map();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sortOrder.length; i++) {
      const collectionId = sortOrder[i];
      sortOrderMap.set(collectionId, i);
    }

    setMyCollections(prev => {
      return prev.map(collection => {
        return {
          ...collection,
          sortingNumber: sortOrderMap.get(collection.id),
        };
      });
    });
  };

  const deleteCollection = (id: string): void => {
    const newCollections = myCollections.filter(
      collection => collection.id !== id,
    );
    setMyCollections(newCollections);
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

  const addCollection = ({ title, wordIds, id }: AddCollection): string => {
    const newId = id || uuid();
    setMyCollections(prev => {
      const isExistingCollection = prev.some(
        collection => collection.id === id,
      );
      if (isExistingCollection) return prev;

      const updatedCollections = prev.map(collection => ({
        ...collection,
        sortingNumber: collection.sortingNumber + 1,
      }));

      return [
        ...updatedCollections,
        { id: newId, title, wordsIds: wordIds || [], sortingNumber: 0 },
      ];
    });
    return newId;
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

  const updateCollectionsWithWord = (
    wordId: string,
    collections: string[],
  ): void => {
    setMyCollections(prevCollections => {
      const collectionsSet = new Set(collections);

      const updatedCollections = prevCollections.map(collection => {
        if (collectionsSet.has(collection.id)) {
          // Add wordId if it's not already in wordsIds
          if (!collection.wordsIds.includes(wordId)) {
            return {
              ...collection,
              wordsIds: [...collection.wordsIds, wordId],
            };
          }
        } else {
          // Remove wordId if it's in wordsIds
          return {
            ...collection,
            wordsIds: collection.wordsIds.filter(id => id !== wordId),
          };
        }
        return collection;
      });

      return updatedCollections;
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
    updateCollection,
    deleteCollection,
    deleteWordFromCollection,
    addCollection,
    updateCollectionsWithWord,
    addItemToCollection,
    removeItemFromCollection,
    changeCollectionTitle,
    updateSortOrder,
  };
};
