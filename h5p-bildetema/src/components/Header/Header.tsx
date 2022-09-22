import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { languages } from "../../../../common/constants/languages";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language, TopicIds } from "../../../../common/types/types";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useL10ns } from "../../hooks/useL10n";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import styles from "./Header.module.scss";

export type HeaderProps = {
  topicIds: TopicIds;
  isMobile: boolean | null;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  favLanguages,
  topicIds,
  isMobile,
  handleToggleFavoriteLanguage,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${LanguageCode}`>;

  const { topics: topicsFromDB } = useDBContext() || {};
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
  const HomeLinkPath = `/${currentLanguageCode}`;

  React.useEffect(() => {
    setLangSelectorIsShown(false);
  }, [pathname]);

  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.logos}>
          <div className={styles.logos_oslomet}>
            <OsloMetLogo />
          </div>
          {/* TODO: Add Bildetema logo when ready */}
          <Link
            key={HomeLinkPath}
            to={HomeLinkPath}
            className={styles.logo_labels}
          >
            <span className={styles.logo_labels_title}>{titleLabel}</span>
            <span className={styles.logo_labels_subtitle}>{subTitleLabel}</span>
          </Link>
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
            selectLanguageLabel={selectLanguage}
            favLanguages={favLanguages}
            topicIds={topicIds}
            search={search}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
            currentLanguageCode={currentLanguageCode}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};
