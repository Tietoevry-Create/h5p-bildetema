import { useMyCollections } from "common/hooks/useMyCollections";
import { useSearchParams } from "react-router-dom";

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
  };
};

export default useCurrentCollection;
