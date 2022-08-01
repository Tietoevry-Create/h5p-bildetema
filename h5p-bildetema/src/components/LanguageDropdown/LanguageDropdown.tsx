import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Language, UserData } from "../../../../common/types/types";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import styles from "./LanguageDropdown.module.scss";

type LanguageDropdownProps = {
  handleSelectorVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  langSelectorIsShown: boolean | undefined;
  languagesFromDB: Language[] | undefined;
  selectLanguageLabel: string;
  userData: UserData;
  setUserData: (updatedUserData: UserData) => void;
  favLanguages: Language[];
  setFavLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
  handleChangeLanguage: (newLanguage: Language) => void;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  handleSelectorVisibility,
  langSelectorIsShown,
  languagesFromDB,
  selectLanguageLabel,
  userData,
  setUserData,
  favLanguages,
  setFavLanguages,
  handleChangeLanguage,
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
          languages={languagesFromDB}
          userData={userData}
          setUserData={setUserData}
          favLanguages={favLanguages}
          setFavLanguages={setFavLanguages}
          handleChangeLanguage={handleChangeLanguage}
        />
      )}
    </div>
  );
};
