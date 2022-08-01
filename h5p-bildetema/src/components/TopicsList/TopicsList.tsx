import * as React from "react";
import { Topic, TopicGridSizes } from "../../../../common/types/types";
import { fetchData, getTopics } from "../../../../common/utils/data.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

type TopicsListProps = Record<string, never>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TopicsList: React.FC<TopicsListProps> = props => {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    const run = async (): Promise<void> => {
      await fetchData();
      setTopics(await getTopics());
    };
    run();
  }, []);

  return (
    <TopicGrid
      setIsWordView={() => null}
      showWrittenWords={false}
      items={topics}
      topicsSize={TopicGridSizes.Big}
      currentLanguage={{
        label: "Norsk (Bokmål)",
        code: makeLanguageCode("nob"),
        rtl: false,
      }}
      setCurrentTopic={(): void => {
        throw new Error("Function not implemented.");
      }}
      setCurrentSubTopic={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
