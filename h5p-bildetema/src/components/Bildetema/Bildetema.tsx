import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { RouteController } from "../RouteController/RouteController";
import { Language, TopicGridSizes } from "../../../../common/types/types";
import { Header } from "..";
import { getLanguages, getTopics } from "../../../../common/utils/data.utils";
import { Footer } from "../Footer/Footer";
import { useL10n } from "../../hooks/useL10n";

import styles from "./Bildetema.module.scss";

export type TopicIds = {
  topicId?: string;
  subTopicId?: string;
};

export const defaultFavoriteLanguages: Language[] = [
  {
    label: "Norsk (Bokmål)",
    code: makeLanguageCode("nob"),
    rtl: false,
  },
  {
    label: "Norsk (Nynorsk)",
    code: makeLanguageCode("nno"),
    rtl: false,
  },
  {
    label: "Engelsk",
    code: makeLanguageCode("eng"),
    rtl: false,
  },
];

export const Bildetema = (): JSX.Element => {
  const { isLoading: isLoadingLanguages, data: languagesFromDB } = useQuery(
    "languagesFromDB",
    getLanguages,
  );
  const { isLoading: isLoadingTopics, data: topicsFromDB } = useQuery(
    "topicsFromDB",
    getTopics,
  );

  const loadingLabel = useL10n("pageIsLoading");
  const [topicIds, setTopicIds] = useState<TopicIds>({});

  const [topicsSize, setTopicsSize] = useState(TopicGridSizes.Big);
  const [isWordView, setIsWordView] = useState(false);
  const [showWrittenWords, setShowWrittenWords] = useState(true);
  const [favLanguages, setFavLanguages] = React.useState(
    defaultFavoriteLanguages,
  );

  const [routes, setRoutes] = useState<JSX.Element>();

  const handleToggleChange = (value: boolean): void => {
    setShowWrittenWords(value);
  };

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
  ]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header
          topicIds={topicIds}
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          handleToggleChange={handleToggleChange}
          toggleChecked={showWrittenWords}
          languagesFromDB={languagesFromDB}
          favLanguages={favLanguages}
          setFavLanguages={setFavLanguages}
          topicsFromDB={topicsFromDB}
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
