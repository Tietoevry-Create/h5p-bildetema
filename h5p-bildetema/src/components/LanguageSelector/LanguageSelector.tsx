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
  const getAmountOfRows = (): number =>
    Math.max(1, Math.ceil(languages.length / 2));

  return (
    <div
      className={styles.languageSelector}
      style={{ gridTemplateRows: `repeat(${getAmountOfRows()}, 2rem)` }}
    >
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
