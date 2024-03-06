/* eslint-disable jsx-a11y/no-redundant-roles */
import { languages } from "common/constants/languages";
import { LanguageCodeString } from "common/types/LanguageCode";
import { CurrentTopics, Language } from "common/types/types";
import { getPath } from "common/utils/router.utils";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { Link, useLocation } from "react-router-dom";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import { sanitizeLanguages, translatedLabel } from "../../utils/language.utils";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import styles from "./Header.module.scss";
import HeaderLink from "../HeaderLink/HeaderLink";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";

export type HeaderProps = {
  favLanguages: Language[];
  firstTime: boolean;
  setFirstTime: Dispatch<SetStateAction<boolean>>;
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
  hideLanguageSelectors: boolean;
  currentTopics: CurrentTopics;
};

export const Header: FC<HeaderProps> = ({
  favLanguages,
  firstTime,
  setFirstTime,
  handleToggleFavoriteLanguage,
  hideLanguageSelectors,
  currentTopics,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<LanguageCodeString>;
  const { langCodeTolanguages: languagesFromDB } = useNewDBContext() || {};

  const { selectLanguage, headerTitle, headerSubtitle, ...langs } = useL10ns(
    "selectLanguage",
    "headerTitle",
    "headerSubtitle",
    ...languageKeys,
  );
  const navAriaLabel = useL10n("favoriteLanguagesAriaLabel");

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [langSelectorIsShown, setLangSelectorIsShown] = useState(false);
  const { pathname, search } = useLocation();

  const currentLanguageCode = useCurrentLanguageCode();

  const titleLabel = headerTitle;
  const subTitleLabel = headerSubtitle;
  const HomeLinkPath = `/${currentLanguageCode}`;
  const osloMetLogoAria = useL10n("headerOsloMetlogoAriaLabel");

  useEffect(() => {
    if (firstTime === true) {
      setLangSelectorIsShown(true);
      setFirstTime(false);
    } else {
      setLangSelectorIsShown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const sanitizedFavLanguages = sanitizeLanguages(
    favLanguages,
    Array.from(languagesFromDB?.values() || []),
  );

  return (
    <div ref={headerRef} className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.logo_oslomet}>
          <OsloMetLogo role="img" ariaLabel={osloMetLogoAria} />
        </div>
        <Link
          key={HomeLinkPath}
          to={HomeLinkPath}
          className={styles.logo_labels}
        >
          <span className={styles.logo_labels_title}>{titleLabel}</span>
          <span className={styles.logo_labels_subtitle}>{subTitleLabel}</span>
        </Link>
        <div
          className={
            hideLanguageSelectors ? styles.hidden : styles.nav_container
          }
        >
          <nav aria-label={navAriaLabel} className={styles.languages_nav}>
            <ul role="list" className={styles.languages}>
              {sanitizedFavLanguages
                .sort(
                  (a, b) =>
                    translatedLabel(a, langs)?.localeCompare(
                      translatedLabel(b, langs),
                    ),
                )
                .map(language => {
                  return (
                    <li
                      role="listitem"
                      key={language.code}
                      aria-current={
                        currentLanguageCode === language.code
                          ? "page"
                          : undefined
                      }
                    >
                      <Link
                        to={getPath({ language, search, currentTopics })}
                        className={`${styles.languageButton} ${
                          currentLanguageCode === language.code
                            ? styles.languageButton_active
                            : ""
                        }`}
                      >
                        {translatedLabel(language, langs)}
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
            search={search}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
            currentLanguageCode={currentLanguageCode}
            firstTime={firstTime}
            currentTopics={currentTopics}
          />

          <HeaderLink href={`/sok?lang=${currentLanguageCode}`} />
        </div>
      </div>
    </div>
  );
};
