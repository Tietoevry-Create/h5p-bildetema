import React from "react";
import { useContentId } from "use-h5p";
import { Link, useLocation } from "react-router-dom";
import { labelToUrlComponent } from "../../../../common/utils/string.utils";
import {
  TopicGridSizes,
  Language,
  Topic,
} from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import { AllowedLanguage } from "../../types/AllowedLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "..";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import type { TopicIds } from "../Bildetema/Bildetema";
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
  const translations = useL10ns(...languageKeys, "selectLanguage");

  const toggleLabel = useL10n("showWrittenWordsLabel");

  const contentId = useContentId();

  const [langSelectorIsShown, setLangSelectorIsShown] =
    React.useState<boolean>(false);

  const { pathname, search } = useLocation();
  const currentLanguageCode =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "nob";

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

  const titleLabel = "Bildetema"; /* TODO: translate */
  const subTitleLabel = "Flerspråklig bildeordbok"; /* TODO: translate */

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
                <Link
                  key={language.code}
                  to={getLanguagePath(language)}
                  className={`${styles.languageButton}`}
                >
                  {translations[`lang_${language.code as AllowedLanguage}`]}
                </Link>
              );
            })}
          </div>
          <LanguageDropdown
            handleSelectorVisibility={setLangSelectorIsShown}
            langSelectorIsShown={langSelectorIsShown}
            languagesFromDB={languagesFromDB}
            selectLanguageLabel={translations.selectLanguage}
            favLanguages={favLanguages}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode={currentLanguageCode} />
        {renderLeftMenu()}
      </div>
    </div>
  );
};
