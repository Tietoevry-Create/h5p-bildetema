import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bildetema } from "../Bildetema/Bildetema";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Bildetema />
    </QueryClientProvider>
  );
};
