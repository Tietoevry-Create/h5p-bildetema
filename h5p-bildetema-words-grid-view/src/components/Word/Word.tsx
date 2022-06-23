/* eslint-disable import/no-unresolved */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import styles from "./Word.module.scss";
import { Word as WordType } from "../../../../common/types/types";
import { Image } from "../Image/Image";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { WordAudio } from "../WordAudio/WordAudio";

type WordProps = {
  word: WordType;
  textVisible: boolean;
};

enum Size {
  Small,
  Medium,
  Large,
  XLarge,
}

export const Word: React.FC<WordProps> = ({ textVisible, word }) => {
  const { label, images } = word;

  const getImageUrl = (url: string, size?: Size): string => {
    const storageUrl =
      "https://prodbildetemabackend.blob.core.windows.net/images/";
    const fileName = url.split("/").pop() || "";

    switch (size) {
      case Size.Small:
        return `${storageUrl}small/${fileName}`;
      case Size.Medium:
        return `${storageUrl}medium/${fileName}`;
      case Size.Large:
        return `${storageUrl}large/${fileName}`;
      case Size.XLarge:
        return `${storageUrl}xlarge/${fileName}`;
      default:
        return `${storageUrl}large/${fileName}`;
    }
  };

  const getSrcSet = (url: string): string => {
    return `
      ${getImageUrl(url, Size.Small)} 200,
      ${getImageUrl(url, Size.Medium)} 350,
      ${getImageUrl(url, Size.Large)} 600,
      ${getImageUrl(url, Size.XLarge)} 1000,
    `;
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
                <Image
                  src={getImageUrl(image)}
                  srcSet={getSrcSet(image)}
                  width="250"
                  height="250"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>
              <Image
                src="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-17.jpg"
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
