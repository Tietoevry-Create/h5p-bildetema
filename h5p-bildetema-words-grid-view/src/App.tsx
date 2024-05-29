import { Word } from "common/types/types";
import { FC } from "react";
import { TopicWordsGrid } from "./components/TopicWordsGrid/TopicWordsGrid";

export type AppProps = {
  words: Word[];
  showWrittenWords: boolean;
  showArticles: boolean;
  onOpenDialog: (id: string) => void;
};

const App: FC<AppProps> = ({
  words,
  showWrittenWords,
  showArticles,
  onOpenDialog,
}) => {
  return (
    <TopicWordsGrid
      words={words}
      showWrittenWords={showWrittenWords}
      showArticles={showArticles}
      onOpenDialog={onOpenDialog}
    />
  );
};

export default App;
