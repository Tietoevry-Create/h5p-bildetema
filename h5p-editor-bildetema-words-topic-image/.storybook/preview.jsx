import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../h5p-bildetema-words-grid-view/src";
import "../../h5p-bildetema-words-topic-image/src";
import englishTranslations from "../language/en.json";

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

H5PEditor.language["H5PEditor.BildetemaWordsTopicImage"] = englishTranslations;
