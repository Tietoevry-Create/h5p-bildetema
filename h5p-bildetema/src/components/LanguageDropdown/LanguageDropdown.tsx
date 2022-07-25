import React from "react";
import { Language } from "../../../../common/types/types";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import styles from "./LanguageDropdown.module.scss";

type LanguageDropdownProps = {
  handleSelectorVisibility: () => void;
  langSelectorIsShown: boolean | undefined;
  languagesFromDB: Language[] | undefined;
  selectLanguageLabel: string;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  handleSelectorVisibility,
  langSelectorIsShown,
  languagesFromDB,
  selectLanguageLabel,
}) => {
  return (
    <div className={styles.languageMenuButtonWrapper}>
      <button
        type="button"
        onClick={handleSelectorVisibility}
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
          handleChange={() => null}
          languages={languagesFromDB}
        />
      )}
    </div>
  );
};
