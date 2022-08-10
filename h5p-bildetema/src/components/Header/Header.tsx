import React, { useState } from "react";
import { useContentId } from "use-h5p";
import { Link, useLocation } from "react-router-dom";
import { labelToUrlComponent } from "../../../../common/utils/string.utils";
import {
  TopicGridSizes,
  Language,
  Topic,
  TopicIds,
} from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10ns } from "../../hooks/useL10n";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "../Toggle/Toggle";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import styles from "./Header.module.scss";

export type HeaderProps = {
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  languagesFromDB: Language[] | undefined;
  topicsFromDB?: Topic[];
  topicIds: TopicIds;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
  languagesFromDB,
  favLanguages,
  topicIds: { topicId, subTopicId },
  topicsFromDB,
  handleToggleFavoriteLanguage,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${AllowedLanguage}`>;

  const {
    selectLanguage,
    headerTitle,
    headerSubtitle,
    showWrittenWordsLabel,
    ...langs
  } = useL10ns(
    "selectLanguage",
    "headerTitle",
    "headerSubtitle",
    "showWrittenWordsLabel",
    ...languageKeys,
  );

  const contentId = useContentId();
  const [langSelectorIsShown, setLangSelectorIsShown] = useState(false);
  const { pathname, search } = useLocation();

  const currentLanguageCode =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "nob";

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      <span className={styles.toggle}>
        <Toggle
          label={showWrittenWordsLabel}
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

  const titleLabel = headerTitle;
  const subTitleLabel = headerSubtitle;

  const getLanguagePath = (language: Language): string => {
    if (!topicId) return `/${language.code}${search}`;

    const topic = topicsFromDB?.find(el => el.id === topicId);
    const topicWord = topic?.labelTranslations.get(language.code);
    if (!topicWord) return `/${language.code}${search}`;

    const topicPath =
      topicWord.label !== ""
        ? labelToUrlComponent(topicWord.label)
        : labelToUrlComponent(topicWord.id);
    if (!subTopicId) return `/${language.code}/${topicPath}${search}`;

    const subTopicWord = topic?.subTopics
      .get(subTopicId)
      ?.labelTranslations.get(language.code);
    if (!subTopicWord) return `/${language.code}/${topicPath}${search}`;
    const subTopicPath =
      subTopicWord.label !== ""
        ? labelToUrlComponent(subTopicWord.label)
        : labelToUrlComponent(subTopicWord.id);
    return `/${language.code}/${topicPath}/${subTopicPath}${search}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.logos}>
            <div className={styles.logos_oslomet}>
              <OsloMetLogo />
            </div>
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
                  <Link
                    key={language.code}
                    to={getLanguagePath(language)}
                    className={`${styles.languageButton}`}
                  >
                    {langs[`lang_${language.code as AllowedLanguage}`]}
                  </Link>
                );
              })}
            </div>
            <LanguageDropdown
              handleSelectorVisibility={setLangSelectorIsShown}
              langSelectorIsShown={langSelectorIsShown}
              languagesFromDB={languagesFromDB}
              selectLanguageLabel={selectLanguage}
              favLanguages={favLanguages}
              handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode={currentLanguageCode} />
        {renderLeftMenu()}
      </div>
    </div>
  );
};
