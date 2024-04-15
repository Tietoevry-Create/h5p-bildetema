import { Collections } from "common/types/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";


const storedCollectionsAtom = atomWithStorage<Collections[]>("myCollections", []);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMyCollections = () => {
  const [myCollections, setMyCollections] = useAtom(storedCollectionsAtom)

  const deleteCollection = (title: string): void => {
    const newCollections = myCollections.filter((collection) => collection.title !== title);
    setMyCollections(newCollections);
  }

  const addCollection = (title: string): void => {
    setMyCollections([...myCollections, {title, wordsIds: []}])
  }

  const addItemToCollection = (title: string, wordId: string): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map((collection) => {
        if (collection.title === title) {
          if (collection.wordsIds.includes(wordId)) return collection
          return {...collection, wordsIds: [...collection.wordsIds, wordId]}
        }
        return collection
      }) 
      return updatedCollection
    });
  }

  const removeItemFromCollection = (title: string, wordId: string): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map((collection) => {
        if (collection.title === title) {
          return {...collection, wordsIds: collection.wordsIds.filter(id => id !== wordId)}
        }
        return collection
      }) 
      return updatedCollection
    });
  }

  const changeCollectionTitle = (title: string, newTitle: string): void => {
    setMyCollections(prev => {
      const updatedCollection = prev.map((collection) => {
        if (collection.title === title) {
          return {...collection, title: newTitle}
        }
        return collection
      }) 
      return updatedCollection
    });
  }

  return {
    myCollections,
    setMyCollections,
    deleteCollection,
    addCollection,
    addItemToCollection,
    removeItemFromCollection,
    changeCollectionTitle
  }
};
