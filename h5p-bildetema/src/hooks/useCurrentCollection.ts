import { useMyCollections } from "common/hooks/useMyCollections";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useCurrentCollection = () => {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("id") ?? "";
  const isACollection = searchParams.has("id") && searchParams.has("words");
  const { myCollections } = useMyCollections();

  const collection = myCollections.find(c => c.id === collectionId);
  const isCollectionOwner = !!collection;

  return {
    isACollection,
    isCollectionOwner,
    collectionId: collection?.id,
    collectionName: collection?.title,
    collectionWords: collection?.wordsIds,
  };
};

export default useCurrentCollection;
