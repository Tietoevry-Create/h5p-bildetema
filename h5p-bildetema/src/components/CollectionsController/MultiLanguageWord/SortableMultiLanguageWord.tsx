import { MouseEvent, useMemo, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";
import { gridImageSizes } from "common/utils/image/image.utils";
import { Image } from "common/components/Image/Image";
import { useMyCollections } from "common/hooks/useMyCollections";
import { SearchResult } from "common/types/types";
import { Audio } from "common/components/Audio/Audio";
import { toSingleLabel } from "common/utils/word.utils";
import { Button } from "common/components/Button";
import { LanguageCodeString } from "common/types/LanguageCode";
import { languages as languagesConst } from "common/constants/languages";
import { DeleteIcon } from "common/components/Icons/Icons";
import { enqueueSnackbar } from "notistack";
import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useL10ns, useL10n } from "../../../hooks/useL10n";
import styles from "./MultiLanguageWord.module.scss";
import { translatedLabel } from "../../../utils/language.utils";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import {
  getLanguageAttribute,
  useCurrentLanguageCode,
} from "../../../hooks/useCurrentLanguage";
import useCurrentCollection from "../../../hooks/useCurrentCollection";

const OpenDialog = {
  DELETE_DIALOG: "DELETE_DIALOG",
  NONE: "NONE",
} as const;

type OpenDialog = (typeof OpenDialog)[keyof typeof OpenDialog];

type SortableMultiLanguageWordProps = {
  multiLanguageWord: SearchResult;
  showArticles: boolean;
  showWrittenWords: boolean;
  editMode: boolean;
  id: string;
  removeWord: (wordId: string) => void;
};

export const SortableMultiLanguageWord = ({
  multiLanguageWord,
  showArticles,
  showWrittenWords,
  editMode,
  id,
  removeWord,
}: SortableMultiLanguageWordProps): JSX.Element => {
  const { images } = multiLanguageWord;
  const [openDialog, setOpenDialog] = useState<OpenDialog>(OpenDialog.NONE);
  const { isCollectionOwner, collectionId, collectionName } =
    useCurrentCollection();
  const { deleteWordFromCollection } = useMyCollections();
  const [searchParams, setSearchParams] = useSearchParams();
  const langCode = useCurrentLanguageCode();
  const wordTranslation = useMemo(
    () => multiLanguageWord.translations.find(x => x.lang.code === langCode),
    [langCode, multiLanguageWord.translations],
  );

  const {
    prevImageLabel,
    nextImageLabel,
    deleteWord,
    deleteWordConfirmation,
    wordRemovedFromCollection,
  } = useL10ns(
    "prevImageLabel",
    "nextImageLabel",
    "deleteWord",
    "deleteWordConfirmation",
    "wordRemovedFromCollection",
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const removeWordFromUrlParams = (wordId: string): void => {
    const param = "words";
    const words = searchParams.get(param)?.split(",") ?? [];
    const filteredWords = words.filter(word => word !== wordId);

    if (filteredWords.length === 0) {
      searchParams.delete(param);
    } else {
      searchParams.set(param, filteredWords.join(","));
    }

    setSearchParams(searchParams);
  };

  const getMessage = (): React.ReactNode => {
    const replacements = {
      collection: <b key={1}>{collectionName}</b>,
    };

    const message = replacePlaceholders(
      wordRemovedFromCollection,
      replacements,
    );

    return <span>{message}</span>;
  };

  const handleOnDelete = (event: MouseEvent): void => {
    event.preventDefault();
    setOpenDialog(OpenDialog.DELETE_DIALOG);
  };

  const handleDeleteWord = (): void => {
    deleteWordFromCollection(collectionId ?? "", multiLanguageWord.id);
    removeWordFromUrlParams(multiLanguageWord.id);
    removeWord(multiLanguageWord.id);
    setOpenDialog(OpenDialog.NONE);
    enqueueSnackbar(getMessage(), {
      variant: "success",
    });
  };

  const renderImages = (): JSX.Element => {
    const numberOfImages = images?.length ?? 0;
    const multipleImages = numberOfImages > 1;

    return (
      <div>
        <Swiper
          pagination={{
            dynamicBullets: multipleImages && !editMode,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={multipleImages && !editMode ? [Pagination, Navigation] : []}
          loop={multipleImages}
          spaceBetween={10}
        >
          {numberOfImages > 1 && (
            // make sure our ARIA text is used instead of swiper's
            <button
              type="button"
              className="swiper-button-prev"
              style={editMode ? { display: "none" } : {}}
              aria-label={prevImageLabel}
            />
          )}
          {numberOfImages !== 0 ? (
            images.map(image => (
              <SwiperSlide key={image.src}>
                <div>
                  <Image
                    src={image.src}
                    srcSets={image.srcSets}
                    sizes={gridImageSizes}
                    width="250"
                    height="250"
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className={styles.image_placeholder}>
                <Image
                  src="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-17.jpg"
                  width="250"
                  height="250"
                />
              </div>
            </SwiperSlide>
          )}
          {numberOfImages > 1 && (
            // make sure our ARIA text is used instead of swiper's
            <button
              type="button"
              className="swiper-button-next"
              style={editMode ? { display: "none" } : {}}
              aria-label={nextImageLabel}
            />
          )}
        </Swiper>
      </div>
    );
  };

  const translations = useL10ns(
    ...(languagesConst.map(
      lang => `lang_${lang}`,
    ) as Array<LanguageCodeString>),
  );

  const lang = useL10n("htmlLanguageCode");
  const playAudioLabel = useL10n("playAudio");
  const stopAudioLabel = useL10n("stopAudio");

  return (
    <li
      className={`${styles.searchResultCard} ${editMode ? styles.editMode : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <button
        type="button"
        className={styles.dragHandle}
        aria-label="Reorder"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...listeners}
      />
      {isCollectionOwner ? (
        <>
          <Button
            variant="circle"
            className={styles.deleteButton}
            aria-label={deleteWord}
            onClick={event => handleOnDelete(event)}
          >
            <DeleteIcon />
          </Button>
          <DeleteDialog
            open={openDialog === OpenDialog.DELETE_DIALOG}
            title={deleteWord}
            description={deleteWordConfirmation}
            itemToDeleteTitle={toSingleLabel(wordTranslation?.labels)}
            onClose={() => setOpenDialog(OpenDialog.NONE)}
            onDelete={handleDeleteWord}
          />
        </>
      ) : (
        ""
      )}
      <div className={styles.image_container}>{renderImages()}</div>
      <div className={styles.translations}>
        {multiLanguageWord.translations.map((translation, index) => (
          <div
            className={styles.translation}
            // Todo fix key when we never can have multiple of same language
            // eslint-disable-next-line react/no-array-index-key
            key={`${translation.lang.code}-${index}`}
          >
            {multiLanguageWord.translations.length > 1 && (
              <span className={styles.translationLang}>
                {translatedLabel(
                  translation.lang.code,
                  translations,
                ).toUpperCase()}
              </span>
            )}
            <Audio
              label={
                showWrittenWords
                  ? toSingleLabel(translation.labels, showArticles)
                  : ""
              }
              lang={lang}
              labelLang={getLanguageAttribute(translation.lang.code)}
              playAudioLabel={playAudioLabel}
              stopAudioLabel={stopAudioLabel}
              audioFiles={translation.audioFiles}
              rtl={translation.lang.rtl}
              lowerCaseLabel
            />
          </div>
        ))}
      </div>
    </li>
  );
};
