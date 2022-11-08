import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Language,
  TopicGridSizes,
  TopicIds,
} from "../../../../common/types/types";
import { useL10n } from "../../hooks/useL10n";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { useUserData } from "../../hooks/useUserData";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageFavorites } from "../LanguageFavorites/LanguageFavorites";
import { RouteController } from "../RouteController/RouteController";
import { SubHeader } from "../SubHeader/SubHeader";
import styles from "./Bildetema.module.scss";
import { MainContentLink } from "../MainContentLink/MainContentLink";
import { LanguageCode } from "../../../../common/types/LanguageCode";

type BildetemaProps = {
  defaultLanguages: string[];
  isLoadingData: boolean;
};

enum SEARCHPARAMS {
  wordsVisible = "showWrittenWords",
  articlesVisible = "showArticles",
}

export const Bildetema: React.FC<BildetemaProps> = ({
  defaultLanguages,
  isLoadingData,
}) => {
  const { languages: languagesFromDB } = useDBContext() || {};
  const { pathname } = useLocation();

  const [showLoadingLabel, setShowLoadingLabel] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      if (isLoadingData) {
        setShowLoadingLabel(true);
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const loadingLabel = useL10n("pageIsLoading");
  const pageTitle = useL10n("headerTitle");
  const [topicIds, setTopicIds] = useState<TopicIds>({});
  const [firstTime, setFirstTime] = useState(false);

  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const [topicsSize, setTopicsSize] = useState(
    smallScreen ? TopicGridSizes.Compact : TopicGridSizes.Big,
  );
  const [isWordView, setIsWordView] = useState(false);
  const [showTopicImageView, setShowTopicImageView] = useState(true);

  const [userData, setUserData] = useUserData();
  const [favLanguages, setFavLanguages] = useState(userData.favoriteLanguages);

  const handleSearchParams = (search: SEARCHPARAMS, value: string): void => {
    const sParams = Object.values(SEARCHPARAMS)
      .filter(param => {
        if (param === search) return true;
        return searchParams.get(param);
      })
      .map(param => {
        if (param === search) {
          return `${param}=${value}`;
        }
        const currValue = searchParams.get(param);
        return `${param}=${currValue}`;
      })
      .join("&");
    setSearchParams(sParams);
  };

  const [showWrittenWords, setShowWrittenWords] = useState(
    searchParams.get(SEARCHPARAMS.wordsVisible) !== null
      ? searchParams.get(SEARCHPARAMS.wordsVisible) === "true"
      : true,
  );

  const [showArticles, setShowArticles] = useState(
    searchParams.get(SEARCHPARAMS.articlesVisible) !== null
      ? searchParams.get(SEARCHPARAMS.articlesVisible) === "true"
      : false,
  );

  if (!favLanguages.length && languagesFromDB) {
    const languages: Language[] = [];
    setFirstTime(true);
    defaultLanguages.forEach(code => {
      const lang = languagesFromDB.find(el => el.code === code);
      if (lang) languages.push(lang);
    });
    setFavLanguages([...languages]);
  }

  const directionRtl: boolean = React.useMemo(() => {
    const currentLanguageCode: LanguageCode =
      pathname.split("/").length >= 2
        ? (pathname.split("/")[1] as LanguageCode)
        : "nob";

    const currentLanguage: Language | undefined = favLanguages.find(
      language => language.code === currentLanguageCode,
    );

    return !!currentLanguage?.rtl;
  }, [favLanguages, pathname]);

  const handleToggleArticles = (value: boolean): void => {
    handleSearchParams(SEARCHPARAMS.articlesVisible, value.toString());
    setShowArticles(value);
  };

  const handleToggleChange = (value: boolean): void => {
    handleSearchParams(SEARCHPARAMS.wordsVisible, value.toString());
    setShowWrittenWords(value);
  };

  const handleToggleFavoriteLanguage = React.useCallback(
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

  React.useEffect(() => {
    userData.favoriteLanguages = favLanguages;
    setUserData(userData);
  }, [favLanguages, userData, setUserData]);

  useEffect(() => {
    if (document.title !== pageTitle) {
      document.title = pageTitle;
    }
  });

  const routes = React.useMemo(() => {
    const paths = [
      "/:langId",
      "/:langId/:topicLabel",
      "/:langId/:topicLabel/:subTopicId",
    ];

    const toggleShowTopicImageView = (value: boolean): void => {
      setShowTopicImageView(value);
    };

    return (
      <Routes>
        {paths.map(path => (
          <Route
            key={path}
            path={path}
            element={
              <RouteController
                setIsWordView={setIsWordView}
                topicsSize={topicsSize}
                showWrittenWords={showWrittenWords}
                setTopicIds={setTopicIds}
                addFavoriteLanguage={handleToggleFavoriteLanguage}
                favLanguages={favLanguages}
                showTopicImageView={showTopicImageView}
                toggleShowTopicImageView={toggleShowTopicImageView}
                showArticles={showArticles}
              />
            }
          />
        ))}
        <Route path="*" element={<Navigate to={`/${defaultLanguages[0]}`} />} />
      </Routes>
    );
  }, [
    defaultLanguages,
    favLanguages,
    handleToggleFavoriteLanguage,
    showWrittenWords,
    topicsSize,
    showTopicImageView,
    showArticles,
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
        />
        <LanguageFavorites topicIds={topicIds} favLanguages={favLanguages} />
        <SubHeader
          topicIds={topicIds}
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          handleToggleChange={handleToggleChange}
          toggleChecked={showWrittenWords}
          showTopicImageView={showTopicImageView}
          rtl={directionRtl}
          handleToggleArticles={handleToggleArticles}
          articlesToggleChecked={showArticles}
        />
        <div
          id="bildetemaMain"
          className={`${styles.body} ${directionRtl ? styles.rtl : ""}`}
          aria-label="Main content" // TODO: translate
        >
          {isLoadingData ? showLoadingLabel && <p>{loadingLabel}</p> : routes}
        </div>
        <Footer />
      </div>
    </div>
  );
};
