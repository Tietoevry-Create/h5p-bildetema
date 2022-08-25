import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import {
  Language,
  TopicGridSizes,
  TopicIds,
} from "../../../../common/types/types";
import { getLanguages, getTopics } from "../../../../common/utils/data.utils";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageFavorites } from "../LanguageFavorites/LanguageFavorites";
import { RouteController } from "../RouteController/RouteController";
import { SubHeader } from "../SubHeader/SubHeader";
import styles from "./Bildetema.module.scss";

export const defaultFavoriteLanguages: Language[] = [
  {
    label: "Norsk (Bokmål)",
    code: "nob",
    rtl: false,
  },
];

export const Bildetema: React.FC = () => {
  const { isLoading: isLoadingLanguages, data: languagesFromDB } = useQuery(
    ["languagesFromDB"],
    getLanguages,
  );
  const { isLoading: isLoadingTopics, data: topicsFromDB } = useQuery(
    ["topicsFromDB"],
    getTopics,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const wordsVisibleParam = "showWrittenWords";
  const loadingLabel = useL10n("pageIsLoading");
  const pageTitle = useL10n("headerTitle");
  const [topicIds, setTopicIds] = useState<TopicIds>({});

  const [topicsSize, setTopicsSize] = useState(TopicGridSizes.Big);
  const [isWordView, setIsWordView] = useState(false);
  const [showWrittenWords, setShowWrittenWords] = useState(
    searchParams.get(wordsVisibleParam) !== null
      ? searchParams.get(wordsVisibleParam) === "true"
      : true,
  );
  const [userData, setUserData] = useUserData();
  const [favLanguages, setFavLanguages] = useState(userData.favoriteLanguages);

  if (!favLanguages.length) {
    userData.favoriteLanguages = defaultFavoriteLanguages;
    setUserData(userData);
    setFavLanguages(userData.favoriteLanguages);
  }
  const [routes, setRoutes] = useState<JSX.Element>();

  const handleToggleChange = (value: boolean): void => {
    setSearchParams(`${wordsVisibleParam}=${value}`);
    setShowWrittenWords(value);
  };

  const handleToggleFavoriteLanguage = (
    language: Language,
    favorite: boolean,
  ): void => {
    if (favorite) {
      setFavLanguages(languages => [...languages, language]);
      return;
    }
    setFavLanguages(languages =>
      languages.filter(lang => lang.code !== language.code),
    );
  };

  React.useEffect(() => {
    userData.favoriteLanguages = favLanguages;
    setUserData(userData);
  }, [favLanguages, userData, setUserData]);

  useEffect(() => {
    if (document.title !== pageTitle) {
      document.title = pageTitle;
    }
  });

  useEffect(() => {
    const paths = [
      "/:langId",
      "/:langId/:topicLabel",
      "/:langId/:topicLabel/:subTopicId",
    ];
    setRoutes(
      <Routes>
        {paths.map(path => (
          <Route
            key={path}
            path={path}
            element={
              <RouteController
                topicsFromDB={topicsFromDB}
                languagesFromDB={languagesFromDB}
                setIsWordView={setIsWordView}
                topicsSize={topicsSize}
                showWrittenWords={showWrittenWords}
                setTopicIds={setTopicIds}
                addFavoriteLanguage={handleToggleFavoriteLanguage}
                favLanguages={favLanguages}
              />
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/nob" />} />
      </Routes>,
    );
  }, [
    topicsFromDB,
    isLoadingTopics,
    languagesFromDB,
    showWrittenWords,
    topicsSize,
    favLanguages,
  ]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header
          topicIds={topicIds}
          languagesFromDB={languagesFromDB}
          favLanguages={favLanguages}
          topicsFromDB={topicsFromDB}
          handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
        />
        <LanguageFavorites
          topicIds={topicIds}
          favLanguages={favLanguages}
          topicsFromDB={topicsFromDB}
        />
        <SubHeader
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          handleToggleChange={handleToggleChange}
          toggleChecked={showWrittenWords}
        />
        <div className={styles.body}>
          {isLoadingTopics || isLoadingLanguages ? (
            <h1>{loadingLabel}</h1>
          ) : (
            routes
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
