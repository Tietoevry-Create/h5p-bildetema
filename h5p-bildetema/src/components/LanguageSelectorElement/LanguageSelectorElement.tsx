import React from "react";
import { useL10ns } from "use-h5p";
import { Language } from "../../../../common/types/types";
import { languages, languagesOriginal } from "../../constants/languages";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import styles from "./LanguageSelectorElement.module.scss";

type LanguageSelectorElement = {
  language: Language;
  currentLanguageCode: string;
  middleElement: boolean;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const LanguageSelectorElement: React.FC<LanguageSelectorElement> = ({
  language,
  currentLanguageCode,
  middleElement,
  favLanguages,
  handleToggleFavoriteLanguage,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const isChecked = !!favLanguages.find(
    favLang => favLang.code === language.code,
  );

  // Disable if currentLanguage.
  // Disable if it is the last element in favLanguages. This occurs when the currentLangaugeCode does not exist.
  const isDisabled =
    currentLanguageCode === language.code ||
    (isChecked && favLanguages.length < 2);

  const translations = useL10ns(...languageKeys, "selectLanguage");

  const toggleFavorite = (): void => {
    handleToggleFavoriteLanguage(language, !isChecked);
  };

  return (
    <label
      htmlFor={language.code}
      className={`${middleElement ? styles.languageMiddle : styles.language} ${
        isDisabled ? styles.disabled : ""
      }`}
    >
      <div className={styles.checkboxContainer}>
        <div className={styles.checkbox}>
          <input
            className={styles.visuallyHidden}
            type="checkbox"
            defaultChecked={isChecked}
            id={language.code}
            onClick={toggleFavorite}
            disabled={isDisabled}
          />
          <span className={styles.checkmark} />
        </div>
      </div>
      <div className={styles.languageLabel}>
        <span>{translations[`lang_${language.code as AllowedLanguage}`]}</span>
        <span>{languagesOriginal[language.code as AllowedLanguage]}</span>
      </div>
    </label>
  );
};
