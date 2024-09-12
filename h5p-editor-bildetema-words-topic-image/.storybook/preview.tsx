import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { H5PEditor } from "h5p-utils";
import React, { FC } from "react";
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
  (Story: FC) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

// biome-ignore lint/suspicious/noExplicitAny:
(H5PEditor.language as any)["H5PEditor.BildetemaWordsTopicImage"] =
  englishTranslations;
