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

  return (
    <div className={styles.languageMenuButtonWrapper} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleOnClick}
        className={
          isActive ? styles.languageMenuButtonActive : styles.languageMenuButton
        }
      >
        <LanguageIcon />
        <span className={styles.languageLabel}>{selectLanguageLabel}</span>
        {langSelectorIsShown ? (
          <LanguageMenuArrowIcon
            transform="rotate(180)"
            transformOrigin="50% 50%"
          />
        ) : (
          <LanguageMenuArrowIcon />
        )}
      </button>
      {langSelectorIsShown && (
        <LanguageSelector
          topicIds={topicIds}
          search={search}
          currentLanguageCode={currentLanguageCode}
          favLanguages={favLanguages}
          handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};
