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
import "./SwiperOverride.scss";
import { WordAudio } from "../WordAudio/WordAudio";

type WordProps = {
  word: WordType;
  textVisible: boolean;
};

export const Word: React.FC<WordProps> = ({ textVisible, word }) => {
  const { images } = word;

  const renderImages = (): JSX.Element => {
    const multipleImages = images && images.length > 1;

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
            <SwiperSlide key={image.src}>
              <div>
                <Image
                  src={image.src}
                  srcSets={image.srcSets}
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
      {word.audio && <WordAudio word={word} textVisible={textVisible}/>}
    </div>
  );
};
