import { useDBContext } from "common/hooks/useDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { Language, TopicIds } from "common/types/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageFavorites } from "../LanguageFavorites/LanguageFavorites";
import { MainContentLink } from "../MainContentLink/MainContentLink";
import { TopicRouteController } from "../TopicRouteController/TopicRouteController";
import { sanitizeLanguages } from "../../utils/language.utils";
import styles from "./Bildetema.module.scss";
import SearchView from "../SearchPage/SearchPage";

type BildetemaProps = {
  defaultLanguages: string[];
  isLoadingData: boolean;
};

export const Bildetema: FC<BildetemaProps> = ({
  defaultLanguages,
  isLoadingData,
}) => {
  const { languages: languagesFromDB } = useDBContext() || {};
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
  const [topicIds, setTopicIds] = useState<TopicIds>({});
  const [firstTime, setFirstTime] = useState(false);

  const [userData, setUserData] = useUserData();
  const [favLanguages, setFavLanguages] = useState(userData.favoriteLanguages);

  if (!favLanguages.length && languagesFromDB) {
    const languages: Language[] = [];
    setFirstTime(true);
    defaultLanguages.forEach(code => {
      const lang = languagesFromDB.find(el => el.code === code);
      if (lang) languages.push(lang);
    });
    setFavLanguages([...languages]);
  }

  const getCurrentLanguage = (): Language => {
    const currentLanguageCode: LanguageCode =
      pathname.split("/").length >= 2
        ? (pathname.split("/")[1] as LanguageCode)
        : "nob";

    const currentLanguage: Language | undefined = favLanguages.find(
      language => language.code === currentLanguageCode,
    );
    return currentLanguage as Language;
  };

  const directionRtl: boolean = useMemo(() => {
    return !!getCurrentLanguage()?.rtl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favLanguages, pathname]);

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

  const [isTopicRoute, setIsTopicRoute] = useState(true);

  const routes = useMemo(() => {
    const paths = [
      "/:langId",
      "/:langId/:topicLabel",
      "/:langId/:topicLabel/:subTopicId",
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
                topicIds={topicIds}
                setTopicIds={setTopicIds}
                addFavoriteLanguage={handleToggleFavoriteLanguage}
                favLanguages={favLanguages}
                setIsTopicRouteTrue={() => setIsTopicRoute(true)}
              />
            }
          />
        ))}
        <Route
          path="/sok"
          element={
            <SearchView setIsTopicRouteFalse={() => setIsTopicRoute(false)} />
          }
        />
        <Route path="*" element={<Navigate to={`/${defaultLanguages[0]}`} />} />
      </Routes>
    );
  }, [
    defaultLanguages,
    favLanguages,
    handleToggleFavoriteLanguage,
    topicIds,
    directionRtl,
  ]);

  return (
    <div className={styles.wrapper}>
      <MainContentLink />
      <div className={styles.container}>
        <Header
          topicIds={topicIds}
          favLanguages={favLanguages}
          firstTime={firstTime}
          setFirstTime={setFirstTime}
          handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
          hideLanguageSelectors={!isTopicRoute}
        />
        <LanguageFavorites
          topicIds={topicIds}
          favLanguages={favLanguages}
          hidden={!isTopicRoute}
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
