import React from "react";
import { useContentId } from "use-h5p";
import { TopicGridSizes, Language } from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "..";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";
import { useUserData } from "../../hooks/useUserData";

export type HeaderProps = {
  currentLanguage: Language;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  selectedLanguages: Language[];
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  changeCurrentLanguage: (newLanguage: Language) => void;
  languagesFromDB: Language[] | undefined;
};

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  topicsSize,
  setTopicsSize,
  selectedLanguages,
  isWordView,
  toggleChecked,
  handleToggleChange,
  changeCurrentLanguage,
  languagesFromDB,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const translations = useL10ns(...languageKeys, "selectLanguage");

  const toggleLabel = useL10n("showWrittenWordsLabel");

  const contentId = useContentId();

  const [userData, setUserData] = useUserData();

  const [langSelectorIsShown, setLangSelectorIsShown] =
    React.useState<boolean>();

  const handleSelectorVisibility = (): void => {
    setLangSelectorIsShown(!langSelectorIsShown);
  };

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      <span className={styles.toggle}>
        <Toggle
          label={toggleLabel}
          checked={toggleChecked}
          handleChange={handleToggleChange}
          id={`toggle-${contentId}`}
        />
      </span>
    ) : (
      <TopicSizeButtons topicsSize={topicsSize} setTopicsSize={setTopicsSize} />
    );

    return element;
  };

  const handleChangeLanguage = (newLanguage: Language): void => {
    changeCurrentLanguage(newLanguage);
    setUserData({ ...userData, currentLanguage: newLanguage });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>{/* TODO: Add logo as SVG */}</div>
        <div className={styles.language_container}>
          <div className={styles.languages}>
            {selectedLanguages.map(language => {
              return (
                <button
                  key={language.code}
                  onClick={() => handleChangeLanguage(language)}
                  className={`${styles.languageButton} ${
                    language.code === currentLanguage.code ? styles.active : ""
                  }`}
                  type="button"
                >
                  {translations[`lang_${language.code as AllowedLanguage}`]}
                </button>
              );
            })}
          </div>
          <LanguageDropdown
            handleSelectorVisibility={handleSelectorVisibility}
            langSelectorIsShown={langSelectorIsShown}
            languagesFromDB={languagesFromDB}
            selectLanguageLabel={translations.selectLanguage}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode={currentLanguage.code} />
        {renderLeftMenu()}
      </div>
    </div>
  );
};
