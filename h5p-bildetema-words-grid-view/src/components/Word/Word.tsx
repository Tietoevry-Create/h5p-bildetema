import React from "react";
import { useL10n } from "use-h5p";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import styles from "./Word.module.scss";
import { Word as WordType } from "../../../../common/types/types";
import { Image } from "../Image/Image";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperOverride.scss";
import { WordAudio } from "../WordAudio/WordAudio";
import { gridImageSizes } from "../../utils/image/image.utils";

type WordProps = {
  word: WordType;
  textVisible: boolean;
  showArticles: boolean;
};

export const Word: React.FC<WordProps> = ({
  textVisible,
  word,
  showArticles,
}) => {
  const { images } = word;

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
        loopedSlides={numberOfImages}
        spaceBetween={10}
      >
        {numberOfImages > 1 && (
          // make sure our ARIA text is used instead of swiper's
          <button
            type="button"
            className="swiper-button-prev"
            aria-labelledby="prev-button"
          >
            <span id="prev-button" className={styles.visuallyHidden}>
              {prevLabel}
            </span>
          </button>
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
            aria-labelledby="next-button"
          >
            <span id="next-button" className={styles.visuallyHidden}>
              {nextLabel}
            </span>
          </button>
        )}
      </Swiper>
    );
  };

  const hasAudio = word.audioFiles && word.audioFiles.length > 0;

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem" className={styles.word}>
      <div className={styles.image_container}>{renderImages()}</div>
      {hasAudio && (
        <WordAudio
          word={word}
          textVisible={textVisible}
          showArticles={showArticles}
        />
      )}
    </li>
  );
};
