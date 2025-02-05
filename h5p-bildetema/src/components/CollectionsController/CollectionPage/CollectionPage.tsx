/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "common/components/Button";
import { STATIC_PATH } from "common/constants/paths";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMyCollections } from "common/hooks/useMyCollections";
import { enqueueSnackbar } from "notistack";
import { useCollectionWords } from "../../../hooks/useSelectedWords";
import styles from "./CollectionPage.module.scss";
import { MultiLanguageWord } from "../MultiLanguageWord/MultiLanguageWord";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import useCurrentCollection from "../../../hooks/useCurrentCollection";
import { useL10ns } from "../../../hooks/useL10n";
import { SortableMultiLanguageWord } from "../MultiLanguageWord/SortableMultiLanguageWord";

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
  const { updateCollection } = useMyCollections();
  const words = useCollectionWords();
  const [sortedWords, setSortedWords] = useState(words);
  const sensors = useSensors(
    useSensor(PointerSensor),
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

  const handleDragEnd = (event: DragEndEvent): void => {
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

  const changeWordOrderInUrlParams = (newWordIds: string[]): void => {
    searchParams.set("words", newWordIds.join(","));
    setSearchParams(searchParams);
  };

  const saveChanges = (): void => {
    const newWords = sortedWords.map(word => word.id);
    updateCollection(collectionId, newWords);
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

  if (editMode) {
    return (
      <div className={styles.wrapper}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortedWords}>
            <ul role="list" className={styles.words}>
              {sortedWords.map(word => (
                <SortableMultiLanguageWord
                  key={word.id}
                  id={word.id}
                  searchResult={word}
                  showWrittenWords={showWrittenWords}
                  showArticles={showArticles}
                  editMode={editMode}
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
            searchResult={word}
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
