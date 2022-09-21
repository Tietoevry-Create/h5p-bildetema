import React from "react";
import { useLocation } from "react-router-dom";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { TopicIds } from "../../../../common/types/types";
import styles from "./PrintWords.module.scss";

type PrintWordsProps = {
  topicIds: TopicIds;
  showWrittenWords: boolean;
};

export const PrintWords = React.forwardRef<HTMLDivElement, PrintWordsProps>(
  ({ topicIds: { topicId, subTopicId }, showWrittenWords }, ref) => {
    const { topics } = useDBContext() || {};
    const { pathname } = useLocation();

    const currentLanguageCode =
      pathname.split("/").length >= 2
        ? (pathname.split("/")[1] as LanguageCode)
        : ("nob" as LanguageCode);

    const renderTable = (): JSX.Element[] => {
      const imagesPrRow = 5;

      const words = subTopicId
        ? topics
            ?.find(t => t.id === topicId)
            ?.subTopics?.get(subTopicId)
            ?.words?.get(currentLanguageCode)
        : topics?.find(t => t.id === topicId)?.words?.get(currentLanguageCode);

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
            return (
              <td key={word.id}>
                <div className={styles.imgWrapper}>
                  <img src={word.images[0].src} alt="" />
                  {showWrittenWords && (
                    <div className={styles.label}>{word.label}</div>
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
        <table>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    );
  },
);
