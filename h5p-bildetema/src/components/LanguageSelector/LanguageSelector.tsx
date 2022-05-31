import React from "react";
import styles from "./LanguageSelector.module.scss";
import type { Language as LanguageType } from "../../../../common/types/types";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language } from "..";

type LanguageSelectorProps = {
  languages: LanguageType[];
  handleChange: (isFavorite: boolean, languageCode: LanguageCode) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  handleChange,
}) => {
  return (
    <div className={styles.languageSelector}>
      {languages.map(language => (
        <Language
          key={language.code}
          handleChange={handleChange}
          language={language}
        />
      ))}
    </div>
  );
};
