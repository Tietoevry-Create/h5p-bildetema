import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { toSingleLabel } from "common/utils/word.utils";
import { getImageSrc } from "common/utils/image/image.utils";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import styles from "./PrintWords.module.scss";
import { useCurrentWords } from "../../hooks/useCurrentWords";

type PrintWordsProps = {
  showWrittenWords: boolean;
  imagesPrRow: number;
  showArticles: boolean;
};

export const PrintWords = forwardRef<HTMLDivElement, PrintWordsProps>(
  ({ showWrittenWords, imagesPrRow, showArticles }, ref) => {
    const { idToWords } = useNewDBContext();
    const words = useCurrentWords();
    const backendUrl = useBackendUrlContext();
    const { collection } = useParams();

    const currentLanguageCode = useCurrentLanguageCode();

    const getHeader = (): string => {
      if (collection) {
        return collection;
      }
      const subTopic = idToWords?.get(words.at(0)?.subTopicId || "");
      if (subTopic) {
        return toSingleLabel(
          subTopic.translations.get(currentLanguageCode)?.labels || [],
        );
      }
      const topic = idToWords?.get(words.at(0)?.topicId || "");
      if (topic) {
        return toSingleLabel(
          topic.translations.get(currentLanguageCode)?.labels || [],
        );
      }
      return "";
    };

    const renderTable = (): JSX.Element[] => {
      const wordsCopy = [...(words ?? [])];
      const chunksOfWords = [];

      while (wordsCopy?.length) {
        chunksOfWords.push(wordsCopy.splice(0, imagesPrRow));
      }
      const missingItemsInLastRow =
        imagesPrRow - (chunksOfWords.at(-1)?.length ?? imagesPrRow);
      return chunksOfWords.map((chunk, index) => (
        <tr key={chunk.at(0)?.id} className={styles.tableRow}>
          {chunk.map(word => {
            const wordLabel = toSingleLabel(
              word.translations.get(currentLanguageCode)?.labels || [],
              showArticles,
            );

            const activeImage =
              word.images?.find(image => {
                const imgSrc = getImageSrc(image, backendUrl);
                return document.querySelector(
                  `div.swiper-slide-active img[src="${imgSrc}"]`,
                );
              }) ||
              word.images?.at(0) ||
              "";

            const img = getImageSrc(activeImage, backendUrl);
            return (
              <td key={word.id}>
                <div className={styles.imgWrapper}>
                  {img && <img src={img} alt="" />}
                  {showWrittenWords && img && (
                    <div className={styles.label}>{wordLabel}</div>
                  )}
                </div>
              </td>
            );
          })}
          {index === chunksOfWords.length - 1 &&
            [...Array(missingItemsInLastRow)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key, jsx-a11y/control-has-associated-label
              <td key={`${i}${chunk.at(0)?.id}`} />
            ))}
        </tr>
      ));
    };

    return (
      <div ref={ref} className="wrapper">
        <div className={styles.printHeader}>{getHeader()}</div>
        <table>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    );
  },
);
