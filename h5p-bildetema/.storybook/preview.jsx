import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";

const queryClient = new QueryClient();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Story />
      </HashRouter>
    </QueryClientProvider>
  ),
];
