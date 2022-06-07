import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Language } from "../../../../common/types/types";
import { Bildetema } from "../Bildetema/Bildetema";

type AppProps = {
  currentLanguage: Language;
};

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ currentLanguage }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Bildetema currentLanguage={currentLanguage} />
    </QueryClientProvider>
  );
};

export default App;
