import React from "react";
import { useReactToPrint } from "react-to-print";
import { useDetectClickOutside } from "react-detect-click-outside";
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
  const [imagesPrRow, setImagesPrRow] = React.useState(3);
  const [printClicked, setPrintClicked] = React.useState(false);
  const [viewPrintDropDown, setViewPrintDropDown] = React.useState(false);

  const dropdownRef = useDetectClickOutside({
    onTriggered: () => setViewPrintDropDown(false),
  });
  const printRef = React.useRef(null);

  const { printLabel } = useL10ns("printLabel");

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleDropDownClicked = (): void => {
    setViewPrintDropDown(prev => !prev);
  };

  React.useEffect(() => {
    if (printClicked) {
      setPrintClicked(false);
      handlePrint();
    }
  }, [printClicked, setPrintClicked, handlePrint]);

  const printDropdownOptions = [2, 3, 4, 5, 6];

  return (
    <>
      <div className={styles.printDropdown} ref={dropdownRef}>
        <button
          type="button"
          className={styles.printButton}
          onClick={handleDropDownClicked}
        >
          <span className={styles.printButtonWrapper}>
            {printLabel && <span>{printLabel}</span>}
            <PrintIcon />
          </span>
        </button>
        <div
          className={`${styles.printDropdownContent} ${
            viewPrintDropDown && styles.show
          }`}
        >
          {printDropdownOptions.map(el => (
            <div className={styles.printDropdownElementWrapper}>
              <button type="button" className={styles.printDropdownElement} onClick={()=>{
                setImagesPrRow(el)
                setPrintClicked(true)
                setViewPrintDropDown(false)
              }}>
                {el}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.printWordsWrapper}>
        <PrintWords
          ref={printRef}
          topicIds={topicIds}
          showWrittenWords={showWrittenWords}
          imagesPrRow={imagesPrRow}
        />
      </div>
    </>
  );
};
