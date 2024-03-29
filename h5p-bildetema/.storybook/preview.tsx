import { Parameters } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DBContext } from "common/context/DBContext";
import { Data, NewData } from "common/types/types";
import { getData, getNewData } from "common/utils/data.utils";
import { H5PL10n } from "h5p-types";
import React, { FC, useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import "../../h5p-bildetema-words-grid-view/src";
import "../../h5p-bildetema-words-topic-image/src";
import semantics from "../semantics.json";
import { H5PWrapper } from "../src/h5p/H5PWrapper";
import { Params } from "../src/types/Params";
import { BackendUrlContext } from "common/context/BackendUrlContext";
import { NewDBContext } from "common/context/NewDBContext";

const queryClient = new QueryClient();

const contentId = "content-id";
const l10n = Object.fromEntries(
  (semantics.find(group => group.name === "l10n") as H5PL10n).fields.map(
    field => [field.name, field.default],
  ),
);

const h5pInstance = new H5PWrapper(
  { region: "", l10n } as unknown as Params,
  contentId,
  undefined,
);

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: FC) => {
    const [data, setData] = useState<NewData>();
    const backendUrl =
      "https://cdn-dev-bildetema.azureedge.net/data/dataTest.json.tar.gz";
    const baseBackendurl = backendUrl.split("data/").at(0) || "";
    useEffect(() => {
      queryClient
        .fetchQuery(["dataFromDB"], () => getNewData(backendUrl))
        .then(setData);
    }, []);

    return (
      <QueryClientProvider client={queryClient}>
        <BackendUrlContext.Provider value={baseBackendurl}>
          <NewDBContext.Provider value={data}>
            <HashRouter>
              <H5PContext.Provider value={h5pInstance}>
                <L10nContext.Provider value={l10n}>
                  <ContentIdContext.Provider value="content-id">
                    <Story />
                  </ContentIdContext.Provider>
                </L10nContext.Provider>
              </H5PContext.Provider>
            </HashRouter>
          </NewDBContext.Provider>
        </BackendUrlContext.Provider>
      </QueryClientProvider>
    );
  },
];
