import { JSX } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { gridImageSizes } from "common/utils/image/image.utils";
import { Image } from "common/components/Image/Image";
import { SearchResult } from "common/types/types";
import { Audio } from "common/components/Audio/Audio";
import { toSingleLabel } from "common/utils/word.utils";
import { LanguageCodeString } from "common/types/LanguageCode";
import { languages as languagesConst } from "common/constants/languages";
import { useL10ns, useL10n } from "../../../hooks/useL10n";
import { translatedLabel } from "../../../utils/language.utils";
import { getLanguageAttribute } from "../../../hooks/useCurrentLanguage";
import styles from "./MultiLanguageWord.module.scss";

type MultiLanguageWordProps = {
  multiLanguageWord: SearchResult;
  showArticles: boolean;
  showWrittenWords: boolean;
};

export const MultiLanguageWord = ({
  multiLanguageWord,
  showArticles,
  showWrittenWords,
}: MultiLanguageWordProps): JSX.Element => {
  const { images } = multiLanguageWord;

  const { prevImageLabel, nextImageLabel } = useL10ns(
    "prevImageLabel",
    "nextImageLabel",
  );

  const renderImages = (): JSX.Element => {
    const numberOfImages = images?.length ?? 0;
    const multipleImages = numberOfImages > 1;

    return (
      <div>
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

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem" className={styles.cardWrapper}>
      <div className={styles.card}>
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
                audioFiles={translation.audioFiles}
                rtl={translation.lang.rtl}
                lowerCaseLabel
              />
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};
