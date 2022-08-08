import * as React from "react";
import { QueryClient, QueryClientProvider } from "[react-query]";
import "../../h5p-bildetema-words-grid-view/src";
import "../../h5p-bildetema-words-theme-image/src";
import "../../h5p-bildetema-words-tree-view/src";

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
  (/** @type {React.FC} */ Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];
