import React from "react";
import { useReactToPrint } from "react-to-print";
import { PrintIcon } from "../Icons/Icons";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./PrintButton.module.scss";
import { TopicIds } from "../../../../common/types/types";
import { PrintWords } from "../PrintWords/PrintWords";

type PrintProps = {
  topicIds: TopicIds;
  showWrittenWords: boolean;
};

export const PrintButton: React.FC<PrintProps> = ({
  topicIds,
  showWrittenWords,
}) => {
  const { printLabel } = useL10ns("printLabel");
  const printRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <button
        type="button"
        className={styles.printButton}
        onClick={handlePrint}
        // onClick={() => window.print()}
      >
        <span className={styles.printButtonWrapper}>
          {printLabel && <span>{printLabel}</span>}
          <PrintIcon />
        </span>
      </button>
      <div className={styles.printWordsWrapper}>
        <PrintWords
          ref={printRef}
          topicIds={topicIds}
          showWrittenWords={showWrittenWords}
        />
      </div>
    </>
  );
};
