import React from "react";
import { Link } from "react-router-dom";
import { languagesOriginal } from "../../../../common/constants/languages";
import { Language } from "../../../../common/types/types";
import { useTranslation } from "../../hooks/useTranslation";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./LanguageSelectorElement.module.scss";

type LanguageSelectorElement = {
  path: string;
  language: Language;
  currentLanguageCode: string;
  middleElement: boolean;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const LanguageSelectorElement: React.FC<LanguageSelectorElement> = ({
  path,
  language,
  currentLanguageCode,
  middleElement,
  favLanguages,
  handleToggleFavoriteLanguage,
}) => {
  const { t } = useTranslation();

  const isChecked = !!favLanguages.find(
    favLang => favLang.code === language.code,
  );

  // Disable if currentLanguage.
  // Disable if it is the last element in favLanguages. This occurs when the currentLangaugeCode does not exist, for instance if the user tries to change the language code in the URL themselves.
  const isDisabled =
    currentLanguageCode === language.code ||
    (isChecked && favLanguages.length < 2);

  const toggleFavorite = (): void => {
    handleToggleFavoriteLanguage(language, !isChecked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li
      role="listitem"
      className={`${middleElement ? styles.languageMiddle : styles.language} ${
        isDisabled ? styles.disabled : ""
      }`}
    >
      <span className={styles.checkboxWrapper}>
        <Checkbox
          id={language.code}
          checked={isChecked}
          disabled={isDisabled}
          handleChange={() => {
            toggleFavorite();
          }}
        />
      </span>
      <Link
        className={styles.languageLabel}
        to={path}
        tabIndex={isDisabled ? -1 : 0}
      >
        <span>{t(`lang_${language.code}`)}</span>
        <span>{languagesOriginal[language.code]}</span>
      </Link>
    </li>
  );
};
