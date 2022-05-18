import * as React from "react";
import { fetchData } from "./utils/csvToObject";

export type AppProps = {
  adjective: string;
};

const App: React.FC<AppProps> = ({ adjective }) => {
  React.useEffect(() => {
    const run = async () => {
      await fetchData();
    };
    run();
  }, []);

  return <h1>Hi, you&apos;re {adjective}</h1>;
};

export default App;
