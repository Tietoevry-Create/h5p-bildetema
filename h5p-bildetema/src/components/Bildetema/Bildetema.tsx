import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "..";
import { Language, Topic } from "../../../../common/types/types";
import { fetchData, getTopics } from "../../../../common/utils/data.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import styles from "./Bildetema.module.scss";

type BildetemaProps = {
  currentLanguage: Language;
};

export const Bildetema: React.FC<BildetemaProps> = ({ currentLanguage }) => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const run = async (): Promise<void> => {
      await fetchData();
      setTopics(await getTopics());
      navigate(`/${currentLanguage.code}`);
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage.code]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header_container}>
          <Header />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route
          path={`/${currentLanguage.code}`}
          element={<TopicGrid items={topics} />}
        />
        {topics.map(topic => {
          const currTopicPath = `/${currentLanguage.code}/${encodeURIComponent(
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
    </div>
  );
};
