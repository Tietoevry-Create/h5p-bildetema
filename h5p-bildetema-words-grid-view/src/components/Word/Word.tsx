import { Word as WordType } from "common/types/types";
import { FC } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Audio } from "common/components/Audio/Audio";
import { extractWordLabel } from "common/utils/word.utils";
import { Button } from "common/components/Button";
import { useL10n } from "../../hooks/useL10n";
import { gridImageSizes } from "../../utils/image/image.utils";
import { Image } from "../Image/Image";
import styles from "./Word.module.scss";

type WordProps = {
  word: WordType;
  textVisible: boolean;
  showArticles: boolean;
  onOpenDialog: (id: string) => void;
};

export const Word: FC<WordProps> = ({
  textVisible,
  word,
  showArticles,
  onOpenDialog,
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

  const hasAudio = word.audioFiles && word.audioFiles.length > 0;
  const lang = useL10n("htmlLanguageCode");
  const playAudioLabel = useL10n("playAudio");
  const stopAudioLabel = useL10n("stopAudio");
  const label = textVisible ? extractWordLabel(word, showArticles) : "";

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem" className={styles.word}>
      <Button
        variant="circle"
        className={styles.bookmarkButton}
        onClick={() => onOpenDialog(word.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m480-240-168 72q-40 17-76-6.5T200-241v-519q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v519q0 43-36 66.5t-76 6.5l-168-72Zm0-88 200 86v-518H280v518l200-86Zm0-432H280h400-200Z" />
        </svg>
      </Button>
      <div className={styles.image_container}>{renderImages()}</div>
      {hasAudio && (
        <Audio
          lang={lang}
          stopAudioLabel={stopAudioLabel}
          playAudioLabel={playAudioLabel}
          audioFiles={word.audioFiles}
          label={label}
        />
      )}
    </li>
  );
};
