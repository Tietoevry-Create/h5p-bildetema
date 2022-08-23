import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { languages } from "../../../../common/constants/languages";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language, Topic, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useL10ns } from "../../hooks/useL10n";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import styles from "./Header.module.scss";

export type HeaderProps = {
  languagesFromDB: Language[] | undefined;
  topicsFromDB?: Topic[];
  topicIds: TopicIds;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  languagesFromDB,
  favLanguages,
  topicIds,
  topicsFromDB,
  handleToggleFavoriteLanguage,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${LanguageCode}`>;

  const { selectLanguage, headerTitle, headerSubtitle, ...langs } = useL10ns(
    "selectLanguage",
    "headerTitle",
    "headerSubtitle",
    ...languageKeys,
  );

  const [langSelectorIsShown, setLangSelectorIsShown] = useState(false);
  const { pathname, search } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  const titleLabel = headerTitle;
  const subTitleLabel = headerSubtitle;

  return (
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
                  to={getLanguagePath(language, topicIds, search, topicsFromDB)}
                  className={`${styles.languageButton} ${
                    currentLanguageCode === language.code
                      ? styles.languageButton_active
                      : ""
                  }`}
                >
                  {langs[`lang_${language.code}`]}
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
            currentLanguageCode={currentLanguageCode}
          />
        </div>
      </div>
    </div>
  );
};
