import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import {
  Language,
  TopicGridSizes,
  TopicIds,
} from "../../../../common/types/types";
import { getData } from "../../../../common/utils/data.utils";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { LanguageFavorites } from "../LanguageFavorites/LanguageFavorites";
import { RouteController } from "../RouteController/RouteController";
import { SubHeader } from "../SubHeader/SubHeader";
import styles from "./Bildetema.module.scss";

type BildetemaProps = {
  defaultLanguages: string[];
};

export const Bildetema: React.FC<BildetemaProps> = ({ defaultLanguages }) => {
  const { isLoading: isLoadingData, data } = useQuery(["dataFromDB"], getData);
  const [showLoadingLabel, setShowLoadingLabel] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowLoadingLabel(true);
    }, 300);
  }, []);

  const topicsFromDB = data?.topics;
  const languagesFromDB = data?.languages;

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

  const routes = (): JSX.Element => {
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
        <Route path="*" element={<Navigate to={`/${defaultLanguages[0]}`} />} />
      </Routes>
    );
  };

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
          {isLoadingData ? showLoadingLabel && <p>{loadingLabel}</p> : routes()}
        </div>
        <Footer />
      </div>
    </div>
  );
};
