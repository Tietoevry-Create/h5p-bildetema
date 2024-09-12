import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Audio } from "common/components/Audio/Audio";
import { Button } from "common/components/Button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
} from "common/components/Icons/Icons";
import { Image } from "common/components/Image/Image";
import { languages as languagesConst } from "common/constants/languages";
import { useMyCollections } from "common/hooks/useMyCollections";
import { LanguageCodeString } from "common/types/LanguageCode";
import { SearchResult } from "common/types/types";
import { gridImageSizes } from "common/utils/image/image.utils";
import { toSingleLabel } from "common/utils/word.utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { useL10n, useL10ns } from "../../../hooks/useL10n";
import { translatedLabel } from "../../../utils/language.utils";
import styles from "./SearchResultCard.module.scss";

type SearchResultCardProps = {
  searchResult: SearchResult;
  handleBookmarkClick?: (id: string) => void;
};

export const SearchResultCard = ({
  searchResult,
  handleBookmarkClick,
}: SearchResultCardProps): JSX.Element => {
  const { images } = searchResult;
  const { wordIdsInCollections } = useMyCollections();
  const isInCollection = wordIdsInCollections.has(searchResult.id);

  const prevLabel = useL10n("prevImageLabel");
  const nextLabel = useL10n("nextImageLabel");
  const menuToAddWordAriaLabel = useL10n("menuToAddWordAriaLabel");

  const renderImages = (): JSX.Element => {
    const numberOfImages = images?.length ?? 0;
    const multipleImages = numberOfImages > 1;

    return (
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
    // biome-ignore lint/a11y/noRedundantRoles: The role is necessary because Safari will change the aria role if the `display` CSS property is changed
    <li role="listitem" className={styles.searchResultCard}>
      {handleBookmarkClick && (
        <div className={styles.bookmarkButton}>
          <Button
            variant="circle"
            onClick={() => handleBookmarkClick(searchResult.id)}
            aria-label={menuToAddWordAriaLabel}
          >
            {isInCollection ? <BookmarkFilledIcon /> : <BookmarkIcon />}
          </Button>
        </div>
      )}
      <div className={styles.image_container}>{renderImages()}</div>
      <div className={styles.translations}>
        {searchResult.translations.map((translation, index) => (
          <div
            className={styles.translation}
            // Todo fix key when we never can have multiple of same language
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
              label={toSingleLabel(translation.labels)}
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
