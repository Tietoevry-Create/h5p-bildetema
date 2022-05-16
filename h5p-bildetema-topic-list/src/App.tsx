import * as React from "react";
import { getData } from "./utils/csvToObject"

export type AppProps = {
  adjective: string;
};

const App: React.FC<AppProps> = ({ adjective }) => {

  React.useEffect(() => {
    const run = async() => {
      const data = await getData()
      console.log(data)
    }
    run()
  }, [])

    return <h1>Hi, you&apos;re {adjective}</h1>;
}

export default App;
