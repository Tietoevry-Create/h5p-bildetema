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

export type WordProps = {
  clickHandler: React.Dispatch<WordType>;
  word: WordType;
  textVisible: boolean;
};

const Word: React.FC<WordProps> = ({ clickHandler, textVisible, word }) => {
  const { label, images } = word;

  const renderImages = (): JSX.Element => {
    const multipleImages = images.length > 1;

    return (
      <Swiper
        onClick={() => clickHandler(word)}
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
              <div className={styles.test}>
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className={styles.test}>
              <img
                src="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-17.jpg"
                alt=""
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
      {textVisible && <p className={styles.word_label}> {label} </p>}
    </div>
  );
};

export default Word;
