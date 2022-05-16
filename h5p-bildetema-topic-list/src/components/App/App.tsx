import * as React from "react";
import { fetchData } from "./utils/data.utils";
import Grid from "../Grid/Grid";

const DUMMY_ITEMS = [
  { title: "item 1" },
  { title: "item 2" },
  { title: "item 3" },
  { title: "item 4" },
];

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

  return (
    <>
      <h1>Hi, you&apos;re {adjective}</h1>
      <Grid items={DUMMY_ITEMS} />
    </>
  );
};

export default App;
