import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { H5PL10n } from "h5p-types";
import React from "react";
import { HashRouter } from "react-router-dom";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
// eslint-disable-next-line import/no-relative-packages
import "../../h5p-bildetema-words-grid-view/src";
// eslint-disable-next-line import/no-relative-packages
import "../../h5p-bildetema-words-topic-image/src";
import semantics from "../semantics.json";
import { H5PWrapper } from "./h5p/H5PWrapper";
import { Params } from "./types/Params";
import { App } from "./components/App/App";
import "./index.scss";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <H5PContext.Provider value={h5pInstance}>
          <L10nContext.Provider value={l10n}>
            <ContentIdContext.Provider value="content-id">
              <App
                defaultLanguages={["nob"]}
                backendUrl="https://cdn-prod-bildetema.azureedge.net/data/database.json.tar.gz"
              />
            </ContentIdContext.Provider>
          </L10nContext.Provider>
        </H5PContext.Provider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
