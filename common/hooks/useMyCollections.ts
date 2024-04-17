import { Collection } from "common/types/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type ModifyCollection = {
  title: string;
  wordId: string;
};
type ChangeCollectionTitle = {
  title: string;
  newTitle: string;
};

type AddCollection = {
  title: string;
  wordIds?: string[];
};

const storedCollectionsAtom = atomWithStorage<Collection[]>(
  "myCollections",
  [],
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMyCollections = () => {
  const [myCollections, setMyCollections] = useAtom(storedCollectionsAtom);

  const deleteCollection = (title: string): void => {
    const newCollections = myCollections.filter(
      collection => collection.title !== title,
    );
    setMyCollections(newCollections);
  };

  const addCollection = ({ title, wordIds }: AddCollection): void => {
    setMyCollections(prev => {
      const hasCollectionWithTitle = prev.some(v => v.title === title);
      if (hasCollectionWithTitle) return prev;
      return [...prev, { title, wordsIds: wordIds || [] }];
    });
  };

  const addItemToCollection = ({ title, wordId }: ModifyCollection): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map(collection => {
        if (collection.title === title) {
          if (collection.wordsIds.includes(wordId)) return collection;
          return { ...collection, wordsIds: [...collection.wordsIds, wordId] };
        }
        return collection;
      });
      return updatedCollection;
    });
  };

  const removeItemFromCollection = ({
    title,
    wordId,
  }: ModifyCollection): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map(collection => {
        if (collection.title === title) {
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
    title,
    newTitle,
  }: ChangeCollectionTitle): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map(collection => {
        if (collection.title === title) {
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
    addCollection,
    addItemToCollection,
    removeItemFromCollection,
    changeCollectionTitle,
  };
};
