/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "common/components/Button";
import { STATIC_PATH } from "common/constants/paths";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { useMyCollections } from "common/hooks/useMyCollections";
import { enqueueSnackbar } from "notistack";
import {
  useCollectionWords,
} from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import useCurrentCollection from "../../../hooks/useCurrentCollection";
import { useL10ns } from "../../../hooks/useL10n";

type MyCollection = {
  showArticles: boolean;
  showWrittenWords: boolean;
  editMode: boolean;
};

const CollectionPage = ({
  showWrittenWords,
  showArticles,
  editMode,
}: MyCollection): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = useCurrentLanguage();
  const { isCollectionOwner, collectionId } = useCurrentCollection();
  const { updateCollectionWordIds } = useMyCollections();
  const words = useCollectionWords();
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [draggedOverWord, setDraggedOverWord] = useState<string | null>(null);
  const [sortedWords, setSortedWords] = useState(words);

  const {
    addWordsDescription,
    search,
    topicView,
    goToSearch,
    goToTopic,
    thisCollectionIsEmpty,
  } = useL10ns(
    "addWordsDescription",
    "search",
    "topicView",
    "goToSearch",
    "goToTopic",
    "thisCollectionIsEmpty",
  );

  const replacements = {
    search: (
      <Link key={1} to={`${STATIC_PATH.SEARCH}?lang=${lang.code}`}>
        {search.toLowerCase()}
      </Link>
    ),
    topicView: (
      <Link key={2} to={`/${lang.code}`}>
        {topicView.toLowerCase()}
      </Link>
    ),
  };

  const descriptionWithLinks = replacePlaceholders(
    addWordsDescription,
    replacements,
  );

  const handleDragStart = (event: React.DragEvent, id: string) => {
    if (!editMode) return;
    event.dataTransfer.effectAllowed = 'move';

    // Will make sure the styling is kept before the drag starts
    setTimeout(() => {
      setActiveWord(id);
    }, 0);
  };

  const handleDragEnter = (event: React.DragEvent) => {
    if (!editMode) return;
    event.preventDefault();
  };

  const handleDragOver = (event: React.DragEvent) => {
    if (!editMode) return;
    event.preventDefault();

    const draggedOverElement = event.target as HTMLElement;
    const draggedOverElementId = draggedOverElement.id;

    if (activeWord === null) return;
    if (!draggedOverElementId) return;
    if (draggedOverElementId === activeWord) return;
    // Prevent setting sortedWords to the same array reference multiple times
    if (draggedOverElementId === draggedOverWord) return;

    console.log("drag over");
    console.log("dragged over element id", draggedOverElementId);
    console.log("active word", activeWord);

    setSortedWords(prevWords => {
      const oldIndex = prevWords.findIndex(word => word.id === activeWord);
      const newIndex = prevWords.findIndex(word => word.id === draggedOverElementId);

      const newWords = [...prevWords];
      newWords.splice(oldIndex, 1);
      newWords.splice(newIndex, 0, prevWords[oldIndex]);
      setDraggedOverWord(draggedOverElementId);

      return newWords;
    });

    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnd = (event: React.DragEvent) => {
    if (!editMode) return;
    setActiveWord(null);
    setDraggedOverWord(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (!editMode) return;
    const movingItem = activeWord === id;
    const focusedItem = document.activeElement?.id === id;

    if (!focusedItem) return;

    if (movingItem) {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        console.log("Word dropped");
        setActiveWord(null);
        setDraggedOverWord(null);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        console.log("Move word up");
        const oldIndex = sortedWords.findIndex(word => word.id === id);
        if (oldIndex === 0) return;

        setSortedWords(prevWords => {
          const newWords = [...prevWords];
          newWords.splice(oldIndex - 1, 0, prevWords[oldIndex]);
          newWords.splice(oldIndex + 1, 1);
          return newWords;
        });
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        console.log("Move word down");
        const oldIndex = sortedWords.findIndex(word => word.id === id);
        if (oldIndex === sortedWords.length - 1) return;

        setSortedWords(prevWords => {
          const newWords = [...prevWords];
          newWords.splice(oldIndex + 2, 0, prevWords
          [oldIndex]);
          newWords.splice(oldIndex, 1);
          return newWords;
        });
      }
    }
    else {
      if (event.key === "Enter" || event.key === " ") {
        console.log("Word selected");
        setActiveWord(id);
      }
    }
  };

  const changeWordOrderInUrlParams = (newWordIds: string[]): void => {
    searchParams.set("words", newWordIds.join(","));
    setSearchParams(searchParams);
  };

  const saveChanges = (): void => {
    if (!collectionId) return;
    const newWords = sortedWords.map(word => word.id);
    updateCollectionWordIds(newWords, collectionId);
    changeWordOrderInUrlParams(newWords);
    enqueueSnackbar("Endringer lagret", {
      variant: "success",
    });
  };

  useEffect(() => {
    if (!editMode && words !== sortedWords) {
      saveChanges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.description}>{`${thisCollectionIsEmpty}.`}</p>
        <p className={styles.description}>{descriptionWithLinks}</p>
        <div className={styles.navButtons}>
          <Button
            variant="default"
            role="link"
            onClick={() => navigate(`${STATIC_PATH.SEARCH}?lang=${lang.code}`)}
          >
            {goToSearch}
          </Button>
          <Button
            variant="default"
            role="link"
            onClick={() => navigate(`/${lang.code}`)}
          >
            {goToTopic}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul
        role="list"
        className={styles.words}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
      >
        {sortedWords.map(word => (
          <MultiLanguageWord
            key={word.id}
            searchResult={word}
            showWrittenWords={showWrittenWords}
            showArticles={showArticles}
            editMode={editMode}
            id={word.id}
            onKeyDown={(event) => handleKeyDown(event, word.id)}
            onDragStart={(event) => handleDragStart(event, word.id)}
            onDragEnd={handleDragEnd}
            dragging={activeWord === word.id}
          />
        ))}
      </ul>
      {isCollectionOwner ? (
        <p className={styles.description}>{descriptionWithLinks}</p>
      ) : null}
    </div>
  );
};

export default CollectionPage;
