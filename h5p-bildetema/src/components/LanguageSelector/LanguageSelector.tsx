import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language } from "../../../../common/types/types";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";

type LanguageSelectorProps = {
  languages: Language[] | undefined;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  favLanguages,
  handleToggleFavoriteLanguage,
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
            favLanguages={favLanguages}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
          />
        ))}
      </div>
    </div>
  );
};
