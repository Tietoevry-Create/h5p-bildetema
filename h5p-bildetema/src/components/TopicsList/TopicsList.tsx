import * as React from "react";
import { Topic } from "../../../../common/types/types";
import { fetchData, getTopics } from "../../../../common/utils/data.utils";
import { TopicGrid } from "../TopicGrid/TopicGrid";

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

  return <TopicGrid items={topics} />;
};
