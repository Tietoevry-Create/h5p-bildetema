import { useNewDBContext } from "common/hooks/useNewDBContext";
import { CurrentTopics, Language } from "common/types/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { uriComponentToTopicPath } from "common/utils/router.utils";
import { LanguageCode } from "common/types/LanguageCode";
import { STATIC_PATH, STATIC_PATHS } from "common/constants/paths";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageFavorites } from "../LanguageFavorites/LanguageFavorites";
import { MainContentLink } from "../MainContentLink/MainContentLink";
import { TopicRouteController } from "../TopicRouteController/TopicRouteController";
import { sanitizeLanguages } from "../../utils/language.utils";
import styles from "./Bildetema.module.scss";
import SearchPage from "../SearchPage/SearchPage";
import CollectionsController from "../CollectionsController/CollectionController";
import {
  useCurrentLanguage,
  useCurrentLanguageCode,
} from "../../hooks/useCurrentLanguage";
import { environment, useEnvironment } from "../../hooks/useEnvironment";

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

  const [showLoadingLabel, setShowLoadingLabel] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isLoadingData) {
        setShowLoadingLabel(true);
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [idToWords, pathname, topicPaths]);

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
        {env !== environment.prod && (
          <>
            <Route path={`${STATIC_PATH.SEARCH}`} element={<SearchPage />} />
            <Route
              path={`${STATIC_PATH.COLLECTIONS}`}
              element={<CollectionsController rtl={directionRtl} />}
            />
            <Route
              path={`${STATIC_PATH.COLLECTIONS}/:collection`}
              element={<CollectionsController rtl={directionRtl} />}
            />
          </>
        )}
        <Route path="*" element={<Navigate to={`/${defaultLanguages[0]}`} />} />
      </Routes>
    );
  }, [currTopics, defaultLanguages, directionRtl, env]);

  const hidden = STATIC_PATHS.includes(pathname);

  return (
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
                  className={`${styles.body} ${directionRtl ? styles.rtl : ""}`}
                >
                  {loadingLabel}
                </p>
              )
            : routes}
        </div>
        <Footer />
      </div>
    </div>
  );
};
