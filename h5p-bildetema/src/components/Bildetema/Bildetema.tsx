import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Header } from "..";
import { Language } from "../../../../common/types/types";
import { getTopics } from "../../../../common/utils/data.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import styles from "./Bildetema.module.scss";
import { Footer } from "../Footer/Footer";

type BildetemaProps = {
  currentLanguage: Language;
};

export const Bildetema: React.FC<BildetemaProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const { isLoading, data: topics } = useQuery("topicsFromDB", getTopics);

  React.useEffect(() => {
    navigate(`/${currentLanguage.code}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage.code]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header_container}>
          <Header />
        </div>
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
                        <TopicGrid items={topicGridItems} topic={topic.label} />
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
        {isLoading && <h1>Loading...</h1>}
        <Footer />
      </div>
    </div>
  );
};
