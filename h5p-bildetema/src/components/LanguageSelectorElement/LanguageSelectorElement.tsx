import React from "react";
import { useL10ns } from "use-h5p";
import { Language } from "../../../../common/types/types";
import { languages, languagesOriginal } from "../../constants/languages";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import styles from "./LanguageSelectorElement.module.scss";

type LanguageSelectorElement = {
  language: Language;
  middleElement: boolean;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const LanguageSelectorElement: React.FC<LanguageSelectorElement> = ({
  language,
  middleElement,
  favLanguages,
  handleToggleFavoriteLanguage,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const translations = useL10ns(...languageKeys, "selectLanguage");

  const [isChecked, setIsChecked] = React.useState(
    !!favLanguages.find(favLang => favLang.code === language.code),
  );

  const toggleFavorite = (): void => {
    setIsChecked(prev => {
      handleToggleFavoriteLanguage(language, !prev);
      return !prev;
    });
  };

  return (
    <button
      className={`${middleElement ? styles.languageMiddle : styles.language}`}
      type="button"
      onClick={toggleFavorite}
    >
      <div className={styles.checkboxContainer}>
        <label htmlFor={language.code} className={styles.checkbox}>
          <input
            className={styles.visuallyHidden}
            type="checkbox"
            checked={isChecked}
            id={language.code}
            tabIndex={-1}
            onChange={toggleFavorite}
          />
          <span className={styles.checkmark} />
        </label>
      </div>
      <div className={styles.languageLabel}>
        <span>{translations[`lang_${language.code as AllowedLanguage}`]}</span>
        <span>{languagesOriginal[language.code as AllowedLanguage]}</span>
      </div>
    </button>
  );
};
