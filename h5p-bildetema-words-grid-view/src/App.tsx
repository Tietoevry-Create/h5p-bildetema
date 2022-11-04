import * as React from "react";
import { Word } from "../../common/types/types";
import { TopicWordsGrid } from "./components/TopicWordsGrid/TopicWordsGrid";

export type AppProps = {
  words: Word[];
  showWrittenWords: boolean;
  showArticles: boolean;
};

const App: React.FC<AppProps> = ({ words, showWrittenWords, showArticles }) => {
  return (
    <TopicWordsGrid
      words={words}
      showWrittenWords={showWrittenWords}
      showArticles={showArticles}
    />
  );
};

export default App;
