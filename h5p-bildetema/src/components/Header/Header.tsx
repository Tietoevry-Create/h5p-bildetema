import { BookmarkIcon, SearchIcon } from "common/components/Icons/Icons";
import { languages } from "common/constants/languages";
import { STATIC_PATH } from "common/constants/paths";
import { LanguageCodeString } from "common/types/LanguageCode";
import { CurrentTopics, Language } from "common/types/types";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { environment, useEnvironment } from "../../hooks/useEnvironment";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import HeaderLink from "../HeaderLink/HeaderLink";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { OsloMetLogo } from "../Logos/Logos";
import styles from "./Header.module.scss";

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
  const env = useEnvironment();
  const headerRef = useRef<HTMLDivElement>(null);
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<LanguageCodeString>;

  const {
    selectLanguage,
    headerTitle,
    headerSubtitle,
    myCollections,
    search: l10nsSearch,
  } = useL10ns(
    "selectLanguage",
    "headerTitle",
    "headerSubtitle",
    "myCollections",
    "search",
    ...languageKeys,
  );

  const shouldIncludeSearch = env !== environment.prod;

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [langSelectorIsShown, setLangSelectorIsShown] = useState(false);
  const { pathname, search } = useLocation();

  const currentLanguageCode = useCurrentLanguageCode();

  const titleLabel = headerTitle;
  const subTitleLabel = headerSubtitle;
  const HomeLinkPath = `/${currentLanguageCode}`;
  const osloMetLogoAria = useL10n("headerOsloMetlogoAriaLabel");

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (firstTime === true) {
      setLangSelectorIsShown(true);
      setFirstTime(false);
    } else {
      setLangSelectorIsShown(false);
    }
  }, [pathname]);

  // TODO: Add better method to find screen width
  // biome-ignore lint/correctness/useExhaustiveDependencies:
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
    <div
      ref={headerRef}
      className={`${styles.header} ${
        hideLanguageSelectors
          ? styles.langFavoritesHidden
          : styles.langFavoritesVisible
      }`}
    >
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
        <div className={styles.nav_container}>
          {!hideLanguageSelectors && (
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
          )}

          {shouldIncludeSearch && (
            <HeaderLink
              icon={<SearchIcon />}
              label={l10nsSearch}
              href={`${STATIC_PATH.SEARCH}?lang=${currentLanguageCode}`}
            />
          )}

          <HeaderLink
            label={myCollections}
            icon={<BookmarkIcon />}
            href={`${STATIC_PATH.COLLECTIONS}?lang=${currentLanguageCode}`}
          />
        </div>
      </div>
    </div>
  );
};
