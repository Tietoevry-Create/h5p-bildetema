import CustomSuccessToastMessage from "common/components/ToastMessages/CustomSuccessToastMessage";
import { STATIC_PATH } from "common/constants/paths";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics, Language } from "common/types/types";
import { uriComponentToTopicPath } from "common/utils/router.utils";
import { SnackbarProvider } from "notistack";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  useCurrentLanguage,
  useCurrentLanguageCode,
} from "../../hooks/useCurrentLanguage";
import { environment, useEnvironment } from "../../hooks/useEnvironment";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
import { sanitizeLanguages } from "../../utils/language.utils";
import CollectionsController from "../CollectionsController/CollectionController";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageFavorites } from "../LanguageFavorites/LanguageFavorites";
import { MainContentLink } from "../MainContentLink/MainContentLink";
import SearchPage from "../SearchPage/SearchPage";
import { TopicRouteController } from "../TopicRouteController/TopicRouteController";
import styles from "./Bildetema.module.scss";

type BildetemaProps = {
  defaultLanguages: string[];
  isLoadingData: boolean;
};

export const Bildetema: FC<BildetemaProps> = ({
  defaultLanguages,
  isLoadingData,
}) => {
  const {
    languages: languagesFromDB,
    langCodeTolanguages,
    topicPaths,
    idToWords,
  } = useNewDBContext();
  const { pathname } = useLocation();
  const env = useEnvironment();
  const shouldIncludeSearch = env !== environment.prod;

  const [showLoadingLabel, setShowLoadingLabel] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoadingData) {
        setShowLoadingLabel(true);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const loadingLabel = useL10n("pageIsLoading");
  const pageTitle = useL10n("headerTitle");
  const mainContentAriaLabel = useL10n("mainContentAriaLabel");
  const [firstTime, setFirstTime] = useState(false);

  const [userData, setUserData] = useUserData();
  const [favLanguages, setFavLanguages] = useState(userData.favoriteLanguages);

  if (!favLanguages.length && langCodeTolanguages.size > 0 && !firstTime) {
    const languages: Language[] = [];
    setFirstTime(true);
    defaultLanguages.forEach(code => {
      const lang = langCodeTolanguages.get(code as LanguageCode);
      if (lang) languages.push(lang);
    });
    setFavLanguages([...languages]);
  }

  const currentLanguageCode = useCurrentLanguageCode();
  const currentLanguage = useCurrentLanguage();

  const directionRtl: boolean = useMemo(() => {
    return !!currentLanguage?.rtl;
  }, [currentLanguage]);

  const currTopics = useMemo((): CurrentTopics => {
    const [topicUriComponent, subTopicUriComponent] = pathname
      .split("/")
      .slice(2);

    const topicId =
      topicPaths?.get(
        `${uriComponentToTopicPath(topicUriComponent)}-${currentLanguageCode}`,
      ) || "";
    const topic = idToWords?.get(topicId);

    const subTopicId =
      topicPaths?.get(
        `${uriComponentToTopicPath(
          subTopicUriComponent,
        )}-${currentLanguageCode}`,
      ) || "";
    const subTopic = idToWords?.get(subTopicId);
    return { topic, subTopic };
  }, [currentLanguageCode, idToWords, pathname, topicPaths]);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  const handleToggleFavoriteLanguage = useCallback(
    (language: Language, favorite: boolean): void => {
      if (favorite) {
        // When favLanguages is 0 it means that this is the first visit, and favLanguages should be added from defaultLanguages.
        if (favLanguages.length === 0) return;
        setFavLanguages([...favLanguages, language]);
        return;
      }
      setFavLanguages(languages =>
        languages.filter(lang => lang.code !== language.code),
      );
    },
    [favLanguages, setFavLanguages],
  );

  // Set lang as favorite if it is not already
  useEffect(() => {
    // we dont want to set the language as favorite if we are on the search page
    if (pathname.includes(STATIC_PATH.SEARCH)) return;

    const languageIsAlreadyFavorited = favLanguages.find(
      el => currentLanguageCode === el.code,
    );
    const language = languagesFromDB?.find(
      el => el.code === currentLanguageCode,
    );

    if (!languageIsAlreadyFavorited && language) {
      handleToggleFavoriteLanguage(language, true);
    }
  }, [
    currentLanguageCode,
    favLanguages,
    handleToggleFavoriteLanguage,
    languagesFromDB,
    pathname,
  ]);

  useEffect(() => {
    userData.favoriteLanguages = sanitizeLanguages(
      favLanguages,
      languagesFromDB,
    );
    setUserData(userData);
  }, [favLanguages, userData, setUserData, languagesFromDB]);

  useEffect(() => {
    if (document.title !== pageTitle) {
      document.title = pageTitle;
    }
  });

  const routes = useMemo(() => {
    const paths = [
      "/:langCodeParam",
      "/:langCodeParam/:topicLabelParam",
      "/:langCodeParam/:topicLabelParam/:subTopicLabelParam",
    ];
    return (
      <Routes>
        {paths.map(path => (
          <Route
            key={path}
            path={path}
            element={
              <TopicRouteController
                rtl={directionRtl}
                currentTopics={currTopics}
              />
            }
          />
        ))}

        <>
          {shouldIncludeSearch && (
            <Route path={`${STATIC_PATH.SEARCH}`} element={<SearchPage />} />
          )}

          <Route
            path={`${STATIC_PATH.COLLECTIONS}`}
            element={<CollectionsController rtl={directionRtl} />}
          />
          <Route
            path={`${STATIC_PATH.COLLECTIONS}/:collection`}
            element={<CollectionsController rtl={directionRtl} />}
          />
        </>
        <Route path="*" element={<Navigate to={`/${defaultLanguages[0]}`} />} />
      </Routes>
    );
  }, [currTopics, defaultLanguages, directionRtl, shouldIncludeSearch]);

  const hidden = pathname.endsWith(STATIC_PATH.COLLECTIONS);

  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: isMobile ? "center" : "right",
        vertical: "top",
      }}
      Components={{
        success: CustomSuccessToastMessage,
      }}
    >
      <div className={styles.wrapper}>
        <MainContentLink />
        <div className={styles.container}>
          <Header
            favLanguages={favLanguages}
            firstTime={firstTime}
            setFirstTime={setFirstTime}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
            hideLanguageSelectors={hidden}
            currentTopics={currTopics}
          />
          <LanguageFavorites
            currentTopics={currTopics}
            favLanguages={favLanguages}
            hidden={hidden}
          />
          <div
            id="bildetemaMain"
            className={styles.bildetemaMain}
            aria-label={mainContentAriaLabel}
          >
            {isLoadingData
              ? showLoadingLabel && (
                  <p
                    className={`${styles.body} ${
                      directionRtl ? styles.rtl : ""
                    }`}
                  >
                    {loadingLabel}
                  </p>
                )
              : routes}
          </div>
          <Footer />
        </div>
      </div>
    </SnackbarProvider>
  );
};
