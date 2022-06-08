import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import { H5PWrapper } from "../src/h5p/H5PWrapper";
import { semantics } from "../src/semantics";

const queryClient = new QueryClient();

const contentId = "content-id";
const l10n = Object.fromEntries(
  semantics
    .find(group => group.name === "l10n")
    .fields.map(field => [field.name, field.default]),
);

console.log({ l10n });

const h5pInstance = new H5PWrapper({ region: "", l10n }, contentId, undefined);

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
      <HashRouter>
        <H5PContext.Provider value={h5pInstance}>
          <L10nContext.Provider value={l10n}>
            <ContentIdContext.Provider value="content-id">
              <Story />
            </ContentIdContext.Provider>
          </L10nContext.Provider>
        </H5PContext.Provider>
      </HashRouter>
    </QueryClientProvider>
  ),
];
