import { Button } from "common/components/Button";
import { DownloadIcon, SuccessIcon } from "common/components/Icons/Icons";
import { useMyCollections } from "common/hooks/useMyCollections";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

const SaveSharedCollectionButton = (): JSX.Element => {
  const [isSaved, setIsSaved] = useState(false);
  const [searchParams] = useSearchParams();
  const { collection } = useParams();

  const { addCollection } = useMyCollections();

  const handleSaveCollection = (): void => {
    if (isSaved) return;

    const wordIds = searchParams.get("words")?.split(",") ?? [];
    const newId = uuid();

    addCollection({
      title: collection ?? "New Collection",
      wordIds,
      id: newId,
    });
    setIsSaved(true);
  };

  return (
    <Button variant="capsule" onClick={() => handleSaveCollection()}>
      {isSaved ? <SuccessIcon /> : <DownloadIcon />}
      <span>{isSaved ? "Lagret" : "Lagre samling"}</span>
    </Button>
  );
};

export default SaveSharedCollectionButton;
