/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useMemo, useState } from "react";
import { useMyCollections } from "common/hooks/useMyCollections";
import { STATIC_PATH } from "common/constants/paths";
import { Button } from "common/components/Button";
import { AddIcon } from "common/components/Icons/Icons";
import { useNavigate } from "react-router-dom";
import { Collection } from "common/types/types";
import styles from "./CollectionsPage.module.scss";
import CollectionElement from "../CollectionElement/CollectionElement";
import { useCurrentLanguageCode } from "../../../hooks/useCurrentLanguage";
import { useL10ns } from "../../../hooks/useL10n";
import EditDialog from "../../EditDialog/EditDialog";

const CollectionsPage = (): React.JSX.Element => {
  const { nameOfTheCollection, createACollection, collectionsPageDescription } =
    useL10ns(
      "nameOfTheCollection",
      "createACollection",
      "collectionsPageDescription",
    );

  const langCode = useCurrentLanguageCode();
  const navigate = useNavigate();

  const { myCollections, addCollection } = useMyCollections();
  const reversedCollections = useMemo(
    () => myCollections.slice().reverse(),
    [myCollections],
  );

  const [createCollectionDialogOpen, setCreateCollectionDialogOpen] =
    useState(false);

  const [textInput, setTextInput] = useState("");

  const handleCreateNewCollection = (): void => {
    if (!textInput) return;

    const id = addCollection({ title: textInput });
    setTextInput("");
    setCreateCollectionDialogOpen(false);
    navigate(
      `${STATIC_PATH.COLLECTIONS}/${textInput}?lang=${langCode}&id=${id}`,
    );
  };

  const getCollectionElementHref = (collection: Collection): string => {
    const collectionTitle = encodeURIComponent(collection.title);
    const collectionWordIds =
      collection.wordsIds.length > 0 ? `&words=${collection.wordsIds}` : "";
    return `${STATIC_PATH.COLLECTIONS}/${collectionTitle}?lang=${langCode}&id=${collection.id}${collectionWordIds}`;
  };

  return (
    <div className={styles.container}>
      <EditDialog
        open={createCollectionDialogOpen}
        title={createACollection}
        textInputValue={textInput}
        textInputLabel={nameOfTheCollection}
        createNewCollection
        onTextInputChange={(e: string) => setTextInput(e)}
        onClose={() => setCreateCollectionDialogOpen(false)}
        onSave={handleCreateNewCollection}
      />
      <p className={styles.description}>{collectionsPageDescription}</p>
      <Button
        className={styles.addButton}
        variant="default"
        onClick={() => setCreateCollectionDialogOpen(true)}
      >
        <AddIcon />
        <span>{createACollection}</span>
      </Button>
      <ul role="list" className={styles.collectionWrapper}>
        {reversedCollections.map(v => (
          <li role="listitem">
            <CollectionElement
              key={v?.id}
              id={v.id}
              amountOfCollectionItems={v.wordsIds.length}
              label={v.title}
              href={getCollectionElementHref(v)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsPage;
