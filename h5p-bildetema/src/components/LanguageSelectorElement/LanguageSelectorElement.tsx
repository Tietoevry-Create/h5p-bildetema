import React from "react";
import { useL10ns } from "use-h5p";
import { Language, UserData } from "../../../../common/types/types";
import { defaultFavouriteLanguages } from "../Bildetema/Bildetema";
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

  const handleChange = (): void => {
    const userDataSnapshot = userData;

    if (
      userDataSnapshot.favouriteLanguages.find(
        favLang => favLang.code === language.code,
      )
    ) {
      userDataSnapshot.favouriteLanguages =
        userDataSnapshot.favouriteLanguages.filter(
          favLang => favLang.code !== language.code,
        );
      setIsChecked(false);
    } else {
      userDataSnapshot.favouriteLanguages.push(language);
    }

    if (!userDataSnapshot.favouriteLanguages.length) {
      userDataSnapshot.favouriteLanguages = defaultFavouriteLanguages;
    }

    setFavLanguages(userDataSnapshot.favouriteLanguages);
    setUserData(userDataSnapshot);

    if (
      !userDataSnapshot.favouriteLanguages.find(
        favLang => favLang.code === userDataSnapshot.currentLanguage.code,
      )
    ) {
      handleChangeLanguage(userDataSnapshot.favouriteLanguages[0]);
    }
  };

  React.useEffect(() => {
    if (
      userData.favouriteLanguages.find(
        favLang => favLang.code === language.code,
      )
    ) {
      setIsChecked(true);
    }
  }, [language.code, userData.favouriteLanguages]);

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
