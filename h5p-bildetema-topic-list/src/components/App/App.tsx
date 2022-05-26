import * as React from "react";
import { Topic } from "../../../../common/types/types";
import { fetchData, getTopics } from "../../../../common/utils/data.utils";
import { Grid } from "..";

type AppProps = {
  adjective: string;
};

const App: React.FC<AppProps> = () => {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    const run = async (): Promise<void> => {
      await fetchData();
      setTopics(await getTopics());
    };
    run();
  }, []);

  return (
    <>
      <h1>Choose a topic</h1>
      {!!topics.length && <Grid items={topics} />}
      {!topics.length && <h2>Loading...</h2>}
    </>
  );
};

export default App;
