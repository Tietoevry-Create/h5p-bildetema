// import * as React from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { Language } from "../../../../common/types/types";
// import { Bildetema } from "../Bildetema/Bildetest";
// // import { Bildetema } from "../Bildetema/Bildetema";

// type AppProps = {
//   currentLanguage: Language;
// };

// const queryClient = new QueryClient();

// export const App: React.FC<AppProps> = ({ currentLanguage }) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Bildetema currentLanguage={currentLanguage} />
//       {/* <Bildetema currentLanguage={currentLanguage} /> */}
//     </QueryClientProvider>
//   );
// };
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bildetema } from "../Bildetema/Bildetest";

const queryClient = new QueryClient();

export const App = (): JSX.Element=> {
  return (
    <QueryClientProvider client={queryClient}>
      <Bildetema />
      {/* <h1>dragons</h1> */}
      {/* <Bildetema currentLanguage={currentLanguage} /> */}
    </QueryClientProvider>
  );
};
