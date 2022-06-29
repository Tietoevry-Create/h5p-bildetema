import React from "react";
import { useQuery } from "react-query";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Header } from "..";
import {
  Language,
  Topic,
  TopicGridSizes,
  UserData,
} from "../../../../common/types/types";
import { getTopics } from "../../../../common/utils/data.utils";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { useL10n } from "../../hooks/useL10n";
import { useUserData } from "../../hooks/useUserData";
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
    code: makeLanguageCode("non"),
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
  currentLanguage: currentMetaLanguage,
}) => {
  // TODO: use the language array to generate the list of selectable languages
  // const { isLoading: isLoadingLanguages, data: languages } = useQuery(
  //   "languagesFromDB",
  //   getLanguages,
  // );
  const { isLoading: isLoadingTopics, data: topics } = useQuery(
    "topicsFromDB",
    getTopics,
  );
  const [topicsSize, setTopicsSize] = React.useState<TopicGridSizes>(
    TopicGridSizes.Big,
  );
  const [isWordView, setIsWordView] = React.useState(false);
  // TODO?: handle going back in history
  // (handle the case when user goes back after changing the language)
  const navigate = useNavigate();
  const location = useLocation();
  const dynamicRedirect = React.useRef<JSX.Element>();

  const [showWrittenWords, setShowWrittenWords] = React.useState(true);

  const loadingLabel = useL10n("pageIsLoading");
  const [userData, setUserData] = useUserData();

  const [currentLanguage, setCurrentLanguage] = React.useState(
    userData.currentLanguage ?? selectedLanguages[0],
  );

  const [currentTopic, setCurrentTopic] = React.useState<Topic>();
  const [currentSubTopic, setCurrentSubTopic] = React.useState<Topic>();

  const [routes, setRoutes] = React.useState<JSX.Element>();

  const handleToggleChange = (value: boolean): void => {
    setShowWrittenWords(value);
  };

  const [firstVisit, setFirstVisit] = React.useState(true);

  React.useEffect(() => {
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
                />
              }
            />
          );
        })}
        {dynamicRedirect.current}
      </Routes>,
    );
  }, [currentLanguage, topics, topicsSize]);

  React.useEffect(() => {
    if (topics) {
      let newPath;

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
        newPath = `/${currentLanguage.code}${
          topic
            ? `/${encodeURIComponent(
                topic.labelTranslations
                  .get(currentLanguage.code)
                  ?.label.toLowerCase()
                  .split(" ")
                  .join("-") ?? topic.id.toLowerCase(),
              )}`
            : ""
        }${
          subTopic
            ? `/${encodeURIComponent(
                subTopic.labelTranslations
                  .get(currentLanguage.code)
                  ?.label.toLowerCase()
                  .split(" ")
                  .join("-") ?? subTopic.id.toLowerCase(),
              )}`
            : ""
        }`;
      } else {
        newPath = `/${currentLanguage.code}${
          currentTopic
            ? `/${encodeURIComponent(
                currentTopic.labelTranslations
                  .get(currentLanguage.code)
                  ?.label.toLowerCase()
                  .split(" ")
                  .join("-") ?? currentTopic.id.toLowerCase(),
              )}`
            : ""
        }${
          currentSubTopic
            ? `/${encodeURIComponent(
                currentSubTopic.labelTranslations
                  .get(currentLanguage.code)
                  ?.label.toLowerCase()
                  .split(" ")
                  .join("-") ?? currentSubTopic.id.toLowerCase(),
              )}`
            : ""
        }`;
      }
      dynamicRedirect.current = (
        <Route
          path="*"
          element={<Navigate to={`/${currentLanguage.code}`} replace />}
        />
      );
      navigate(newPath);
    }
  }, [currentLanguage, topics]);

  const loadingLabel = useL10n("pageIsLoading");

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
          userData={userData}
          setUserData={setUserData}
        />
        <div className={styles.body}>
          {routes}
          {isLoadingTopics && <h1>{loadingLabel}</h1>}
        </div>
        <Footer />
      </div>
    </div>
  );
};
