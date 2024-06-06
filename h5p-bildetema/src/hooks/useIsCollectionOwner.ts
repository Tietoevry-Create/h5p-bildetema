import { useMyCollections } from "common/hooks/useMyCollections";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useIsCollectionOwner = (): boolean => {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("id") ?? "";
  const { myCollections } = useMyCollections();

  const isCollectionOwner = useMemo(
    () =>
      myCollections.findIndex(collection => collection.id === collectionId) !==
      -1,
    [collectionId, myCollections],
  );

  return isCollectionOwner;
};

export default useIsCollectionOwner;
