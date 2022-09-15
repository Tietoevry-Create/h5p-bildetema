import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Language, TopicIds } from "../../../../common/types/types";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
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
  const dropdownRef = useDetectClickOutside({
    onTriggered: () => handleSelectorVisibility(false),
  });

  return (
    <div className={styles.languageMenuButtonWrapper} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => handleSelectorVisibility(prevState => !prevState)}
        className={styles.languageMenuButton}
      >
        {selectLanguageLabel}
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
