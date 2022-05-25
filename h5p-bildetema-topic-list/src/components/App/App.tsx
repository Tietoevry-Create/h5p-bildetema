import { Route, Routes, useNavigate } from "react-router-dom";
import * as React from "react";
import { Language, Topic } from "../../../../common/types/types";
import { fetchData, getTopics } from "../../../../common/utils/data.utils";
import { TopicsGrid } from "../TopicsGrid/TopicsGrid";
import { WordsGrid } from "../WordsGrid/WordsGrid";

type AppProps = {
  currentLanguageCode: Language;
  adjective: string;
};

const App: React.FC<AppProps> = ({ currentLanguageCode }) => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const run = async (): Promise<void> => {
      navigate(`/${currentLanguageCode.code}`);
      await fetchData();
      setTopics(await getTopics());
    };
    if (!topics.length) {
      run();
    }
  }, [currentLanguageCode.code, navigate, topics.length]);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route
          path={`/${currentLanguageCode.code}`}
          element={<TopicsGrid items={topics} />}
        />
        {topics.map(topic => {
          const currTopicPath = `/${
            currentLanguageCode.code
          }/${encodeURIComponent(
            topic.label.toLowerCase().split(" ").join("-"),
          )}`;
          return topic.subTopics.size ? (
            Array.from(topic.subTopics.values()).map(subtopic => {
              const currSubtopicPath = `${currTopicPath}/${encodeURIComponent(
                subtopic.label.split(" ").join("-"),
              )}`;
              const topicGridItems = Array.from(topic.subTopics.values());
              const wordsGridItems =
                subtopic.words.get(currentLanguageCode.code) ?? [];

              return (
                <>
                  <Route
                    key={topic.id}
                    path={currTopicPath}
                    element={
                      <TopicsGrid items={topicGridItems} topic={topic.label} />
                    }
                  />
                  <Route
                    path={currSubtopicPath}
                    element={
                      <WordsGrid
                        items={wordsGridItems}
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
                <WordsGrid
                  items={topic.words.get(currentLanguageCode.code) ?? []}
                  topic={topic.label}
                />
              }
            />
          );
        })}
      </Routes>
      {!topics.length && <h2>Loading...</h2>}
    </>
  );
};

export default App;
