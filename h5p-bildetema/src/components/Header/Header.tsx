import React from "react";
import { TopicGridSizes } from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10ns } from "../../hooks/useL10n";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import styles from "./Header.module.scss";

export type HeaderProps = {
  currentLanguageCode: string;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
};

export const Header: React.FC<HeaderProps> = ({
  currentLanguageCode,
  topicsSize,
  setTopicsSize,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const selectedLanguages: Array<AllowedLanguage> = useUserData();
  const translations = useL10ns(...languageKeys, "selectLanguage");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>{/* TODO: Add logo as SVG */}</div>
        <div className={styles.language_container}>
          <div>{translations.selectLanguage}</div>
          <div className={styles.languages}>
            {selectedLanguages.map(language => (
              <button type="button" onClick={() => setActiveLanguage(language)}>
                {translations[`lang_${language}`]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode={currentLanguageCode} />
        <TopicSizeButtons
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
        />
      </div>
    </div>
  );
};
