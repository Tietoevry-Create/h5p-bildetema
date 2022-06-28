import React from "react";
import { useQuery } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "..";
import { Language, TopicGridSizes } from "../../../../common/types/types";
import { getTopics } from "../../../../common/utils/data.utils";
import { useL10n } from "../../hooks/useL10n";
import { Footer } from "../Footer/Footer";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import styles from "./Bildetema.module.scss";

type BildetemaProps = {
  currentLanguage: Language;
};

export const Bildetema: React.FC<BildetemaProps> = ({ currentLanguage }) => {
  const { isLoading, data: topics } = useQuery("topicsFromDB", getTopics);
  const [topicsSize, setTopicsSize] = React.useState<TopicGridSizes>(
    TopicGridSizes.Big,
  );
  const [isWordView, setIsWordView] = React.useState(false);

  const [showWrittenWords, setShowWrittenWords] = React.useState(true);

  const loadingLabel = useL10n("pageIsLoading");

  const dynamicRedirect = React.useRef<JSX.Element>();

  const handleToggleChange = (value: boolean): void => {
    setShowWrittenWords(value);
  };

  React.useEffect(() => {
    dynamicRedirect.current = (
      <Route
        path="*"
        element={<Navigate to={`/${currentLanguage.code}`} replace />}
      />
    );
  }, [currentLanguage.code]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header
          currentLanguageCode={currentLanguage.code}
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
          isWordView={isWordView}
          handleToggleChange={handleToggleChange}
          toggleChecked={showWrittenWords}
        />
        <div className={styles.body}>
          {/* TODO: Look at extracting some of this code out of this render function */}
          <Routes>
            <Route
              path={`/${currentLanguage.code}`}
              element={
                <TopicGrid
                  setIsWordView={setIsWordView}
                  topicsSize={topicsSize}
                  items={topics}
                  showWrittenWords={showWrittenWords}
                />
              }
            />
            {topics?.map(topic => {
              const currTopicPath = `/${
                currentLanguage.code
              }/${encodeURIComponent(
                topic.label.toLowerCase().split(" ").join("-"),
              )}`;

              return topic.subTopics.size ? (
                Array.from(topic.subTopics.values()).map(subtopic => {
                  const currSubtopicPath = `${currTopicPath}/${encodeURIComponent(
                    subtopic.label.toLowerCase().split(" ").join("-"),
                  )}`;
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
                            setIsWordView={setIsWordView}
                            showWrittenWords={showWrittenWords}
                          />
                        }
                      />
                      <Route
                        path={currSubtopicPath}
                        element={
                          <TopicGrid
                            topicsSize={topicsSize}
                            words={wordsGridItems}
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
                      setIsWordView={setIsWordView}
                      showWrittenWords={showWrittenWords}
                    />
                  }
                />
              );
            })}
            {dynamicRedirect.current}
          </Routes>
          {isLoading && <h1>{loadingLabel}</h1>}
        </div>
        <Footer />
      </div>
    </div>
  );
};
