import * as React from "react";
import { Word } from "../../common/types/types";
import { TopicWordsGrid } from "./components/TopicWordsGrid/TopicWordsGrid";

export type AppProps = {
  words: Word[];
};

const App: React.FC<AppProps> = ({ words }) => {
  return <TopicWordsGrid words={words} />;
};

export default App;
