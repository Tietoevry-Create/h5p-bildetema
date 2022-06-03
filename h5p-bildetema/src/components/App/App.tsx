import * as React from "react";
import { Language } from "../../../../common/types/types";
import { Bildetema } from "../Bildetema/Bildetema";

type AppProps = {
  adjective: string;
  currentLanguage: Language;
};

const App: React.FC<AppProps> = ({ adjective, currentLanguage }) => {
  return <Bildetema currentLanguage={currentLanguage} />;
};

export default App;
