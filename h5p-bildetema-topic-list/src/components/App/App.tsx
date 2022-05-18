import * as React from "react";
import { fetchData } from "../../utils/data.utils";
import Grid from "../Grid/Grid";

export const DUMMY_ITEMS = [
  { title: "loooooooooooooooong item" },
  { title: "item 2" },
  { title: "item 3" },
  { title: "item 4" },
  { title: "item 5" },
  { title: "item 6" },
  { title: "item 7" },
  { title: "item 8" },
  { title: "item 9" },
];

export type AppProps = {
  adjective: string;
};

const App: React.FC<AppProps> = ({ adjective }) => {
  React.useEffect(() => {
    const run = async (): Promise<void> => {
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
