import { FC, FocusEvent, useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useReactToPrint } from "react-to-print";
import {
  LanguageMenuArrowIcon,
  PrintIcon,
} from "common/components/Icons/Icons";
import { useL10ns } from "../../hooks/useL10n";
import { PrintWords } from "../PrintWords/PrintWords";
import styles from "./PrintButton.module.scss";

type PrintProps = {
  showWrittenWords: boolean;
  showTopicImageView: boolean;
  isWordView: boolean;
  showArticles: boolean;
};

export const PrintButton: FC<PrintProps> = ({
  showWrittenWords,
  isWordView,
  showTopicImageView,
  showArticles,
}) => {
  const [imagesPrRow, setImagesPrRow] = useState(3);
  const [printClicked, setPrintClicked] = useState(false);
  const [viewPrintDropDown, setViewPrintDropDown] = useState(false);
  const [renderPrintWords, setRenderPrintWords] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleOnClickOutside = (): void => {
    setViewPrintDropDown(false);
    setIsActive(false);
  };

  const handleOnBlur = (e: FocusEvent<HTMLElement, Element>): void => {
    const { currentTarget } = e;

    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setViewPrintDropDown(false);
        setIsActive(false);
      }
    });
  };

  const dropdownRef = useDetectClickOutside({
    onTriggered: handleOnClickOutside,
  });
  const printRef = useRef(null);

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

  useEffect(() => {
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
      <div
        className={styles.printDropdown}
        ref={dropdownRef}
        onBlur={e => handleOnBlur(e)}
      >
        <button
          type="button"
          aria-label={printLabel}
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
            <span className={styles.printIcon} aria-hidden="true">
              <PrintIcon />
            </span>
            {printLabel && <span>{printLabel}</span>}
            {(!showTopicImageView || !isWordView) && (
              <span className={styles.arrowIcon} aria-hidden="true">
                <LanguageMenuArrowIcon
                  transform={
                    viewPrintDropDown ? "scale(0.9) rotate(180)" : "scale(0.9)"
                  }
                  transformOrigin="50% 50%"
                />
              </span>
            )}
          </span>
        </button>
        <div
          className={`${styles.printDropdownContent} ${
            viewPrintDropDown ? styles.show : ""
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
            showWrittenWords={showWrittenWords}
            imagesPrRow={imagesPrRow}
            showArticles={showArticles}
          />
        </div>
      )}
    </>
  );
};
