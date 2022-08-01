import React from "react";
import { useL10ns } from "use-h5p";
import { Language, UserData } from "../../../../common/types/types";
import { defaultFavoriteLanguages } from "../Bildetema/Bildetema";
import { languages, languagesOriginal } from "../../constants/languages";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import styles from "./LanguageSelectorElement.module.scss";

type LanguageSelectorElement = {
  language: Language;
  middleElement: boolean;
  userData: UserData;
  setUserData: (updatedUserData: UserData) => void;
  favLanguages: Language[];
  setFavLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
  handleChangeLanguage: (newLanguage: Language) => void;
};

export const LanguageSelectorElement: React.FC<LanguageSelectorElement> = ({
  language,
  middleElement,
  userData,
  setUserData,
  favLanguages,
  setFavLanguages,
  handleChangeLanguage,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const translations = useL10ns(...languageKeys, "selectLanguage");

  const [isChecked, setIsChecked] = React.useState(
    !!favLanguages.find(favLang => favLang.code === language.code),
  );

  const toggleFavorite = (): void => {
    const languageIsFavorite = userData.favoriteLanguages.find(
      favLang => favLang.code === language.code,
    );

    if (languageIsFavorite) {
      // eslint-disable-next-line no-param-reassign
      userData.favoriteLanguages = userData.favoriteLanguages.filter(
        favLang => favLang.code !== language.code,
      );
      setIsChecked(false);
    } else {
      userData.favoriteLanguages.push(language);
    }
  };

  const handleChange = (): void => {
    toggleFavorite();

    const userHasNoFavoriteLanguagesSet = !userData.favoriteLanguages.length;
    if (userHasNoFavoriteLanguagesSet) {
      // eslint-disable-next-line no-param-reassign
      userData.favoriteLanguages = defaultFavoriteLanguages;
    }

    setFavLanguages(userData.favoriteLanguages);
    setUserData(userData);

    const currentLanguageWasUnfavorited = !userData.favoriteLanguages.find(
      favLang => favLang.code === userData.currentLanguage.code,
    );
    if (currentLanguageWasUnfavorited) {
      handleChangeLanguage(userData.favoriteLanguages[0]);
    }
  };

  React.useEffect(() => {
    const languageIsFavorite = userData.favoriteLanguages.find(
      favLang => favLang.code === language.code,
    );
    if (languageIsFavorite) {
      setIsChecked(true);
    }
  }, [language.code, userData.favoriteLanguages]);

  return (
    <button
      className={`${middleElement ? styles.languageMiddle : styles.language}`}
      type="button"
      onClick={handleChange}
    >
      <div className={styles.checkboxContainer}>
        <label htmlFor={language.code} className={styles.checkbox}>
          <input
            className={styles.visuallyHidden}
            type="checkbox"
            checked={isChecked}
            id={language.code}
            tabIndex={-1}
            onChange={handleChange}
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
