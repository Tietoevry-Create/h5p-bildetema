import React from "react";
import { Language, UserData } from "../../../../common/types/types";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import styles from "./LanguageDropdown.module.scss";

type LanguageDropdownProps = {
  handleSelectorVisibility: () => void;
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
