import { useMemo, useState } from "react";
import { Navigation, Pagination } from "swiper";
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
import { Menu } from "@headlessui/react";
import { useL10ns } from "use-h5p";
import { LanguageCodeString } from "common/types/LanguageCode";
import { languages as languagesConst } from "common/constants/languages";
import { useL10n } from "../../../hooks/useL10n";
import styles from "./MultiLanguageWord.module.scss";
import { translatedLabel } from "../../../utils/language.utils";
import { DeleteIcon, MoreHorizIcon } from "../../Icons/Icons";
import DeleteDialog from "../../Dialog/DeleteDialog/DeleteDialog";
import { useCurrentLanguageCode } from "../../../hooks/useCurrentLanguage";

const OpenDialog = {
  DELETE_DIALOG: "DELETE_DIALOG",
  NONE: "NONE",
} as const;

type OpenDialog = (typeof OpenDialog)[keyof typeof OpenDialog];

type SearchResultCardProps = {
  searchResult: SearchResult;
  showArticles: boolean;
  showWrittenWords: boolean;
};

export const MultiLanguageWord = ({
  searchResult,
  showArticles,
  showWrittenWords,
}: SearchResultCardProps): JSX.Element => {
  const { images } = searchResult;
  const [openDialog, setOpenDialog] = useState<OpenDialog>(OpenDialog.NONE);
  const { myCollections, deleteWordFromCollection } = useMyCollections();
  const [searchParams, setSearchParams] = useSearchParams();
  const langCode = useCurrentLanguageCode();
  const collectionId = searchParams.get("id") ?? "";
  const searchResultTranslation = useMemo(
    () => searchResult.translations.find(x => x.lang.code === langCode),
    [langCode, searchResult.translations],
  );

  const isCollectionOwner =
    myCollections.findIndex(collection => collection.id === collectionId) !==
    -1;

  const prevLabel = useL10n("prevImageLabel");
  const nextLabel = useL10n("nextImageLabel");

  const handleDeleteWord = (): void => {
    deleteWordFromCollection(collectionId, searchResult.id);

    // Remove word from url
    const words = searchParams.get("words")?.split(",") ?? [];
    const filteredWords = words.filter(word => word !== searchResult.id);
    searchParams.set("words", filteredWords.join(","));
    setSearchParams(searchParams);
  };

  const renderImages = (): JSX.Element => {
    const numberOfImages = images?.length ?? 0;
    const multipleImages = numberOfImages > 1;

    return (
      <div>
        {isCollectionOwner ? (
          <Menu>
            <Menu.Button className={styles.button}>
              <MoreHorizIcon />
            </Menu.Button>
            <Menu.Items className={styles.menu}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${styles.menuItemButton} ${
                      active && styles.active
                    }`}
                    onClick={() => setOpenDialog(OpenDialog.DELETE_DIALOG)}
                  >
                    <DeleteIcon />
                    <span>Slett</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          ""
        )}
        <DeleteDialog
          open={openDialog === OpenDialog.DELETE_DIALOG}
          title="Slett ord"
          description="Er du sikker på at du vil slette ordet:"
          itemToDeleteTitle={toSingleLabel(searchResultTranslation?.labels)}
          onClose={() => setOpenDialog(OpenDialog.NONE)}
          onDelete={handleDeleteWord}
        />
        <Swiper
          pagination={{
            dynamicBullets: multipleImages,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={multipleImages ? [Pagination, Navigation] : []}
          loop={multipleImages}
          spaceBetween={10}
        >
          {numberOfImages > 1 && (
            // make sure our ARIA text is used instead of swiper's
            <button
              type="button"
              className="swiper-button-prev"
              aria-label={prevLabel}
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
              aria-label={nextLabel}
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
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem" className={styles.searchResultCard}>
      <div className={styles.image_container}>{renderImages()}</div>
      <div className={styles.translations}>
        {searchResult.translations.map((translation, index) => (
          <div
            className={styles.translation}
            // Todo fix key when we never can have multiple of same language
            // eslint-disable-next-line react/no-array-index-key
            key={`${translation.lang.code}-${index}`}
          >
            {searchResult.translations.length > 1 && (
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
