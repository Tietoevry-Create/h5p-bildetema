import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useReactToPrint } from "react-to-print";
import { TopicIds } from "../../../../common/types/types";
import { useTranslation } from "../../hooks/useTranslation";
import { LanguageMenuArrowIcon, PrintIcon } from "../Icons/Icons";
import { PrintWords } from "../PrintWords/PrintWords";
import styles from "./PrintButton.module.scss";

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
  const { t } = useTranslation();

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
            <span>{t("printLabel")}</span>
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
                {`${el} ${t("printImgLabel")}`}
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
