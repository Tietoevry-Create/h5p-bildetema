import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { gridImageSizes } from "common/utils/image/image.utils";
import { Image } from "common/components/Image/Image";
import { SearchResult } from "common/types/types";
import { Audio } from "common/components/Audio/Audio";
import { toSingleLabel } from "common/utils/word.utils";
import { useL10n } from "../../../hooks/useL10n";
import styles from "./SearchResultCard.module.scss";

type SearchResultCardProps = {
  searchResult: SearchResult;
};

export const SearchResultCard = ({
  searchResult,
}: SearchResultCardProps): JSX.Element => {
  const { images } = searchResult;

  const prevLabel = useL10n("prevImageLabel");
  const nextLabel = useL10n("nextImageLabel");

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
                width="220"
                height="220"
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

  const lang = useL10n("htmlLanguageCode");
  const playAudioLabel = useL10n("playAudio");
  const stopAudioLabel = useL10n("stopAudio");

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem" className={styles.searchResultCard}>
      <div className={styles.image_container}>{renderImages()}</div>
      {searchResult.translations.map(translation => (
        <Audio
          key={translation.langCode}
          label={toSingleLabel(translation.labels)}
          lang={lang}
          playAudioLabel={playAudioLabel}
          stopAudioLabel={stopAudioLabel}
          audioFiles={translation.audioFiles}
        />
      ))}
    </li>
  );
};
