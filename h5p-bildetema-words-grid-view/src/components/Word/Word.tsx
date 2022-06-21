/* eslint-disable import/no-unresolved */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import styles from "./Word.module.scss";
import { Word as WordType } from "../../../../common/types/types";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { WordAudio } from "../WordAudio/WordAudio";

type WordProps = {
  word: WordType;
  textVisible: boolean;
};

export const Word: React.FC<WordProps> = ({ textVisible, word }) => {
  const { label, images } = word;

  // Temporary workaround while we don't have images in a known location.
  // To test add images to /sites/default/files/h5p/development/h5p-bilder/
  // For dev-root add images in the folder h5p-bilder in the dev-root and restart
  const removeSharepointLink = (url: string): string => {
    return url.replace(
      "https://hioa365.sharepoint.com/sites/Bildetema/bildefiler/",
      "https://prodbildetemabackend.blob.core.windows.net/images/large/",
    );
  };

  const renderImages = (): JSX.Element => {
    const multipleImages = images.length > 1;

    return (
      <Swiper
        pagination={{
          dynamicBullets: multipleImages,
        }}
        navigation={multipleImages}
        modules={multipleImages ? [Pagination, Navigation] : []}
        loop={multipleImages}
      >
        {images.length !== 0 ? (
          images.map(image => (
            <SwiperSlide key={image}>
              <div>
                <img
                  className={styles.img}
                  src={removeSharepointLink(image)}
                  alt=""
                  width="250"
                  height="250"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>
              <img
                className={styles.img}
                src="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-17.jpg"
                alt=""
                width="250"
                height="250"
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    );
  };

  return (
    <div className={styles.word}>
      <div className={styles.image_container}>{renderImages()}</div>
      <p className={styles.word_label}>
        {textVisible && label}
        {word.audio && <WordAudio word={word} />}
      </p>
    </div>
  );
};
