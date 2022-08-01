import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language, UserData } from "../../../../common/types/types";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";

type LanguageSelectorProps = {
  languages: Language[] | undefined;
  userData: UserData;
  setUserData: (updatedUserData: UserData) => void;
  favLanguages: Language[];
  setFavLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
  handleChangeLanguage: (newLanguage: Language) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  userData,
  setUserData,
  favLanguages,
  setFavLanguages,
  handleChangeLanguage,
}) => {
  const getAmountOfRows = (): number =>
    Math.max(1, Math.ceil(languages ? languages.length / 2 : 0));

  return (
    <div className={styles.languageSelectorWrapper}>
      <div
        className={styles.languageSelector}
        style={{
          gridTemplateRows: `repeat(${getAmountOfRows()}, 3rem)`,
          columnGap: "2rem",
        }}
      >
        {languages?.map((language, index) => (
          <LanguageSelectorElement
            key={language.code}
            language={language}
            middleElement={index === Math.max(1, getAmountOfRows() - 1)}
            userData={userData}
            setUserData={setUserData}
            favLanguages={favLanguages}
            setFavLanguages={setFavLanguages}
            handleChangeLanguage={handleChangeLanguage}
          />
        ))}
      </div>
    </div>
  );
};
