import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language } from "../../../../common/types/types";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";

export type LanguageSelectorProps = {
  languages: Language[] | undefined;
  currentLanguageCode: string;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
  isMobile: boolean | null;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  favLanguages,
  currentLanguageCode,
  handleToggleFavoriteLanguage,
  isMobile,
}) => {
  const getAmountOfRows = (): number => {
    if (isMobile) {
      return Math.max(1, Math.ceil(languages ? languages.length : 0));
    }
    return Math.max(1, Math.ceil(languages ? languages.length / 2 : 0));
  };

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
            favLanguages={favLanguages}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
            currentLanguageCode={currentLanguageCode}
          />
        ))}
      </div>
    </div>
  );
};
