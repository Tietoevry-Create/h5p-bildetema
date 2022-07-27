import React from "react";
import { useContentId } from "use-h5p";
import {
  TopicGridSizes,
  Language,
  UserData,
} from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "..";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";

export type HeaderProps = {
  currentLanguage: Language;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  changeCurrentLanguage: (newLanguage: Language) => void;
  languagesFromDB: Language[] | undefined;
  userData: UserData;
  setUserData: (updatedUserData: UserData) => void;
  favLanguages: Language[];
  setFavLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
};

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
  changeCurrentLanguage,
  languagesFromDB,
  userData,
  setUserData,
  favLanguages,
  setFavLanguages,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const translations = useL10ns(...languageKeys, "selectLanguage");

  const toggleLabel = useL10n("showWrittenWordsLabel");

  const contentId = useContentId();

  const [langSelectorIsShown, setLangSelectorIsShown] =
    React.useState<boolean>(false);

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
            {favLanguages.map(language => {
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
            handleSelectorVisibility={setLangSelectorIsShown}
            langSelectorIsShown={langSelectorIsShown}
            languagesFromDB={languagesFromDB}
            selectLanguageLabel={translations.selectLanguage}
            userData={userData}
            setUserData={setUserData}
            favLanguages={favLanguages}
            setFavLanguages={setFavLanguages}
            handleChangeLanguage={handleChangeLanguage}
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
