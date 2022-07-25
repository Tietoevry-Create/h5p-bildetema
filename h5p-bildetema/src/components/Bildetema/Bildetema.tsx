import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Header } from "..";
import {
  Language,
  Topic,
  TopicGridSizes,
} from "../../../../common/types/types";
import { getLanguages, getTopics } from "../../../../common/utils/data.utils";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
import { getTopicSlug } from "../../utils/router.utils";
import { Footer } from "../Footer/Footer";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import styles from "./Bildetema.module.scss";

type BildetemaProps = {
  currentLanguage?: Language;
};

// TODO: store selected and current language in localStorage
// TODO: replace with selected languages from language menu
const selectedLanguages: Language[] = [
  {
    label: "Norsk (Bokmål)",
    code: makeLanguageCode("nob"),
    rtl: false,
    isFavorite: true,
  },
  {
    label: "Norsk (Nynorsk)",
    code: makeLanguageCode("nno"),
    rtl: false,
    isFavorite: true,
  },
  {
    label: "Polsk",
    code: makeLanguageCode("pol"),
    rtl: false,
    isFavorite: true,
  },
];

export const Bildetema: React.FC<BildetemaProps> = ({
  // this variable can be used for setting default language
  // when user first visits the page
  // we can get the language object from languagesFromDB query data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentLanguage: currentMetaLanguage,
}) => {
  const { isLoading: isLoadingLanguages, data: languagesFromDB } = useQuery(
    "languagesFromDB",
    getLanguages,
  );
  const { isLoading: isLoadingTopics, data: topics } = useQuery(
    "topicsFromDB",
    getTopics,
  );

  const loadingLabel = useL10n("pageIsLoading");
  const [userData] = useUserData();

  // TODO?: handle going back in history
  // (handle the case when user goes back after changing the language)
  const navigate = useNavigate();
  const location = useLocation();

  const [topicsSize, setTopicsSize] = useState(TopicGridSizes.Big);
  const [isWordView, setIsWordView] = useState(false);
  const [showWrittenWords, setShowWrittenWords] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(
    userData.currentLanguage ?? selectedLanguages[0],
  );
  const [currentTopic, setCurrentTopic] = useState<Topic>();
  const [currentSubTopic, setCurrentSubTopic] = useState<Topic>();
  const [routes, setRoutes] = useState<JSX.Element>();
  const [firstVisit, setFirstVisit] = useState(true);

  const dynamicRedirect = useRef<JSX.Element>();

  const handleToggleChange = (value: boolean): void => {
    setShowWrittenWords(value);
  };

  useEffect(() => {
    setRoutes(
      <Routes>
        <Route
          path={`/${currentLanguage.code}`}
          element={
            <TopicGrid
              topicsSize={topicsSize}
              items={topics}
              currentLanguage={currentLanguage}
              setCurrentTopic={setCurrentTopic}
              setCurrentSubTopic={setCurrentSubTopic}
              setIsWordView={setIsWordView}
              showWrittenWords={showWrittenWords}
            />
          }
        />
        {topics?.map(topic => {
          const currTopicPath = topic.labelTranslations.get(
            currentLanguage.code,
          )?.label
            ? `/${currentLanguage.code}/${encodeURIComponent(
                topic.labelTranslations
                  .get(currentLanguage.code)
                  ?.label.toLowerCase()
                  .split(" ")
                  .join("-") ?? "",
              )}`
            : `/${currentLanguage.code}/${topic.id}`;

          return topic.subTopics.size ? (
            Array.from(topic.subTopics.values()).map(subtopic => {
              const currSubtopicPath = subtopic.labelTranslations.get(
                currentLanguage.code,
              )?.label
                ? `${currTopicPath}/${encodeURIComponent(
                    subtopic.labelTranslations
                      .get(currentLanguage.code)
                      ?.label.toLowerCase()
                      .split(" ")
                      .join("-") ?? "",
                  )}`
                : `${currTopicPath}/${subtopic.id}`;
              const topicGridItems = Array.from(topic.subTopics.values());
              const wordsGridItems =
                subtopic.words.get(currentLanguage.code) ?? [];

              return (
                <>
                  <Route
                    key={topic.id}
                    path={currTopicPath}
                    element={
                      <TopicGrid
                        topicsSize={topicsSize}
                        items={topicGridItems}
                        currentLanguage={currentLanguage}
                        topic={topic}
                        setCurrentTopic={setCurrentTopic}
                        setCurrentSubTopic={setCurrentSubTopic}
                        setIsWordView={setIsWordView}
                        showWrittenWords={showWrittenWords}
                      />
                    }
                  />
                  <Route
                    key={subtopic.id}
                    path={currSubtopicPath}
                    element={
                      <TopicGrid
                        topicsSize={topicsSize}
                        words={wordsGridItems}
                        currentLanguage={currentLanguage}
                        topic={topic}
                        subTopic={subtopic}
                        setCurrentTopic={setCurrentTopic}
                        setCurrentSubTopic={setCurrentSubTopic}
                        setIsWordView={setIsWordView}
                        showWrittenWords={showWrittenWords}
                      />
                    }
                  />
                </>
              );
            })
          ) : (
            <Route
              key={topic.id}
              path={currTopicPath}
              element={
                <TopicGrid
                  words={topic.words.get(currentLanguage.code) ?? []}
                  topicsSize={topicsSize}
                  currentLanguage={currentLanguage}
                  topic={topic}
                  setCurrentTopic={setCurrentTopic}
                  setCurrentSubTopic={setCurrentSubTopic}
                  setIsWordView={setIsWordView}
                  showWrittenWords={showWrittenWords}
                />
              }
            />
          );
        })}
        {dynamicRedirect.current}
      </Routes>,
    );
  }, [currentLanguage, showWrittenWords, topics, topicsSize]);

  useEffect(() => {
    if (topics) {
      let newPath: string;

      // process current path if this is a first visit
      // i.e. link is copy-pasted into the address bar
      if (firstVisit) {
        const pathArray = location.pathname.split("/");
        const [topic, subTopic] = pathArray.slice(2).map(tempTopic => {
          return topics?.find(
            existingTopic =>
              existingTopic.labelTranslations
                .get(makeLanguageCode(pathArray[1]))
                ?.label.toLowerCase()
                .split(" ")
                .join("-") ??
              existingTopic.id.toLowerCase() === decodeURIComponent(tempTopic),
          );
        });

        setCurrentTopic(topic);
        setCurrentSubTopic(subTopic);
        setFirstVisit(false);

        // build new path based on topic and subtopic
        // since currentTopic and currentSubTopic are still undefined at this point
        newPath = [
          `/${currentLanguage.code}`,
          topic && getTopicSlug(topic, currentLanguage.code),
          subTopic && getTopicSlug(subTopic, currentLanguage.code),
        ]
          .filter(Boolean)
          .join("/");
      } else {
        newPath = [
          `/${currentLanguage.code}`,
          currentTopic && getTopicSlug(currentTopic, currentLanguage.code),
          currentSubTopic &&
            getTopicSlug(currentSubTopic, currentLanguage.code),
        ]
          .filter(Boolean)
          .join("/");
      }
      dynamicRedirect.current = (
        <Route
          path="*"
          element={<Navigate to={`/${currentLanguage.code}`} replace />}
        />
      );
      navigate(newPath);
    }
    // this hook handles the navigation to updated path when changing current language
    // with current implementation it should only depend on currentLanguage and topics
    // topics are only updated once when the data is fetched from remote host
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, topics]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          handleToggleChange={handleToggleChange}
          toggleChecked={showWrittenWords}
          selectedLanguages={selectedLanguages}
          currentLanguage={currentLanguage}
          changeCurrentLanguage={setCurrentLanguage}
          languagesFromDB={languagesFromDB}
        />
        <div className={styles.body}>
          {routes}
          {(isLoadingTopics || isLoadingLanguages) && <h1>{loadingLabel}</h1>}
        </div>
        <Footer />
      </div>
    </div>
  );
};
