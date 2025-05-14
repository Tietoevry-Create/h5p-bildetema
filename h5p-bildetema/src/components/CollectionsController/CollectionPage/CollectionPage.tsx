/* eslint-disable jsx-a11y/no-redundant-roles */
import { JSX, useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "common/components/Button";
import { STATIC_PATH } from "common/constants/paths";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMyCollections } from "common/hooks/useMyCollections";
import { useCollectionWords } from "../../../hooks/useSelectedWords";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import useCurrentCollection from "../../../hooks/useCurrentCollection";
import { useL10ns } from "../../../hooks/useL10n";
import { SortableMultiLanguageWord } from "../MultiLanguageWord/SortableMultiLanguageWord";
import styles from "./CollectionPage.module.scss";

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
  const [isKeyboardEvent, setIsKeyboardEvent] = useState(false);
  const [sortedWords, setSortedWords] = useState(words);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const {
    addWordsDescription,
    search,
    topicView,
    goToSearch,
    goToTopic,
    thisCollectionIsEmpty,
    sortWordsDescription,
    addWordsDescriptionShort,
  } = useL10ns(
    "addWordsDescription",
    "search",
    "topicView",
    "goToSearch",
    "goToTopic",
    "thisCollectionIsEmpty",
    "sortWordsDescription",
    "addWordsDescriptionShort",
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

  const shortDescriptionWithLinks = replacePlaceholders(
    addWordsDescriptionShort,
    replacements,
  );

  const handleDragStart = (event: DragStartEvent): void => {
    if (event.activatorEvent && event.activatorEvent.type === "keydown") {
      setIsKeyboardEvent(true);
    }
  };

  /**
   * Handles the keyboard drag over event.
   * It updates the order of the items in sortedWords.
   * We use onDragOver for keyboard events because it provides a better placement for the dragged item,
   * and it avoids the height of the dragged item potentially overlapping the other items when moved.
   * @param {DragOverEvent} event - The drag over event.
   */
  const handleKeyboardDragOver = (event: DragOverEvent): void => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortedWords(prevSortedWords => {
        const oldIndex = prevSortedWords.findIndex(
          word => word.id === active.id,
        );
        const newIndex = prevSortedWords.findIndex(word => word.id === over.id);

        return arrayMove(prevSortedWords, oldIndex, newIndex);
      });
    }
  };

  const handleDragOver = (event: DragOverEvent): void => {
    if (event.activatorEvent && event.activatorEvent.type === "keydown") {
      handleKeyboardDragOver(event);
    } else if (isKeyboardEvent) {
      setIsKeyboardEvent(false);
    }
  };

  /**
   * Handles the end of a drag event.
   * If the drag was initiated by a keyboard event, it saves the changes.
   * If the drag was initiated by a mouse or touch event it updates the order of the items.
   * We use onDragEnd for mouse and touch events because it gives a better dragging experience.
   * @param {DragEndEvent} event - The drag end event.
   */
  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (isKeyboardEvent) {
      setIsKeyboardEvent(false);
    }

    if (event.activatorEvent && event.activatorEvent.type === "keydown") {
      return;
    }

    if (over && active.id !== over.id) {
      setSortedWords(prevSortedWords => {
        const oldIndex = prevSortedWords.findIndex(
          word => word.id === active.id,
        );
        const newIndex = prevSortedWords.findIndex(word => word.id === over.id);

        return arrayMove(prevSortedWords, oldIndex, newIndex);
      });
    }
  };

  const changeWordOrderInUrlParams = (newWordIds: string[]): void => {
    searchParams.set("words", newWordIds.join(","));
    setSearchParams(searchParams);
  };

  const removeWordFromSortedWords = (wordId: string): void => {
    setSortedWords(prevSortedWords =>
      prevSortedWords.filter(word => word.id !== wordId),
    );
  };

  const saveChanges = (): void => {
    if (!collectionId) return;
    const newWords = sortedWords.map(word => word.id);
    updateCollectionWordIds(newWords, collectionId);
    changeWordOrderInUrlParams(newWords);
  };

  const autoSaveChanges = (): void => {
    if (!collectionId) return;
    const newWords = sortedWords.map(word => word.id);
    updateCollectionWordIds(newWords, collectionId);
  };

  useEffect(() => {
    const wordIds = searchParams.get("words")?.split(",") || [];
    const hasChanges = !wordIds.every(
      (wordId, index) => wordId === sortedWords[index].id,
    );

    if (!editMode && hasChanges) {
      saveChanges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  useEffect(() => {
    // Reset sortedWords when language changes, else the language will be wrong
    setSortedWords(words);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (editMode) {
      // Save changes if user navigates away from the page
      autoSaveChanges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedWords]);

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

  if (editMode) {
    return (
      <div className={styles.editWrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortedWords}>
            <p className={styles.description}>
              {sortWordsDescription}
              <span className={styles.hiddenMobile}>
                {` `}
                {shortDescriptionWithLinks}
              </span>
            </p>
            <ul role="list" className={styles.words}>
              {sortedWords.map(word => (
                <SortableMultiLanguageWord
                  key={word.id}
                  id={word.id}
                  multiLanguageWord={word}
                  showWrittenWords={showWrittenWords}
                  showArticles={showArticles}
                  editMode={editMode}
                  removeWord={removeWordFromSortedWords}
                  isKeyboardEvent={isKeyboardEvent}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul role="list" className={styles.words}>
        {words.map(word => (
          <MultiLanguageWord
            key={word.id}
            multiLanguageWord={word}
            showWrittenWords={showWrittenWords}
            showArticles={showArticles}
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
