import React from "react";
import { useContentId } from "use-h5p";
import { Link, useParams } from "react-router-dom";
import {
  TopicGridSizes,
  Language,
  Topic,
  UserData,
} from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "..";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import type {TopicIds} from "../Bildetema/Bildetest";
import styles from "./Header.module.scss";

export type HeaderProps = {
  // currentLanguage: Language;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  // changeCurrentLanguage: (newLanguage: Language) => void;
  languagesFromDB: Language[] | undefined;
  // userData: UserData;
  // setUserData: (updatedUserData: UserData) => void;
  topicsFromDB?: Topic[],
  topicIds: TopicIds
  favLanguages: Language[];
  setFavLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
};


export const Header: React.FC<HeaderProps> = ({
  // currentLanguage,
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
  // changeCurrentLanguage,
  languagesFromDB,
  // userData,
  // setUserData,
  favLanguages,
  setFavLanguages,
  topicIds:{topicId, subTopicId},
  topicsFromDB,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;
  const translations = useL10ns(...languageKeys, "selectLanguage");
  
  const toggleLabel = useL10n("showWrittenWordsLabel");
  
  const contentId = useContentId();
  
  const [langSelectorIsShown, setLangSelectorIsShown] =
  React.useState<boolean>(false);
  
  const labelToUrlComponent = (
    label: string,
  ): string | undefined => {
    return label?.toLowerCase().split(" ").join("-");
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

  const getLanguagePath = (language: Language):string => {
    console.log(topicsFromDB)
    if(!topicId) return `/${language.code}`
    
    const topic = topicsFromDB?.find(el => el.id === topicId)
    const topicWord = topic?.labelTranslations.get(language.code)
    if(!topicWord) return `/${language.code}`
    
    const topicPath = topicWord.label !== "" ? labelToUrlComponent(topicWord.label) : labelToUrlComponent(topicWord.id)
    if(!subTopicId) return `/${language.code}/${topicPath}`

  const titleLabel = "Bildetema"; /* TODO: translate */
  const subTitleLabel = "Flerspråklig bildeordbok"; /* TODO: translate */

    const subTopicWord = topic?.subTopics.get(subTopicId)?.labelTranslations.get(language.code)
    if(!subTopicWord) return `/${language.code}/${topicPath}`
    const subTopicPath = subTopicWord.label !== "" ? labelToUrlComponent(subTopicWord.label) : labelToUrlComponent(subTopicWord.id)
    return `/${language.code}/${topicPath}/${subTopicPath}`
  }

  // const handleChangeLanguage = (newLanguage: Language): void => {
  //   changeCurrentLanguage(newLanguage);
  //   setUserData({ ...userData, currentLanguage: newLanguage });
  // };
  const handleChangeLanguage = (newLanguage: Language): void => {
    console.log(newLanguage);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <OsloMetLogo />
          {/* TODO: Add Bildetema logo when ready */}
          <div className={styles.logo_labels}>
            <span className={styles.logo_labels_title}>{titleLabel}</span>
            <span>{subTitleLabel}</span>
          </div>
        </div>
        <div className={styles.language_container}>
          <div className={styles.languages}>
            {favLanguages.map(language => {
              return (
                <Link key={language.code} to={getLanguagePath(language)} className={`${styles.languageButton}`}>
                  {translations[`lang_${language.code as AllowedLanguage}`]}
                </Link>
                // <button
                //   key={language.code}
                //   // onClick={() => handleChangeLanguage(language)}
                //   onClick={() => console.log(language.code)}
                //   className={`${styles.languageButton}`}
                //   // className={`${styles.languageButton} ${
                //   //   language.code === currentLanguage.code ? styles.active : ""
                //   // }`}
                //   type="button"
                // >
                //   {translations[`lang_${language.code as AllowedLanguage}`]}
                // </button>
              );
            })}
          </div>
          <LanguageDropdown
            handleSelectorVisibility={setLangSelectorIsShown}
            langSelectorIsShown={langSelectorIsShown}
            languagesFromDB={languagesFromDB}
            selectLanguageLabel={translations.selectLanguage}
            // userData={userData}
            // setUserData={setUserData}
            favLanguages={favLanguages}
            setFavLanguages={setFavLanguages}
            handleChangeLanguage={handleChangeLanguage}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode="nob" />
        {renderLeftMenu()}
      </div>
    </div>
  );
};
