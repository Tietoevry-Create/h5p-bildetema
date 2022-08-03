import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Navigate,
  Route,
  Routes,
  useParams
} from "react-router-dom";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
// import { Header } from "..";
import {RouteController} from "../RouteController/RouteController"
import {
  Language,
  // Topic,
  TopicGridSizes,
} from "../../../../common/types/types";
import { Header } from "..";
import { getLanguages, getTopics } from "../../../../common/utils/data.utils";
import { Footer } from "../Footer/Footer";
import { useL10n } from "../../hooks/useL10n";

import styles from "./Bildetema.module.scss";

// type BildetemaProps = {
//   currentLanguage?: Language;
// };

export type TopicIds = {
  topicId?: string;
  subTopicId?: string;
}

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
  const { isLoading: isLoadingLanguages, data: languagesFromDB, isIdle} = useQuery(
    "languagesFromDB",
    getLanguages,
  );
  const { isLoading: isLoadingTopics, data: topicsFromDB } = useQuery(
    "topicsFromDB",
    getTopics,
  );

  const loadingLabel = useL10n("pageIsLoading");
  const [topicIds, setTopicIds] = useState<TopicIds>({})

  const [topicsSize, setTopicsSize] = useState(TopicGridSizes.Big);
  const [isWordView, setIsWordView] = useState(false);
  const [showWrittenWords, setShowWrittenWords] = useState(true);
  const [favLanguages, setFavLanguages] = React.useState(defaultFavoriteLanguages);
  
  const [routes, setRoutes] = useState<JSX.Element>();
  // const [firstVisit, setFirstVisit] = useState(true);


  const handleToggleChange = (value: boolean): void => {
    setShowWrittenWords(value);
  };

  // console.log(topics)

  useEffect(() => {
    setRoutes(
      <Routes>
        <Route
          path="/:langId"
          element={<RouteController topicsFromDB={topicsFromDB} languagesFromDB={languagesFromDB} setIsWordView={setIsWordView} topicsSize={topicsSize}
    showWrittenWords={showWrittenWords} setTopicIds={setTopicIds}/>}
        />
        <Route
          path="/:langId/:topicLabel"
          element={<RouteController topicsFromDB={topicsFromDB} languagesFromDB={languagesFromDB} setIsWordView={setIsWordView} topicsSize={topicsSize}
          showWrittenWords={showWrittenWords} setTopicIds={setTopicIds}/>}
        />
        <Route
          path="/:langId/:topicLabel/:subTopicId"
          element={<RouteController topicsFromDB={topicsFromDB} languagesFromDB={languagesFromDB} setIsWordView={setIsWordView} topicsSize={topicsSize}
          showWrittenWords={showWrittenWords} setTopicIds={setTopicIds}/>}
        />
        <Route
          path="*"
          element={<Navigate to="/nob" />}
        />
      </Routes>
    );
    
  }, [topicsFromDB, isLoadingTopics, languagesFromDB, showWrittenWords, topicsSize])
  console.log(topicIds)
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
          // currentLanguage={currentLanguage}
          // changeCurrentLanguage={setCurrentLanguage}
          languagesFromDB={languagesFromDB}
          favLanguages={favLanguages}
          setFavLanguages={setFavLanguages}
          topicsFromDB={topicsFromDB}
        />
        <div className={styles.body}>
          {/* {routes}
          {(isLoadingTopics || isLoadingLanguages) && <h1>{loadingLabel}</h1>} */}
          {(isLoadingTopics || isLoadingLanguages) ? <h1>{loadingLabel}</h1> : routes}
        </div>
        <Footer />
      </div>
    </div>
  );
};
