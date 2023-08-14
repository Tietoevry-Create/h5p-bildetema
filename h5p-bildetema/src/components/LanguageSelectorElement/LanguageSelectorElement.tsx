import {
  attributeLanguages,
  languagesOriginal,
} from "common/constants/languages";
import { Language } from "common/types/types";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useL10n } from "../../hooks/useL10n";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./LanguageSelectorElement.module.scss";

type LanguageSelectorElement = {
  path: string;
  language: Language;
  currentLanguageCode: string;
  bottomElementAt2Col: boolean;
  bottomElementAt3Col: boolean;
  favLanguages: Language[];
  translations: Record<string, string>;
  translatedLabel: string;
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const LanguageSelectorElement: FC<LanguageSelectorElement> = ({
  path,
  language,
  currentLanguageCode,
  bottomElementAt2Col,
  bottomElementAt3Col,
  favLanguages,
  translations,
  translatedLabel,
  handleToggleFavoriteLanguage,
}) => {
  const isChecked = !!favLanguages.find(
    favLang => favLang.code === language.code,
  );

  // Disable if currentLanguage.
  // Disable if it is the last element in favLanguages. This occurs when the currentLangaugeCode does not exist, for instance if the user tries to change the language code in the URL themselves.
  const isDisabled =
    currentLanguageCode === language.code ||
    (isChecked && favLanguages.length < 2);

  const languageAriaPart1 = useL10n("chooseFavoriteLanguageAriaLabelPart1");
  const languageAriaPart2 = useL10n("chooseFavoriteLanguageAriaLabelPart2");

  const checkboxLabel = `${languageAriaPart1} ${translations[
    `lang_${language.code}`
  ].toLocaleLowerCase()} ${languageAriaPart2}`;

  const toggleFavorite = (): void => {
    handleToggleFavoriteLanguage(language, !isChecked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li
      role="listitem"
      className={`${styles.language} ${
        bottomElementAt2Col ? styles.languageBottom2Col : ""
      } ${bottomElementAt3Col ? styles.languageBottom3Col : ""} ${
        isDisabled ? styles.disabled : ""
      }`}
    >
      <span className={styles.checkboxWrapper}>
        <Checkbox
          id={language.code}
          checked={isChecked}
          disabled={isDisabled}
          label={checkboxLabel}
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
        <span>{translatedLabel}</span>
        <span lang={attributeLanguages[language.code]}>
          {languagesOriginal[language.code]}
        </span>
      </Link>
    </li>
  );
};
