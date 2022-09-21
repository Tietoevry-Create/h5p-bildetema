import React from "react";
import { Word } from "../../../../common/types/types";
import styles from "./PrintWords.module.scss";

type PrintWordsProps = {
  words: Word[];
  showWrittenWords: boolean;
};

export const PrintWords: React.FC<PrintWordsProps> = ({
  words,
  showWrittenWords,
}) => {
  // export const PrintWords = React.forwardRef<HTMLDivElement, PrintWordsProps>(

  const renderTable = (): JSX.Element[] => {
    const imagesPrRow = 5;

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
    <div className="wrapper">
      <table>
        <tbody>
          <tr/>
          {renderTable()}
        </tbody>
      </table>
    </div>
  );
};
