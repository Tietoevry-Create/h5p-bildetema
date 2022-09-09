import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bildetema } from "../Bildetema/Bildetema";

const queryClient = new QueryClient();

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

export const App: React.FC<appProps> = ({ defaultLanguages, backendUrl }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Bildetema defaultLanguages={defaultLanguages} backendUrl={backendUrl} />
    </QueryClientProvider>
  );
};
