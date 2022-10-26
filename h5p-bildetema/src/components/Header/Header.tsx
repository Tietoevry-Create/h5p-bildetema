/* eslint-disable jsx-a11y/no-redundant-roles */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
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
  favLanguages: Language[];
  firstTime: boolean;
  setFirstTime: Dispatch<SetStateAction<boolean>>;
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  favLanguages,
  topicIds,
  firstTime,
  setFirstTime,
  handleToggleFavoriteLanguage,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
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
  const navAriaLabel = "Favorite languages"; // TODO: translate

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
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
    if (firstTime === true) {
      setLangSelectorIsShown(true);
      setFirstTime(false);
    } else {
      setLangSelectorIsShown(false);
    }
  }, [pathname]);

  // TODO: Add better method to find screen width
  const handleIsMobile = useCallback((): void => {
    const mobileWidth = 768;
    const deviceWidth = headerRef.current?.clientWidth;

    if (!isMobile && deviceWidth && deviceWidth < mobileWidth) {
      setIsMobile(true);
    }
    if (isMobile && deviceWidth && deviceWidth > mobileWidth) {
      setIsMobile(false);
    }
  }, [headerRef, isMobile]);

  useEffect(() => {
    // handle isMobile when page has loaded
    if (isMobile === null) {
      handleIsMobile();
    }
  });

  useEffect(() => {
    // handle isMobile when window size changes
    requestAnimationFrame(() => {
      window.addEventListener("resize", handleIsMobile);
    });
    return () => {
      window.removeEventListener("resize", handleIsMobile);
    };
  }, [handleIsMobile]);

  return (
    <div ref={headerRef} className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.logo_oslomet}>
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
        <div className={styles.language_container}>
          <nav aria-label={navAriaLabel}>
            <ul role="list" className={styles.languages}>
              {favLanguages.map(language => {
                return (
                  <li role="listitem" key={language.code}>
                    <Link
                      to={getLanguagePath(
                        language,
                        topicIds,
                        search,
                        topicsFromDB,
                      )}
                      className={`${styles.languageButton} ${
                        currentLanguageCode === language.code
                          ? styles.languageButton_active
                          : ""
                      }`}
                    >
                      {langs[`lang_${language.code}`]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
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
            firstTime={firstTime}
          />
        </div>
      </div>
    </div>
  );
};
