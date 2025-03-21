import { Button } from "common/components/Button";
import { DownloadIcon } from "common/components/Icons/Icons";
import { useMyCollections } from "common/hooks/useMyCollections";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { enqueueSnackbar } from "notistack";
import { useL10ns } from "../../hooks/useL10n";

const SaveSharedCollectionButton = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { collection } = useParams();
  const { saveCollection, collectionSaved } = useL10ns(
    "saveCollection",
    "collectionSaved",
  );

  const { addCollection } = useMyCollections();

  const handleSaveCollection = (): void => {
    const wordIds = searchParams.get("words")?.split(",") ?? [];
    const newId = uuid();

    addCollection({
      title: collection ?? "New Collection",
      wordIds,
      id: newId,
    });

    searchParams.set("id", newId);
    setSearchParams(searchParams);

    enqueueSnackbar({
      message: collectionSaved,
      variant: "success",
    });
  };

  return (
    <Button variant="capsule" onClick={() => handleSaveCollection()}>
      <DownloadIcon />
      <span>{saveCollection}</span>
    </Button>
  );
};

export default SaveSharedCollectionButton;
