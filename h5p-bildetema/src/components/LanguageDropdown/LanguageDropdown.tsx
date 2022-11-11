import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Language, TopicIds } from "../../../../common/types/types";
import { LanguageIcon, LanguageMenuArrowIcon } from "../Icons/Icons";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import styles from "./LanguageDropdown.module.scss";

export type LanguageDropdownProps = {
  handleSelectorVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  langSelectorIsShown: boolean | undefined;
  selectLanguageLabel: string;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
  currentLanguageCode: string;
  isMobile: boolean | null;
  search: string;
  topicIds: TopicIds;
  firstTime: boolean;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  handleSelectorVisibility,
  langSelectorIsShown,
  selectLanguageLabel,
  favLanguages,
  handleToggleFavoriteLanguage,
  currentLanguageCode,
  isMobile,
  search,
  firstTime,
  topicIds,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleOnClickOutside = (): void => {
    handleSelectorVisibility(false);
    setIsActive(false);
  };

  const dropdownRef = useDetectClickOutside({
    onTriggered: handleOnClickOutside,
  });

  const handleOnClick = (): void => {
    handleSelectorVisibility(prevState => !prevState);
    setIsActive(!isActive);
  };

  React.useEffect(() => {
    setIsActive(firstTime);
  }, [currentLanguageCode]);

  return (
    <div className={styles.languageMenuButtonWrapper} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleOnClick}
        className={
          isActive ? styles.languageMenuButtonActive : styles.languageMenuButton
        }
      >
        <span className={styles.languageIcon} aria-hidden="true">
          <LanguageIcon />
        </span>
        <span className={styles.languageLabel}>{selectLanguageLabel}</span>
        <span className={styles.arrowIcon} aria-hidden="true">
          <LanguageMenuArrowIcon
            transform={
              langSelectorIsShown ? "scale(0.9) rotate(180)" : "scale(0.9)"
            }
            transformOrigin="50% 50%"
          />
        </span>
      </button>
      {langSelectorIsShown && (
        <LanguageSelector
          topicIds={topicIds}
          search={search}
          currentLanguageCode={currentLanguageCode}
          favLanguages={favLanguages}
          handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
        />
      )}
    </div>
  );
};
