import { useNewDBContext } from "common/hooks/useNewDBContext";
import { CurrentTopics, Language } from "common/types/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { uriComponentToTopicPath } from "common/utils/router.utils";
import { LanguageCode } from "common/types/LanguageCode";
import { useMyCollections } from "common/hooks/useMyCollections";
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
import CustomViewPage from "../CustomViewPage/CustomViewPage";
import {
  useCurrentLanguage,
  useCurrentLanguageCode,
} from "../../hooks/useCurrentLanguage";

type BildetemaProps = {
  defaultLanguages: string[];
  isLoadingData: boolean;
};

const STATIC_PATHS = {
  SEARCH: "/sok",
  CUSTOM_VIEW: "/customview",
} as const;

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
      topicPaths?.get(uriComponentToTopicPath(topicUriComponent)) || "";
    const topic = idToWords?.get(topicId);

    const subTopicId =
      topicPaths?.get(uriComponentToTopicPath(subTopicUriComponent)) || "";
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
    if (pathname.includes(STATIC_PATHS.SEARCH)) return;

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
        <Route path="/sok" element={<SearchPage />} />
        <Route path="/my-collections/:collection" element={<CustomViewPage />} />
        <Route path="/my-collections" element={<CustomViewPage />} />
        <Route path="*" element={<Navigate to={`/${defaultLanguages[0]}`} />} />
      </Routes>
    ); 
  }, [currTopics, defaultLanguages, directionRtl]);

  const {myCollections, setMyCollections} = useMyCollections();

  return (
    <div className={styles.wrapper}>
      <MainContentLink />
      <div className={styles.container}>
        <Header
          favLanguages={favLanguages}
          firstTime={firstTime}
          setFirstTime={setFirstTime}
          handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
          hideLanguageSelectors={pathname === STATIC_PATHS.SEARCH}
          currentTopics={currTopics}
        />
        <LanguageFavorites
          currentTopics={currTopics}
          favLanguages={favLanguages}
          hidden={pathname === STATIC_PATHS.SEARCH}
        />
        <button type="button" onClick={() => setMyCollections(prev => [...prev, {title: `Test ${prev.length+1}`, wordsIds: ["T001", "T002", "T003"]}])}>
          add
        </button>
        <button type="button" onClick={() => setMyCollections(prev => prev.slice(0, -1))}>
          remove
        </button>
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
