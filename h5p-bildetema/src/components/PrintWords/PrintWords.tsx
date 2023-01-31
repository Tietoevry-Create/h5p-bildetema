import React from "react";
import { useLocation } from "react-router-dom";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { TopicIds, Topic, Word } from "../../../../common/types/types";
import styles from "./PrintWords.module.scss";

type PrintWordsProps = {
  topicIds: TopicIds;
  showWrittenWords: boolean;
  imagesPrRow: number;
  isWordView: boolean;
  showArticles: boolean;
};

export const PrintWords = React.forwardRef<HTMLDivElement, PrintWordsProps>(
  (
    {
      topicIds: { topicId, subTopicId },
      showWrittenWords,
      imagesPrRow,
      isWordView,
      showArticles,
    },
    ref,
  ) => {
    const { topics } = useDBContext() || {};
    const { pathname } = useLocation();
    const currentLanguageCode =
      pathname.split("/").length >= 2
        ? (pathname.split("/")[1] as LanguageCode)
        : ("nob" as LanguageCode);

    const topicsToWords = (
      inputTopics: Topic[] | undefined,
    ): Word[] | undefined => {
      return inputTopics?.map(
        t => t.labelTranslations.get(currentLanguageCode) ?? ({} as Word),
      );
    };

    const getHeader = (): string => {
      if (subTopicId && topicId) {
        return (
          topics
            ?.find(topic => topic.id === topicId)
            ?.subTopics.find(s => s.id === subTopicId)
            ?.labelTranslations.get(currentLanguageCode)?.label ?? ""
        );
      }
      if (topicId) {
        return (
          topics
            ?.find(topic => topic.id === topicId)
            ?.labelTranslations.get(currentLanguageCode)?.label ?? ""
        );
      }
      return "";
    };

    const renderTable = (): JSX.Element[] => {
      const findWords = (): Word[] | undefined => {
        if (isWordView) {
          return subTopicId
            ? topics
              ?.find(t => t.id === topicId)
              ?.subTopics?.find(s => s.id === subTopicId)
              ?.words?.get(currentLanguageCode)
            : topics
              ?.find(t => t.id === topicId)
              ?.words?.get(currentLanguageCode);
        }

        if (!topicId) {
          return topicsToWords(topics);
        }

        const subTopics = topics?.find(t => t.id === topicId)?.subTopics;
        if (subTopics) {
          return topicsToWords(subTopics);
        }

        return undefined;
      };
      const words = findWords();

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
            const wordLabel =
              showArticles && word.article
                ? `${word.article} ${word.label}`
                : word.label;

            const activeImage = word.images?.find(image => {
              return document.querySelector(
                `div.swiper-slide-active img[src="${image?.src}"]`,
              );
            });

            const img = activeImage?.src ?? word.images?.at(0)?.src;
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
