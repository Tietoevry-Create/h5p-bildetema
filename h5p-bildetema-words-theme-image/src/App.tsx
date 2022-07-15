import * as React from "react";

export type AppProps = {
  params: any;
};

const App: React.FC<AppProps> = ({ params }) => {
  return <h1> {JSON.stringify(params)}</h1>;
};

export default App;
