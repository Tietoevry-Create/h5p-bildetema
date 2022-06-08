import React from "react";
import { useQuery } from "react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "..";
import { Language } from "../../../../common/types/types";
import { getTopics } from "../../../../common/utils/data.utils";
import { useL10n } from "../../hooks/useL10n";
import { Footer } from "../Footer/Footer";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import styles from "./Bildetema.module.scss";

type BildetemaProps = {
  currentLanguage: Language;
};

export const Bildetema: React.FC<BildetemaProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const { isLoading, data: topics } = useQuery("topicsFromDB", getTopics);

  const loadingLabel = useL10n("pageIsLoading");

  React.useEffect(() => {
    navigate(`/${currentLanguage.code}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage.code]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <div className={styles.body}>
          {/* TODO: Look at extracting some of this code out of this render function */}
          <Routes>
            <Route path="/" element={<h1>Hello</h1>} />
            <Route
              path={`/${currentLanguage.code}`}
              element={<TopicGrid items={topics} />}
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
                            items={topicGridItems}
                            topic={topic.label}
                          />
                        }
                      />
                      <Route
                        path={currSubtopicPath}
                        element={
                          <TopicGrid
                            words={wordsGridItems}
                            topic={subtopic.label}
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
                      topic={topic.label}
                    />
                  }
                />
              );
            })}
          </Routes>
          {isLoading && <h1>{loadingLabel}</h1>}
        </div>
        <Footer />
      </div>
    </div>
  );
};
