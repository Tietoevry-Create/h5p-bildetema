import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import { LanguageCode } from "common/types/LanguageCode";
import { App } from "../components/App/App";
import { TranslationKey } from "../types/TranslationKey";

const queryClient = new QueryClient();
type Params = {
  l10n: Record<TranslationKey, string>;
  defaultLanguages?: Array<LanguageCode>;
  backendUrl?: string;
};

export class H5PWrapper
  extends H5PContentType<Params>
  implements IH5PContentType
{
  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema` to.",
      );
      return;
    }

    const { l10n, defaultLanguages, backendUrl } = this.params;
    const { htmlLanguageCode } = l10n;

    const uniqueDefaultLanguages = [...new Set(defaultLanguages)];
    const backendUrlWithoutTrailingSlash = backendUrl?.endsWith("/")
      ? backendUrl.slice(0, -1)
      : backendUrl;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema");
    document.documentElement.lang = htmlLanguageCode;

    const root = createRoot(this.wrapper);
    root.render(
      <HashRouter>
        <H5PContext.Provider value={this}>
          <L10nContext.Provider value={l10n}>
            <ContentIdContext.Provider value={this.contentId}>
              <QueryClientProvider client={queryClient}>
                <App
                  defaultLanguages={uniqueDefaultLanguages ?? []}
                  backendUrl={backendUrlWithoutTrailingSlash ?? ""}
                />
              </QueryClientProvider>
            </ContentIdContext.Provider>
          </L10nContext.Provider>
        </H5PContext.Provider>
      </HashRouter>,
    );
  }

  public getWrapper(): HTMLElement {
    return this.wrapper;
  }
}
