// import { useDBContext } from "common/hooks/useDBContext";
// import { LanguageCode } from "common/types/LanguageCode";
// import { Topic, TopicIds, TopicWord, Word } from "common/types/types";
import { forwardRef } from "react";
// import { useLocation } from "react-router-dom";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import {  toSingleLabel } from "common/utils/word.utils";
import { getImageSrc } from "common/utils/image/image.utils";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import styles from "./PrintWords.module.scss";
import { useCurrentWords } from "../../hooks/useCurrentWords";

type PrintWordsProps = {
  // topicIds: TopicIds;
  showWrittenWords: boolean;
  imagesPrRow: number;
  // isWordView: boolean;
  showArticles: boolean;
};

export const PrintWords = forwardRef<HTMLDivElement, PrintWordsProps>(
  (
    {
      // topicIds: { topicId, subTopicId },
      showWrittenWords,
      imagesPrRow,
      // isWordView,
      showArticles,
    },
    ref,
  ) => {
    const { idToWords } = useNewDBContext() || {};
    const words = useCurrentWords()
    const backendUrl = useBackendUrlContext()

    // const { topics } = useDBContext() || {};
    const currentLanguageCode = useCurrentLanguageCode();

    // const { pathname } = useLocation();
    // const currentLanguageCode =
    //   pathname.split("/").length >= 2
    //     ? (pathname.split("/")[1] as LanguageCode)
    //     : ("nob" as LanguageCode);

    // const topicsToWords = (
    //   inputTopics: Topic[] | undefined,
    // ): TopicWord[] | undefined => {
    //   return inputTopics?.map(t => {
    //     const topicWords =
    //       t.labelTranslations.get(currentLanguageCode) ?? ({} as TopicWord);
    //     return topicWords;
    //   });
    // };

    const getHeader = (): string => {
      const subTopic = idToWords?.get(words.at(0)?.subTopicId || "")
      if(subTopic) {
        return toSingleLabel(subTopic.translations.get(currentLanguageCode)?.labels || [])
      }
      const topic = idToWords?.get(words.at(0)?.topicId || "")
      if(topic) {
        return toSingleLabel(topic.translations.get(currentLanguageCode)?.labels || [])
      }
      return ""
    };

    const renderTable = (): JSX.Element[] => {
      // const findWords = (): Word[] | TopicWord[] | undefined => {
      //   if (isWordView) {
      //     return subTopicId
      //       ? topics
      //           ?.find(t => t.id === topicId)
      //           ?.subTopics?.find(s => s.id === subTopicId)
      //           ?.words?.get(currentLanguageCode)
      //       : topics
      //           ?.find(t => t.id === topicId)
      //           ?.words?.get(currentLanguageCode);
      //   }

      //   if (!topicId) {
      //     return topicsToWords(topics);
      //   }

      //   const subTopics = topics?.find(t => t.id === topicId)?.subTopics;
      //   if (subTopics) {
      //     return topicsToWords(subTopics);
      //   }

      //   return undefined;
      // };
      // const words = findWords();

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
            // const wordLabel = extractWordLabel(word, showArticles);
            const wordLabel = toSingleLabel(word.translations.get(currentLanguageCode)?.labels || [], showArticles);

            // TODO: Change method to find correct image from Swiper
            // const activeImage = word.images?.find(image => {
            //   return document.querySelector(
            //     `div.swiper-slide-active img[src="${image?.src}"]`,
            //   );
            // });

            const img = getImageSrc(word.images?.at(0) || "", backendUrl)
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
              // eslint-disable-next-line react/no-array-index-key
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
