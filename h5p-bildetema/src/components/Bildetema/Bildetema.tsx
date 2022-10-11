import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
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

type BildetemaProps = {
  defaultLanguages: string[];
  isLoadingData: boolean;
};

export const Bildetema: React.FC<BildetemaProps> = ({
  defaultLanguages,
  isLoadingData,
}) => {
  const { languages: languagesFromDB } = useDBContext() || {};

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
  const wordsVisibleParam = "showWrittenWords";
  const loadingLabel = useL10n("pageIsLoading");
  const pageTitle = useL10n("headerTitle");
  const [topicIds, setTopicIds] = useState<TopicIds>({});

  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const [topicsSize, setTopicsSize] = useState(
    smallScreen ? TopicGridSizes.Compact : TopicGridSizes.Big,
  );
  const [isWordView, setIsWordView] = useState(false);
  const [showTopicImageView, setShowTopicImageView] = useState(true);

  const [showWrittenWords, setShowWrittenWords] = useState(
    searchParams.get(wordsVisibleParam) !== null
      ? searchParams.get(wordsVisibleParam) === "true"
      : true,
  );
  const [userData, setUserData] = useUserData();
  const [favLanguages, setFavLanguages] = useState(userData.favoriteLanguages);

  if (!favLanguages.length && languagesFromDB) {
    const languages: Language[] = [];
    defaultLanguages.forEach(code => {
      const lang = languagesFromDB.find(el => el.code === code);
      if (lang) languages.push(lang);
    });
    setFavLanguages([...languages]);
  }

  const handleToggleChange = (value: boolean): void => {
    setSearchParams(`${wordsVisibleParam}=${value}`);
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
  ]);

  return (
    <div className={styles.wrapper}>
      <MainContentLink />
      <div className={styles.container}>
        <Header
          topicIds={topicIds}
          favLanguages={favLanguages}
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
        />
        <div id="bildetemaMain" className={styles.body}>
          {isLoadingData ? showLoadingLabel && <p>{loadingLabel}</p> : routes}
        </div>
        <Footer />
      </div>
    </div>
  );
};
