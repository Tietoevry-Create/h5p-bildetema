import React from "react";
import styles from "./LanguageSelector.module.scss";
import type {
  Language as LanguageType,
  LanguageCode,
} from "../../../../common/types/types";
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
        <div key={language.code} className={styles.language_select}>
          <Language handleChange={handleChange} language={language} />
        </div>
      ))}
    </div>
  );
};
