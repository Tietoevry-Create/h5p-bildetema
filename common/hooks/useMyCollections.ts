import { Collection } from "common/types/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";
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

const storedCollectionsAtom = atomWithStorage<Collection[]>(
  "myCollections",
  [],
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMyCollections = () => {
  const [myCollections, setMyCollections] = useAtom(storedCollectionsAtom);
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
    setMyCollections(prev => {
      const isExistingCollection = prev.some(
        collection => collection.id === id,
      );
      if (isExistingCollection) return prev;
      return [...prev, { id: id || uuid(), title, wordsIds: wordIds || [] }];
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
    deleteCollection,
    deleteWordFromCollection,
    addCollection,
    addItemToCollection,
    removeItemFromCollection,
    changeCollectionTitle,
  };
};
