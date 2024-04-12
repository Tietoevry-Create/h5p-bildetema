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

  return {
    myCollections,
    setMyCollections,
    deleteCollection
  }
};
