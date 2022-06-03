import * as React from "react";
import { Language } from "../../../../common/types/types";
import { Bildetema } from "../Bildetema/Bildetema";

type AppProps = {
  currentLanguage: Language;
};

const App: React.FC<AppProps> = ({ currentLanguage }) => {
  return <Bildetema currentLanguage={currentLanguage} />;
};

export default App;
