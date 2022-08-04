import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bildetema } from "../Bildetema/Bildetema";

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Bildetema />
    </QueryClientProvider>
  );
};
