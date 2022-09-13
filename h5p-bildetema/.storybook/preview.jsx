import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import { H5PWrapper } from "../src/h5p/H5PWrapper";
import { semantics } from "../src/semantics";
import "../../h5p-bildetema-words-grid-view/src";
import "../../h5p-bildetema-words-topic-image/src";
import "../../h5p-bildetema-words-tree-view/src";
import { getData } from "../../common/utils/data.utils";
import { DBContext } from "../../common/context/DBContext";

const queryClient = new QueryClient();

const contentId = "content-id";
const l10n = Object.fromEntries(
  semantics
    .find(group => group.name === "l10n")
    .fields.map(field => [field.name, field.default]),
);

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
  (/** @type {React.FC} */ Story) => {
    const [data, setData] = React.useState();

    React.useEffect(() => {
      queryClient.fetchQuery(["dataFromDB"], () => getData("")).then(setData);
    }, []);

    return (
      <QueryClientProvider client={queryClient}>
        <DBContext.Provider value={data}>
          <HashRouter>
            <H5PContext.Provider value={h5pInstance}>
              <L10nContext.Provider value={l10n}>
                <ContentIdContext.Provider value="content-id">
                  <Story />
                </ContentIdContext.Provider>
              </L10nContext.Provider>
            </H5PContext.Provider>
          </HashRouter>
        </DBContext.Provider>
      </QueryClientProvider>
    );
  },
];
