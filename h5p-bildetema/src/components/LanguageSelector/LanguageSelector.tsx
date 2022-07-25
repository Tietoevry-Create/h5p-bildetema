import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language } from "../../../../common/types/types";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";

type LanguageSelectorProps = {
  languages: Language[] | undefined;
  handleChange: (isFavorite: boolean, languageCode: LanguageCode) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  handleChange,
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
            handleChange={handleChange}
            language={language}
            middleElement={index === Math.max(1, getAmountOfRows() - 1)}
          />
        ))}
      </div>
    </div>
  );
};
