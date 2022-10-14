import React from "react";
import { useReactToPrint } from "react-to-print";
import { useDetectClickOutside } from "react-detect-click-outside";
import { PrintIcon, LanguageMenuArrowIcon } from "../Icons/Icons";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./PrintButton.module.scss";
import { TopicIds } from "../../../../common/types/types";
import { PrintWords } from "../PrintWords/PrintWords";

type PrintProps = {
  topicIds: TopicIds;
  showWrittenWords: boolean;
  showTopicImageView: boolean;
  isWordView: boolean;
};

export const PrintButton: React.FC<PrintProps> = ({
  topicIds,
  showWrittenWords,
  isWordView,
  showTopicImageView,
}) => {
  const [imagesPrRow, setImagesPrRow] = React.useState(3);
  const [printClicked, setPrintClicked] = React.useState(false);
  const [viewPrintDropDown, setViewPrintDropDown] = React.useState(false);
  const [renderPrintWords, setRenderPrintWords] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const handleOnClickOutside = (): void => {
    setViewPrintDropDown(false);
    setIsActive(false);
  };

  const dropdownRef = useDetectClickOutside({
    onTriggered: handleOnClickOutside,
  });
  const printRef = React.useRef(null);

  const { printLabel } = useL10ns("printLabel");
  const { printImgLabel } = useL10ns("printImgLabel");

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: "",
  });

  const handleDropDownClicked = (): void => {
    setViewPrintDropDown(prev => !prev);
    setRenderPrintWords(true);
    setIsActive(!isActive);
  };

  React.useEffect(() => {
    if (printClicked) {
      setPrintClicked(false);
      handlePrint();
      setRenderPrintWords(false);
      setIsActive(false);
    }
  }, [printClicked, setPrintClicked, handlePrint]);

  const printDropdownOptions = [2, 3, 4, 5, 6];

  return (
    <>
      <div className={styles.printDropdown} ref={dropdownRef}>
        <button
          type="button"
          className={`${
            isActive ? styles.printButtonActive : styles.printButton
          } ${
            !showTopicImageView || !isWordView ? styles.printGridButton : ""
          }`}
          onClick={() => {
            if (!showTopicImageView || !isWordView) {
              handleDropDownClicked();
              return;
            }
            window.print();
          }}
        >
          <span className={styles.printButtonWrapper}>
            <PrintIcon />
            {printLabel && <span>{printLabel}</span>}
            {(!showTopicImageView || !isWordView) &&
              (viewPrintDropDown ? (
                <LanguageMenuArrowIcon
                  transform="scale(0.9) rotate(180)"
                  transformOrigin="50% 50%"
                />
              ) : (
                <LanguageMenuArrowIcon
                  transform="scale(0.9)"
                  transformOrigin="50% 50%"
                />
              ))}
          </span>
        </button>
        <div
          className={`${styles.printDropdownContent} ${
            viewPrintDropDown && styles.show
          }`}
        >
          {printDropdownOptions.map(el => (
            <div key={el} className={styles.printDropdownElementWrapper}>
              <button
                type="button"
                className={styles.printDropdownElement}
                onClick={() => {
                  setImagesPrRow(el);
                  setPrintClicked(true);
                  setViewPrintDropDown(false);
                }}
              >
                {`${el} ${printImgLabel}`}
              </button>
            </div>
          ))}
        </div>
      </div>
      {renderPrintWords && (
        <div className={styles.printWordsWrapper}>
          <PrintWords
            ref={printRef}
            topicIds={topicIds}
            showWrittenWords={showWrittenWords}
            imagesPrRow={imagesPrRow}
            isWordView={isWordView}
          />
        </div>
      )}
    </>
  );
};
